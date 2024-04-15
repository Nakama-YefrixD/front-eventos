import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Input, Button, Space, Modal } from 'antd';
import { SearchOutlined, UserAddOutlined } from '@ant-design/icons';
import ModalTablaPonentes from 'Routes/GestionEventos/ModalTablaPonentes';
import ModalTablaHorarios from 'Routes/GestionEventos/ModalTablaHorarios';
import { useSelector, useDispatch } from 'react-redux'
import {
    InscribirUsuarioEventoReducer
} from '../../Redux/Actions/EventosInscritos/EventosInscritos'
import cogoToast from 'cogo-toast';
import config from '../../config'

const TablaEventDisp = (props) => {

    const dispatch = useDispatch()

    const {
		rex_eventos_inscritos
    } = useSelector(({eventosInscritos}) => eventosInscritos)

    const table_data = props.table_data
    // const [data, setData] = useState(props.table_data);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [eventoSeleccionado, setEventoSeleccionado] = useState({});
    const [mostrarModalPonente, setMostrarModalPonente] = useState(false);
    const [mostrarModalHorario, setMostrarModalHorario] = useState(false);

    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
    const [mostrarFlyer, setMostrarFlyer] = useState(false);

    const [loadingInscribirme, setLoadingInscribirme] = useState(false);
    const [mostrarTabla, setMostrarTabla] = useState(true);
    

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        // setData([{},{},{},{},{}]);
        // try {
        //   const response = await axios.get('URL_DE_TU_API');
        //   setData(response.data);
        // } catch (error) {
        //   console.error('Error fetching data:', error);
        // }
    };

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
            dataIndex: 'nombre',
            key: 'nombre',
            ...getColumnSearchProps('nombre'), // Columna con filtro
        },
        {
            title: 'Tipo',
            dataIndex: 'tipoevento',
            key: 'tipoevento',
            ...getColumnSearchProps('tipoevento'), // Columna con filtro
        },
        {
            title: '#Cupos',
            dataIndex: 'cupos',
            key: 'cupos',
            ...getColumnSearchProps('cupos'), // Columna con filtro
        },
        {
            title: 'Ponentes',
            key: 'ponentes',
            render: (info) => (
                <div
                    onClick={() => {
                        console.log(info);
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
            title: 'Hrs Extracurriculares',
            dataIndex: 'hrsextracurriculares',
            key: 'hrsextracurriculares',
            ...getColumnSearchProps('hrsextracurriculares'), // Columna con filtro
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
            title: 'Ver Flyer',
            key: 'flyer',
            render: (info) => (
                <div
                    onClick={() => {
                        setMostrarFlyer(!mostrarFlyer)
                        setEventoSeleccionado(info)
                        console.log(info);
                    }}
                    style={{
                        cursor: 'pointer',
                        color: 'blue',
                        textDecoration: 'underline'
                    }}
                >
                    Ver Flyer
                </div>
            )
        },
        {
            title: 'Inscripción',
            key: 'inscripcion',
            render: _info => (
                _info.eventosusuarios.length > 0
                ?<div
                    style={{
                        background: "#2AD295",
                        borderRadius: "8px",
                        color: "white",
                        textAlignLast: "center"
                    }}
                >
                    Ya inscrito
                </div>
                :rex_eventos_inscritos.find((l) => l === _info.id)
                    ?<div
                        style={{
                            background: "#2AD295",
                            borderRadius: "8px",
                            color: "white",
                            textAlignLast: "center"
                        }}
                        onClick={() => {
                        }}
                    >
                        Ya inscrito
                    </div>
                    :<div
                        onClick={() => {
                            setEventoSeleccionado(_info)
                            setMostrarConfirmacion(!mostrarConfirmacion)
                        }}
                        style={{cursor: 'pointer'}}
                    >
                        <UserAddOutlined style={{ fontSize: 18, color: '#1890ff' }} />
                    </div>
            )
        },
    ];

    return (
        <div>
            <Table 
                dataSource={table_data} columns={columns} 
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

            <Modal
                title="Confirmación"
                visible={mostrarConfirmacion}
                footer={[
                    <Button 
                        key="back" 
                        onClick={() => {
                            setMostrarConfirmacion(!mostrarConfirmacion)
                        }}
                    >
                        Cancelar
                    </Button>,
                    <Button 
                        key="submit" 
                        type="primary" 
                        loading={loadingInscribirme} 
                        onClick={async () => {
                            setLoadingInscribirme(true)
                            const rpta = await dispatch(InscribirUsuarioEventoReducer(eventoSeleccionado.id))
                            if(rpta.respuesta){
                                cogoToast.success(
                                    'Has sido inscrito correctametne',
                                    {
                                        position: 'top-right',
                                        heading: 'Inscripción Evento'
                                    },
                                );
                                setMostrarTabla(false)
                                setTimeout(() => {
                                    setMostrarTabla(true)
                                }, 1000)
                                // listaEventosInscritos.push(eventoSeleccionado.id)
                                // setListaEventosInscritos(listaEventosInscritos)
                            }
                            setLoadingInscribirme(false)
                            setMostrarConfirmacion(!mostrarConfirmacion)
                        }}
                    >
                      Aceptar
                    </Button>
                ]}
            >
                <p>¿Estás seguro de inscribirte a este evento?</p>
            </Modal>

            <Modal
                title="Flyer"
                visible={mostrarFlyer}
                width={"85%"}
                style={{ top: 20 }}
                footer={[
                    <Button 
                        key="back" 
                        onClick={() => {
                            setMostrarFlyer(!mostrarFlyer)
                        }}
                    >
                        Cancelar
                    </Button>
                ]}
                onCancel={() => setMostrarFlyer(!mostrarFlyer)}
            >
                <iframe
                    src={config.api_public+eventoSeleccionado.linkflyer}
                    // src={"http://192.168.100.16:8003/public//mostrar-flyter-evento/evento1-fFa6C.pdf"}
                    style={{
                        width:'100%',
                        height:'570px'
                    }}
                >

                </iframe>

            </Modal>

        </div>
    )
};

export default TablaEventDisp;
