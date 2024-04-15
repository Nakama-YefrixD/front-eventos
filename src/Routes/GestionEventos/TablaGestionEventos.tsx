import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { 
	Box, Flex, Icon, Progress, Table, Tbody, 
	Td, Text, Th, Thead, Tr, useColorModeValue,
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
import { format } from 'date-fns';
import EditarEvento from './EditarEvento';

type RowObj = {
	id: number;
	codigo: string;
	nombre: string;
	fechahora: string;
	estado: boolean;
	ponente: string;
};

const columnHelper = createColumnHelper<RowObj>();

// const columns = columnsDataCheck;
export default function TablaGestionEventos(
	props: { 
		tableData: any, lista_data: any, 
		editarEvento: any, eliminarEvento: any,
		setMostrarFechas: any, mostrarFechas: any,
		setEventoSeleccionado: any, setmostrarModalPonente : any,
		mostrarModalPonente: any
	}
) {

	const history = useHistory();

	const { 
		tableData, lista_data, editarEvento, eliminarEvento,
		setMostrarFechas, mostrarFechas, setEventoSeleccionado,
		setmostrarModalPonente, mostrarModalPonente
	} = props;

	const [ sorting, setSorting ] = React.useState<SortingState>([]);
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
	const [showDeleteRow, setShowDeleteRow] = useState(false)
	const [showLoading, setShowLoading] = useState(false)
	const [mostrarModalEditar, setMostrarModalEditar] = useState(false)
	// const [eventoSeleccionado, setEventoSeleccionado] = useState({})
	const [idEventoSeleccionado, setidEventoSeleccionado] = useState(0)

	let defaultData = tableData;
	const columns = [
		columnHelper.accessor('codigo', {
			id: 'codigo',
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
		columnHelper.accessor('nombre', {
			id: 'nombre',
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
		columnHelper.accessor('id', {
			id: 'id',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					Fecha y Hora
				</Text>
			),
			cell: (info) => (
				<Flex align='center'>
					<Text
						style={{	
							color: '#1A0DAB',
							textDecoration: 'underline',
							cursor: 'pointer'
						}}
						onClick={() => {
							setEventoSeleccionado({
								"id": info.getValue()
							})
							setMostrarFechas(!mostrarFechas)
						}}
					>
						Ver Horarios
						{
							// format(new Date(info.getValue()), "dd/MM/yyyy hh:mm a")
						}
					</Text>
				</Flex>
			)
		}),
        columnHelper.accessor('estado', {
			id: 'estado',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'
				>
					Estado
				</Text>
			),
			cell: (info) => (
				<Flex align='center'>
					<Text>
						{
							info.getValue() == true
							?"Activo"
							:"Inactivo"
						}
					</Text>
				</Flex>
			)
		}),
        columnHelper.accessor('id', {
			id: 'id',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'
				>
					Ponente
				</Text>
			),
			cell: (info) => (
				<Flex align='center'>
					<Text
						style={{	
							color: '#1A0DAB',
							textDecoration: 'underline',
							cursor: 'pointer'
						}}
						onClick={() => {
							setEventoSeleccionado({
								"id": info.getValue()
							})
							setmostrarModalPonente(!mostrarModalPonente)
						}}
					>
						Ver Ponentes
					</Text>
				</Flex>
			)
		}),
        columnHelper.accessor('id', {
			id: 'id',
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
								console.log(info);
								setEventoSeleccionado(info)
								setMostrarModalEditar(!mostrarModalEditar)
								// editarEvento(info.getValue())
								// history.push('/otros/editar-usuario');

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
								setidEventoSeleccionado(info.getValue())
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

	const FunEditarEvento = (evento = Object, fileFlyer = String, fileCertificado=String) => {
        console.log(evento);
        console.log(fileFlyer);
        console.log(fileCertificado);
    }


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
						const rpta = await eliminarEvento(idEventoSeleccionado)
						setShowLoading(!showLoading)
					},
					showLoading
				)
			}
			<Box>
				<Table variant='simple' color='gray.500' mb='24px' mt="12px">
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

				<EditarEvento 
					mostrarModal = {mostrarModalEditar}
					setMostrarModal = {setMostrarModalEditar}
					funEditarEvento = {FunEditarEvento}
				/>
			</Box>
		</Card>
	);
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
					onClick={() => {
						onOpenClose()
						eliminarEvento()
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