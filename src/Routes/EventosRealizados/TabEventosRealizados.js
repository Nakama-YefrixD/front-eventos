import React, { useState, useRef } from 'react';
import { Table, Input, Button, Space, Modal, Tooltip } from 'antd';
import { SearchOutlined, UserAddOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import ModalTablaPonentes from 'Routes/GestionEventos/ModalTablaPonentes';
import ModalTablaHorarios from 'Routes/GestionEventos/ModalTablaHorarios';
import ModalAsistencias from './ModalAsistencias';
import { useSelector, useDispatch } from 'react-redux'
import {
    DescargarPlantillaListaUsuariosReducer
} from '../../Redux/Actions/EventosRealizados/EventosRealizados'
import {
    SubirArchivosAsistenciasReducer
} from '../../Redux/Actions/CargaAsistencias/CargaAsistencias'
import cogoToast from 'cogo-toast';
import ModalEstudiantes from './ModalEstudiantes';

const TabEventosRealizados = (props) => {

    const dispatch = useDispatch()
    const refInput = useRef(null)
    const [file, selectFile] = useState(null)

    const [eventoSeleccionado, setEventoSeleccionado] = useState({});
    const [mostrarModalPonente, setMostrarModalPonente] = useState(false);
    const [mostrarModalHorario, setMostrarModalHorario] = useState(false);
    const [mostrarModalAsistencia, setMostrarModalAsistencia] = useState(false);
    const [mostrarModalEstudiantes, setMostrarModalEstudiantes] = useState(false)
    const [fechaEventoSeleccionado, setFechaEventoSeleccionado] = useState({});

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

    // Modal Confirmar Subir Archivo

    const [mostrar_modal_confirmacion, setMostrar_modal_confirmacion] = useState(false);
    const [cargando_modal_confirmacion, setCargando_modal_confirmacion] = useState(false);

    const columns = [
        {
            title: 'Nombre del Evento',
            key: 'nombre',
            // ...getColumnSearchPropsProps('eventos', 'nombre', 'nombre'), // Columna con filtro
            render: (info) => (
                <div>
                    {
                        info.eventos?.nombre
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
            // ...getColumnSearchPropsProps('eventos', 'tipoevento', 'tipoevento'), // Columna con filtro
            render: (info) => (
                <div>
                    {
                        info.eventos?.tipoevento
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
            title: 'Asistencias',            
            key: 'asistencia',
            render: (info) => (
                <div
                    onClick={() => {
                        setEventoSeleccionado(info)
                        setMostrarModalAsistencia(!mostrarModalHorario)  
                    }}
                    style={{
                        cursor: 'pointer',
                        color: 'blue',
                        textDecoration: 'underline'
                    }}
                >
                    Asistencia
                </div>
            )
        },
        // {
        //     title: 'Encuesta de Satisfacción',
        //     key: 'encuestado',
        //     render: _info => (
        //         _info.encuestado
        //         ?<div
        //             style={{
        //                 color: '#2AD295'
        //             }}
        //         >
        //             Realizado
        //         </div>
        //         :<div
        //             style={{
        //                 cursor: 'pointer',
        //                 color: 'blue',
        //                 textDecoration: 'underline'
        //             }}
        //         >
        //             Pendiente
        //         </div>
        //     )
        // },
        {
            title: 'Asistencia',
            key: 'asistencia',
            render: _info => (
                <div
                    style={{
                        display: 'flex'
                    }}
                >
                    <div 
                        style={{
                            marginRight: '10px',
                            fontSize: '15px',
                            color:'blue',
                            cursor: 'pointer'
                        }}
                    >
                        <Tooltip 
                            placement="bottom" 
                            title={"Descargar Lista"}
                        >
                            <DownloadOutlined 
                                onClick={() => {
                                    // console.log(_info.eventos?.id);
                                    dispatch(DescargarPlantillaListaUsuariosReducer(_info.eventos?.id))
                                }}
                            />
                        </Tooltip>
                    </div>
                    <div
                        style={{
                            fontSize: '15px',
                            color:'green',
                            cursor: 'pointer'
                        }}
                    >
                        <Tooltip 
                            placement="bottom" 
                            title={"Subir Lista"}
                        >
                            <UploadOutlined 
                                onClick={() => {
                                    refInput.current.click()
                                }}
                            />
                        </Tooltip>
                        <input 
                            type='file' ref={refInput} 
                            onChange={(e) => {
                                selectFile(e.target.files[0])
                                setMostrar_modal_confirmacion(true)
                            }}
                            style={{
                                display:'none'
                            }}
                        />
                    </div>
                    
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
                mostrarModalAsistencia == true
                ?<ModalAsistencias 
                    mostrarModal = {mostrarModalAsistencia}
                    setMostrarModal = {setMostrarModalAsistencia}
                    eventoSeleccionado = {eventoSeleccionado}
                    mostrarModalEstudiantes = {mostrarModalEstudiantes}
                    setMostrarModalEstudiantes = {setMostrarModalEstudiantes}

                    fechaEventoSeleccionado = {fechaEventoSeleccionado}
                    setFechaEventoSeleccionado = {setFechaEventoSeleccionado}
                />
                :null
            }

            {
                mostrarModalEstudiantes == true
                ?<ModalEstudiantes 
                    mostrarModal = {mostrarModalEstudiantes}
                    setMostrarModal = {(estado) => {
                        setMostrarModalEstudiantes(estado)
                        setMostrarModalAsistencia(!mostrarModalAsistencia)
                    }}
                    eventoSeleccionado = {eventoSeleccionado}
                    
                    fechaEventoSeleccionado = {fechaEventoSeleccionado}
                    setFechaEventoSeleccionado = {setFechaEventoSeleccionado}
                />
                :null
            }

            <Modal 
                title="¿Esta seguro de cargar este archivo?" 
                open={mostrar_modal_confirmacion} 
                // onOk={async () => {
                //     await dispatch(SubirArchivosAsistenciasReducer(file))
                //     cogoToast.success(
                //         'Las asistencias fueron cargados correctamente',
                //         {
                //             position: 'top-right',
                //             heading: 'Carga Estudiantes'
                //         },
                //     );
                //     setMostrar_modal_confirmacion(!mostrar_modal_confirmacion)
                // }} 
                // onCancel={() => {
                //     setMostrar_modal_confirmacion(!mostrar_modal_confirmacion)
                // }}
                footer={[
                    <Button 
                        key="back" 
                        onClick={() => {
                            setMostrar_modal_confirmacion(!mostrar_modal_confirmacion)
                        }}
                    >
                      Cancelar
                    </Button>,
                    <Button 
                        key="submit" 
                        type="primary" 
                        loading={cargando_modal_confirmacion} 
                        onClick={ async () => {
                            setCargando_modal_confirmacion(true)
                            await dispatch(SubirArchivosAsistenciasReducer(file))
                            cogoToast.success(
                                'Las asistencias fueron cargados correctamente',
                                {
                                    position: 'top-right',
                                    heading: 'Carga Estudiantes'
                                },
                            );
                            setMostrar_modal_confirmacion(!mostrar_modal_confirmacion)
                            setCargando_modal_confirmacion(false)
                        }}
                    >
                      Aceptar
                    </Button>,
                    // <Button
                    //   key="link"
                    //   href="https://google.com"
                    //   type="primary"
                    //   loading={loading}
                    //   onClick={handleOk}
                    // >
                    //   Search on Google
                    // </Button>,
                ]}
            >
                {/* <p><b>¿Esta seguro de cargar este archivo?</b></p> */}
                <p style={{color:'blue'}}>
                    {
                        file 
                        ?file.name
                        :""
                    }
                </p>
            </Modal>
        </div>
    )
}

export default TabEventosRealizados