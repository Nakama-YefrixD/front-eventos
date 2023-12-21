import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Space, Modal } from 'antd';
import { SearchOutlined, UserAddOutlined } from '@ant-design/icons';
import ModalTablaPonentes from 'Routes/GestionEventos/ModalTablaPonentes';
import ModalTablaHorarios from 'Routes/GestionEventos/ModalTablaHorarios';
import ModalEstudiantesEvento from './ModalEstudiantesEvento';
import {
    UsergroupAddOutlined
} from '@ant-design/icons';

const TablaAdminMisCertificados = (props) => {

    const [eventoSeleccionado, setEventoSeleccionado] = useState({});
    const [mostrarModalPonente, setMostrarModalPonente] = useState(false);
    const [mostrarModalHorario, setMostrarModalHorario] = useState(false);
    const [mostrarModalEstudiantes, setMostrarModalEstudiantes] = useState(false);

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');

    const table_data = props.table_data

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
            <Input
                placeholder={`Buscar por ${dataIndex}`}
                value={selectedKeys[0]}
                onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Space>
            <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
            >
                Buscar
            </Button>
            <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                Reiniciar
            </Button>
            </Space>
        </div>
        ),
        filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
        record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
    });

    const getColumnSearchPropsProps = (dataIndex, dataIndexSecond, txtIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
            <Input
                placeholder={`Buscar por ${txtIndex}`}
                value={selectedKeys[0]}
                onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Space>
            <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
            >
                Buscar
            </Button>
            <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                Reiniciar
            </Button>
            </Space>
        </div>
        ),
        filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
        record[dataIndex][dataIndexSecond] ? record[dataIndex][dataIndexSecond].toString().toLowerCase().includes(value.toLowerCase()) : '',
    });

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const columns = [
        {
            title: 'Nombre del Evento',
            key: 'nombre',
            ...getColumnSearchPropsProps('eventos', 'nombre', 'nombre'), // Columna con filtro
            render: (info) => (
                <div>
                    {
                        info?.eventos?.nombre
                    }
                </div>
            )
        },
        {
            title: 'Ponentes',
            key: 'ponentes',
            render: (info) => (
                <div
                    onClick={() => {
                        setEventoSeleccionado(info)
                        setMostrarModalPonente(!mostrarModalPonente)
                    }}
                    style={{
                        cursor: 'pointer',
                        color: 'blue',
                        textDecoration: 'underline'
                    }}
                >
                    Ponentes
                </div>
            )
        },
        {
            title: 'Tipo',
            key: 'tipoevento',
            ...getColumnSearchPropsProps('eventos', 'tipoevento', 'tipoevento'), // Columna con filtro
            render: (info) => (
                <div>
                    {
                        info?.eventos?.tipoevento
                    }
                </div>
            )
        },
        {
            title: 'Fecha y Hora',            
            key: 'fechora',
            render: (info) => (
                <div
                    onClick={() => {
                        setEventoSeleccionado(info)
                        setMostrarModalHorario(!mostrarModalHorario)
                    }}
                    style={{
                        cursor: 'pointer',
                        color: 'blue',
                        textDecoration: 'underline'
                    }}
                >
                    Fecha y Hora
                </div>
            )
        },
        {
            title: 'Encuesta de Satisfacción',
            key: 'encuestado',
            render: _info => (
                _info.encuestado
                ?<div
                    style={{
                        color: '#2AD295'
                    }}
                >
                    Realizado
                </div>
                :<div
                    style={{
                        cursor: 'pointer',
                        color: 'blue',
                        textDecoration: 'underline'
                    }}
                >
                    Pendiente
                </div>
            )
        },
        {
            title: 'Asignar Certificado',
            key: 'certificado',
            render: _info => (
                <div
                    style={{
                        fontSize: '20px',
                        color: 'green',
                        cursor: 'pointer'
                    }}
                    onClick={() => {
                        setEventoSeleccionado(_info)
                        setMostrarModalEstudiantes(!mostrarModalEstudiantes)
                    }}
                >
                    <UsergroupAddOutlined />
                </div>
            )
        },
    ];

    return (
        <div>
            <Table 
                dataSource={table_data} 
                columns={columns} 
            />

            {
                mostrarModalPonente == true
                ?<ModalTablaPonentes 
                    mostrarModal = {mostrarModalPonente}
                    setMostrarModal = {setMostrarModalPonente}
                    eventoSeleccionado = {eventoSeleccionado}
                />
                :null
            }

            {
                mostrarModalHorario == true
                ?<ModalTablaHorarios
                    mostrarModal = {mostrarModalHorario}
                    setMostrarModal = {setMostrarModalHorario}
                    eventoSeleccionado = {eventoSeleccionado}
                />
                :null
            }

            {
                mostrarModalPonente == true
                ?<ModalTablaPonentes 
                    mostrarModal = {mostrarModalPonente}
                    setMostrarModal = {setMostrarModalPonente}
                    eventoSeleccionado = {eventoSeleccionado}
                />
                :null
            }

            {
                mostrarModalEstudiantes == true
                ?<ModalEstudiantesEvento 
                    mostrarModal = {mostrarModalEstudiantes}
                    setMostrarModal = {setMostrarModalEstudiantes}
                    eventoSeleccionado = {eventoSeleccionado}
                />
                :null
            }

        </div>
    )
}

export default TablaAdminMisCertificados