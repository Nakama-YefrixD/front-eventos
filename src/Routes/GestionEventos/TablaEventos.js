import React, {useState} from 'react'
import { Table, Input, Space, Button as ButtonAntd } from 'antd';
import { 
	Flex, Text,
    Button,
    AlertDialog,
	AlertDialogOverlay,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogBody,
	AlertDialogFooter
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { SearchOutlined } from '@ant-design/icons';
import EditarEvento from './EditarEvento';
import { useDispatch } from 'react-redux'
import { 
    ActualizarDataEventoSeleccionadoReducer,
    EditarEventoReducer
} from 'Redux/Actions/Administrador/GestionEventos';
import cogoToast from 'cogo-toast';

const TablaEventos = (props) => {

    const { 
        table_data,
        mostrarModalPonente,
        setmostrarModalPonente,
        setEventoSeleccionado,
        eventoSeleccionado,
        mostrarFechas,
        setMostrarFechas,
        eliminarEvento
    } = props

    const dispatch = useDispatch()

    const [showDeleteRow, setShowDeleteRow] = useState(false)
    const [showLoading, setShowLoading] = useState(false)
    const [idEventoSeleccionado, setidEventoSeleccionado] = useState(0)
    const [mostrarModalEditar, setMostrarModalEditar] = useState(false)

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
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
            <ButtonAntd
                type="primary"
                onClick={() => {
                    handleSearch(selectedKeys, confirm, dataIndex)
                }}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
            >
                Buscar
            </ButtonAntd>
            <ButtonAntd onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                Reiniciar
            </ButtonAntd>
            </Space>
        </div>
        ),
        filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) => dataIndex == 'estado'
        ?record[dataIndex] 
            ?record[dataIndex] == true
                ? "Activo".toString().toLowerCase().includes(value.toLowerCase()) 
                : "Inactivo".toString().toLowerCase().includes(value.toLowerCase()) 
            : ''
        :record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
    });

    const columns = [
        {
            title: 'Código',
            key: 'codigo',
            ...getColumnSearchProps('codigo'), // Columna con filtro
            render: _info => (
                <div>
                    <Flex align='center'>
                        <Text >
                            { _info.codigo }
                        </Text>
                    </Flex>
                </div>
            )
        },
        {
            title: 'Nombre',
            key: 'nombre',
            ...getColumnSearchProps('nombre'), // Columna con filtro
            render: _info => (
                <div>
                    <Flex align='center'>
                        <Text >
                            { _info.nombre }
                        </Text>
                    </Flex>
                </div>
            )
        },
        {
            title: 'Fecha y Hora',
            key: 'fechahora',
            render: _info => (
                <div
                    style={{	
                        color: '#1A0DAB',
                        textDecoration: 'underline',
                        cursor: 'pointer'
                    }}
                    onClick={() => {
                        setEventoSeleccionado(_info)
                        setMostrarFechas(!mostrarFechas)
                    }}
                >
                    Ver Horarios
                </div>
            )
        },
        {
            title: 'Estado',            
            key: 'estado',
            ...getColumnSearchProps('estado'), // Columna con filtro
            render: _info => (
                <div>
                    <Text>
						{
							_info.estado == true
							?"Activo"
							:"Inactivo"
						}
					</Text>
                </div>
            )
        },
        {
            title: 'Ponente',
            key: 'ponente',
            render: _info => (
                <div
                    style={{	
                        color: '#1A0DAB',
                        textDecoration: 'underline',
                        cursor: 'pointer'
                    }}
                    onClick={() => {
                        setEventoSeleccionado(_info)
                        setmostrarModalPonente(!mostrarModalPonente)
                    }}
                >
                    Ver Ponentes
                </div>
            )
        },
        {
            title: 'Acciones',
            key: 'acciones',
            render: _info => (
                <div>
                    <Flex align='center'>
                        <div
                            style={{display:'flex'}}
                        >
                            <div 
                                style={{
                                    fontSize:'18px',
                                    cursor:'pointer',
                                    marginRight:'10px',
                                    borderRadius:'100%',
                                    background:'#F2F2F2',
                                    color:'black',
                                    width:'27px',
                                    height:'27px',
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                                onClick={() => {
                                    dispatch(ActualizarDataEventoSeleccionadoReducer(_info))
                                    setEventoSeleccionado(_info)
                                    setMostrarModalEditar(!mostrarModalEditar)
                                }}
                            >
                                <EditIcon/>
                            </div>
                            <div
                                style={{
                                    fontSize:'18px',
                                    cursor:'pointer',
                                    marginRight:'10px',
                                    borderRadius:'100%',
                                    background:'#F2F2F2',
                                    color:'black',
                                    width:'27px',
                                    height:'27px',
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                                onClick={() => {
                                    setShowDeleteRow(!showDeleteRow)
                                    setidEventoSeleccionado(_info.id)
                                }}
                            >
                                <DeleteIcon />
                            </div>
                        </div>
                    </Flex>
                </div>
            )
        },
    ];

    const FunEditarEvento = async (evento = Object, fileFlyer = String, fileCertificado=String) => {

        const rpta = await dispatch(EditarEventoReducer(evento, fileFlyer, fileCertificado))
     
        return rpta
    }

    return (
        <>
            <Table 
                dataSource={table_data} 
                columns={columns} 
            />

            <EditarEvento 
                mostrarModal = {mostrarModalEditar}
                setMostrarModal = {setMostrarModalEditar}
                funEditarEvento = {FunEditarEvento}
                eventoSeleccionado = {eventoSeleccionado}
                setEventoSeleccionado = {setEventoSeleccionado}
            />

            {
				AlertDialogExample(
					showDeleteRow, 
					() => {
						setShowDeleteRow(!showDeleteRow)
					},
					async () => {
						setShowLoading(true)
						const rpta = await eliminarEvento(idEventoSeleccionado)
                        if(rpta.respuesta){
                            cogoToast.success(
                                'El evento fue eliminado correctamente',
                                {
                                    position: 'top-right',
                                    heading: 'Evento Eliminado'
                                },
                            );
                        }else{
                            cogoToast.success(
                                'Lo sentimos hubo un error al eliminar el evento',
                                {
                                    position: 'top-right',
                                    heading: 'Error Acción'
                                },
                            );
                        }
						setShowLoading(false)
					},
					showLoading
				)
			}
        </>
    )
}

function AlertDialogExample(
	isOpen:boolean, onOpenClose:Function,
	eliminarEvento: Function, loading:boolean
) {
	// const { isOpen, onOpen, onClose } = useDisclosure()
	const cancelRef = React.useRef()
  
	return (
	  <>
		<AlertDialog
		  isOpen={isOpen}
		  leastDestructiveRef={cancelRef}
		  onClose={() => {onOpenClose()}}
		>
		  <AlertDialogOverlay>
			<AlertDialogContent>
			  <AlertDialogHeader fontSize='lg' fontWeight='bold'>
				Eliminar Fila
			  </AlertDialogHeader>
  
			  <AlertDialogBody>
				¿Estas seguro de eliminar la fila seleccionada?
			  </AlertDialogBody>
  
			  <AlertDialogFooter>
				<Button 
					ref={cancelRef} 
					onClick={() => {
						onOpenClose()
					}}
				>
				  Cancelar
				</Button>
				<Button 
					colorScheme='red' 
					ml={3}
					onClick={async () => {
						onOpenClose()
						await eliminarEvento()
					}} 
					isLoading={loading}
				>
				  Eliminar
				</Button>
			  </AlertDialogFooter>
			</AlertDialogContent>
		  </AlertDialogOverlay>
		</AlertDialog>
	  </>
	)
}

export default TablaEventos