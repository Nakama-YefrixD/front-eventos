import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Space, Modal } from 'antd';
import { SearchOutlined, UserAddOutlined } from '@ant-design/icons';
import ModalTablaPonentes from 'Routes/GestionEventos/ModalTablaPonentes';
import ModalTablaHorarios from 'Routes/GestionEventos/ModalTablaHorarios';
import { PDFDocument, rgb } from 'pdf-lib'
import config from '../../config'
import axios from 'axios';

const TablaMisCertificados = (props) => {

    const [eventoSeleccionado, setEventoSeleccionado] = useState({});
    const [mostrarModalPonente, setMostrarModalPonente] = useState(false);
    const [mostrarModalHorario, setMostrarModalHorario] = useState(false);
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
            title: 'Certificado',
            key: 'certificado',
            render: _info => (
                _info.tiene_certificado
                ?<div
                    onClick={async () => {
                        
                        const nombre_completo = _info.usuusuarios?.usunombre + " "+ _info.usuusuarios?.usuapell_paterno + " " +_info.usuusuarios?.usuapell_materno

                        const response = await fetch(config.api_url+"public/mostrar-certificado-evento/plantilla_constancia.pdf")

                        if(!response.ok){
                            alert("error")
                        }

                        const pdfBuffer = await response.arrayBuffer();
                        const pdfDoc = await PDFDocument.load(pdfBuffer);

                        const page = pdfDoc.getPages()[0];

                        const newText = nombre_completo;
                        
                        const font = await pdfDoc.embedFont('Helvetica');
                        const fontSize = 24;

                        const textWidth = font.widthOfTextAtSize(newText, fontSize);
                        const centerPage = page.getWidth() / 2;
                        const positionX = centerPage - (textWidth / 4);

                        page.drawText(newText, {
                            x: positionX,
                            y: 370,
                            size: 20,
                            width: 200,
                            height: 50
                        });

                        const pdfModificado = await pdfDoc.save();

                        const pdfBlob = new Blob([pdfModificado], { type: "application/pdf" });
                        const pdfUrl = URL.createObjectURL(pdfBlob);
                        
                        const a = document.createElement("a");
                        a.href = pdfUrl;
                        a.download = "archivo_modificado.pdf";
                        a.click();

                    }}
                    style={{
                        cursor: 'pointer',
                        color: 'blue',
                        textDecoration: 'underline'
                    }}
                >
                    Descargar
                </div>
                :<div
                    style={{
                        color:'red'
                    }}
                >
                    Pendiente
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

        </div>
    )
}

export default TablaMisCertificados