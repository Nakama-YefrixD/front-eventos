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
import { useHistory } from "react-router-dom";

const TabGestionUsuarios = (props) => {

    const { 
        table_data,
        eliminarUsuario,
        editarUsuario
    } = props

    const history = useHistory();
    
    const [showDeleteRow, setShowDeleteRow] = useState(false)
    const [showLoading, setShowLoading] = useState(false)
    
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState({})
    
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
        onFilter: (value, record) => dataIndex == 'usuestado'
        ?record[dataIndex] 
            ?record[dataIndex] == true
                ? "Activo".toString().toLowerCase().includes(value.toLowerCase()) 
                : "Inactivo".toString().toLowerCase().includes(value.toLowerCase()) 
            : ''
        :record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
    });

    const columns = [
        // {
        //     title: 'Item',
        //     dataIndex: 'item',
        //     key: 'item'
        // },
        {
            title: 'Código',
            key: 'usucodigo_ucs',
            ...getColumnSearchProps('usucodigo_ucs'), // Columna con filtro
            render: _info => (
                <div onClick={() => console.log(_info)}>
                    <Flex align='center'>
                        <Text >
                            { _info.usucodigo_ucs }
                        </Text>
                    </Flex>
                </div>
            )
        },
        {
            title: 'Nombre',
            key: 'usunombre',
            ...getColumnSearchProps('usunombre'), // Columna con filtro
            render: _info => (
                <div>
                    <Flex align='center'>
                        <Text >
                            { _info.usunombre }
                        </Text>
                    </Flex>
                </div>
            )
        },
        {
            title: 'Correo',
            key: 'usuusuario',
            ...getColumnSearchProps('usuusuario'), // Columna con filtro
            render: _info => (
                <div>
                    <Flex align='center'>
                        <Text >
                            { _info.usuusuario }
                        </Text>
                    </Flex>
                </div>
            )
        },
        {
            title: 'Estado',            
            key: 'usuestado',
            ...getColumnSearchProps('usuestado'), // Columna con filtro
            render: _info => (
                <div>
                    <Text>
						{
							_info.usuestado == true
							?"Activo"
							:"Inactivo"
						}
					</Text>
                </div>
            )
        },
        {
            title: 'Rol',
            key: 'usurol',
            ...getColumnSearchProps('usurol'), // Columna con filtro
            render: _info => (
                <div>
                    <Text>
                        { _info.usurol }
					</Text>
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
                                    setUsuarioSeleccionado(_info)
                                    editarUsuario(_info.usuid)
								    history.push('/otros/editar-usuario');
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
								    setUsuarioSeleccionado(_info)
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

    return (
        <div>

            {
				AlertDialogExample(
					showDeleteRow, 
					() => {
						setShowDeleteRow(!showDeleteRow)
					},
					async () => {
						setShowLoading(!showLoading)
						const rpta = await eliminarUsuario(usuarioSeleccionado.usuid)
						setShowLoading(!showLoading)
					},
					showLoading
				)
			}

            <Table 
                dataSource={table_data} 
                columns={columns} 
            />

        </div>
    )
}

function AlertDialogExample(
	isOpen:boolean, 
	onOpenClose:Function, 
	eliminarUsuario: Function, 
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
                        const rpta = await eliminarUsuario()
						onOpenClose()
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

export default TabGestionUsuarios