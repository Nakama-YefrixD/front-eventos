import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { 
	Box, Flex, Icon, Progress, Table, 
	Tbody, Td, Text, Th, Thead, 
	Tr, useColorModeValue,
	Button,
	AlertDialog,
	AlertDialogOverlay,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogBody,
	AlertDialogFooter
} from '@chakra-ui/react';
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable
} from '@tanstack/react-table';
// Custom components
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import React, {useState, useEffect} from 'react';
// Assets
import { MdCancel, MdCheckCircle, MdOutlineError } from 'react-icons/md';
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux'

type RowObj = {
	usucodigo_ucs: string;
	usuid: number;
	usunombre: string;
	usuusuario: string;
	usurol: string;
	name: string;
	status: string;
	date: string; 
	progress: number;
	usuestado: boolean;
};

const columnHelper = createColumnHelper<RowObj>();

// const columns = columnsDataCheck;
export default function TablaGestionUsuarios(props: { tableData: any, lista_data: any, editarUsuario: any, eliminarUsuario: any }) {

	const history = useHistory();

	const { tableData, lista_data, editarUsuario, eliminarUsuario } = props;
	const [ sorting, setSorting ] = React.useState<SortingState>([]);
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

	const [showLoading, setShowLoading] = useState(false)
	const [showDeleteRow, setShowDeleteRow] = useState(false)
	const [usuidSeleccionado, setUsuidSeleccionado] = useState(0)

	let defaultData = tableData;
	const columns = [
		columnHelper.accessor('usucodigo_ucs', {
			id: 'usucodigo_ucs',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					Codigo
				</Text>
			),
			cell: (info: any) => (
				<Flex align='center'>
					{/* <Text color={textColor} fontSize='sm' fontWeight='700'> */}
					<Text >
						{info.getValue()}
						{/* Texto */}
					</Text>
				</Flex>
			)
		}),
		columnHelper.accessor('usunombre', {
			id: 'usunombre',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					Nombre
				</Text>
			),
			cell: (info: any) => (
				<Flex align='center'>
					{/* <Text color={textColor} fontSize='sm' fontWeight='700'> */}
					<Text >
						{info.getValue()}
						{/* Texto */}
					</Text>
				</Flex>
			)
		}),
		columnHelper.accessor('usuusuario', {
			id: 'fechahora',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					Correo Electronico
				</Text>
			),
			cell: (info) => (
				<Flex align='center'>
					{info.getValue()}
				</Flex>
			)
		}),
        columnHelper.accessor('usuestado', {
			id: 'estado',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					Estado
				</Text>
			),
			cell: (info) => (
				<Flex align='center'>
					{
						info.getValue() == true
						?"Activo"
						:"Desactivado"
					}
				</Flex>
			)
		}),
		columnHelper.accessor('usurol', {
			id: 'rol',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					Rol
				</Text>
			),
			cell: (info) => (
				<Flex align='center'>
					<Text >
						{info.getValue()}
					</Text>
				</Flex>
			)
		}),
        columnHelper.accessor('usuid', {
			id: 'hrsextra',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					Acciones
				</Text>
			),
			cell: (info) => (
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
								editarUsuario(info.getValue())
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
								setUsuidSeleccionado(info.getValue())
							}}
						>
							<DeleteIcon />
						</div>
					</div>
				</Flex>
			)
		}),
	];

	const [ data, setData ] = React.useState(() => [ ...lista_data ]);
	const table = useReactTable({
		data,
		columns,
		state: {
			sorting
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		debugTable: true
	});
	return (
		<Card flexDirection='column' w='100%' px='0px' overflowX={{ sm: 'scroll', lg: 'hidden' }}>
			{
				AlertDialogExample(
					showDeleteRow, 
					() => {
						setShowDeleteRow(!showDeleteRow)
					},
					async () => {
						setShowLoading(!showLoading)
						const rpta = await eliminarUsuario(usuidSeleccionado)
						setShowLoading(!showLoading)
					},
					showLoading
				)
			}
			<Box>
				{
					lista_data.length > 0
					?<Table variant='simple' color='gray.500' mb='24px' mt="12px">
						<Thead>
							{table.getHeaderGroups().map((headerGroup) => (
								<Tr key={headerGroup.id}>
									{headerGroup.headers.map((header) => {
										return (
											<Th
												key={header.id}
												colSpan={header.colSpan}
												pe='10px'
												borderColor={borderColor}
												cursor='pointer'
												onClick={header.column.getToggleSortingHandler()}>
												<Flex
													justifyContent='space-between'
													align='center'
													fontSize={{ sm: '10px', lg: '12px' }}
													color='gray.400'>
													{flexRender(header.column.columnDef.header, header.getContext())}{{
														asc: '',
														desc: '',
													}[header.column.getIsSorted() as string] ?? null}
												</Flex>
											</Th>
										);
									})}
								</Tr>
							))}
						</Thead>
						<Tbody>
							{table.getRowModel().rows.slice(0, 11).map((row) => {
								return (
									<Tr key={row.id}>
										{row.getVisibleCells().map((cell) => {
											return (
												<Td
													key={cell.id}
													fontSize={{ sm: '14px' }}
													minW={{ sm: '150px', md: '200px', lg: 'auto' }}
													borderColor='transparent'>
													{flexRender(cell.column.columnDef.cell, cell.getContext())}
												</Td>
											);
										})}
									</Tr>
								);
							})}
						</Tbody>
					</Table>
					:<></>
				}
				
			</Box>
		</Card>
	);
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
					onClick={() => {
						onOpenClose()
						eliminarUsuario()
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