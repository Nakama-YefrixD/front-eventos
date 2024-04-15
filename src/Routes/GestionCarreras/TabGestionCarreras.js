import React, { useState, useEffect } from 'react';
import { Table, Input, Space, Button as ButtonAntd } from 'antd';
import { 
    DeleteIcon,
    EditIcon
} from '@chakra-ui/icons';
import { SearchOutlined } from '@ant-design/icons';
import { 
	Flex, Button,
    AlertDialog,
	AlertDialogOverlay,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogBody,
	AlertDialogFooter
} from '@chakra-ui/react';
import EditarCarrera from './EditarCarrera';
import cogoToast from 'cogo-toast';
import { EditarCarreraReducer, EditarInputCamposCarreraReducer } from 'Redux/Actions/Administrador/GestionCarreras';
import { useDispatch } from 'react-redux'

const TabGestionCarreras = (props) => {

    const { 
        table_data,
        eliminarCarrera
    } = props

    const dispatch = useDispatch()

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [showLoading, setShowLoading] = useState(false)
    const [showDeleteRow, setShowDeleteRow] = useState(false)
    const [mostrarModalEditar, setMostrarModalEditar] = useState(false)
    const [carreraSeleccionada, setCarreraSeleccionada] = useState({})

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
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
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
            title: 'Item',
            dataIndex: 'item',
            key: 'item'
        },
        {
            title: 'Nombre',
            dataIndex: 'nombre',
            key: 'nombre',
            ...getColumnSearchProps('nombre'), // Columna con filtro
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
                                    dispatch(EditarInputCamposCarreraReducer(_info.id, _info.nombre))
                                    setMostrarModalEditar(!mostrarModalEditar)
                                    setCarreraSeleccionada(_info)
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
                                onClick={ async () => {
                                    setCarreraSeleccionada(_info)
                                    setShowDeleteRow(!showDeleteRow)
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

    const funEditarCarrera = async (nombre) => {
        setShowLoading(true)
        const rpta = await dispatch(EditarCarreraReducer(carreraSeleccionada.id, nombre))
        setShowLoading(false)
        if(rpta.respuesta){
            cogoToast.success(
                rpta.mensaje,
                {
                    position: 'top-right',
                    heading: 'Carrera Creada'
                },
            );
            setMostrarModalEditar(false)
        }
        
        return rpta
    }

    return (
        <div>

            {
				AlertDialogExample(
					showDeleteRow, 
					() => {
						setShowDeleteRow(!showDeleteRow)
					},
					async () => {
						setShowLoading(true)
						const rpta = await eliminarCarrera(carreraSeleccionada.id)
						setShowLoading(false)
                        setShowDeleteRow(!showDeleteRow)
					},
					showLoading
				)
			}


            <Table 
                dataSource={table_data} 
                columns={columns} 
            />

            <EditarCarrera 
                mostrarModal    = {mostrarModalEditar}
                setMostrarModal = {setMostrarModalEditar}
                funEditar       = {funEditarCarrera}
                funEditarContenido = {(nombre) => dispatch(EditarInputCamposCarreraReducer(carreraSeleccionada.id, nombre))}
                loading         = {showLoading}
                carreraSeleccionada = {carreraSeleccionada}
            />

        </div>
    )
}

function AlertDialogExample(
	isOpen:boolean, 
	onOpenClose:Function,
	eliminarFun: Function, 
    loading:boolean
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
				<Button ref={cancelRef} onClick={() => {onOpenClose()}}>
				  Cancelar
				</Button>
				<Button 
					colorScheme='red' 
					ml={3}
					onClick={() => {
						// onOpenClose()
						eliminarFun()
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


export default TabGestionCarreras