import { 
	Box, Flex, Icon, Progress, Table, 
	Tbody, Td, Text, Th, Thead, Tr, 
	useColorModeValue,
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
import React, {useState} from 'react';
// Assets
import { MdCancel, MdCheckCircle, MdOutlineError } from 'react-icons/md';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

type RowObj = {
	id: number;
	item: number;
	nombre: string;
};

const columnHelper = createColumnHelper<RowObj>();

// const columns = columnsDataCheck;
export default function TablaGestionCarreras(
	props: { 
		tableData: any,
		eliminarCarrera: any
	}
) {
	const { 
		tableData,
		eliminarCarrera
	} = props;
	const [ sorting, setSorting ] = React.useState<SortingState>([]);
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

	// const [ data, setData ] = React.useState(() => [ ...tableData ]);
	const [showDeleteRow, setShowDeleteRow] = useState(false)
	const [showLoading, setShowLoading] = useState(false)
	const [idCarreraSeleccionado, setidCarreraSeleccionado] = useState(0)

	let defaultData = tableData;
	const columns = [
		columnHelper.accessor('item', {
			id: 'item',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					Item
				</Text>
			),
			cell: (info: any) => (
				<Flex align='center'>
					{/* <Text color={textColor} fontSize='sm' fontWeight='700'> */}
					<Text >
						{info.getValue()}
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
					</Text>
				</Flex>
			)
		}),
        columnHelper.accessor('id', {
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
								setidCarreraSeleccionado(info.getValue())
							}}
						>
							<DeleteIcon />
						</div>
					</div>
				</Flex>
			)
		}),
	];
	const [ data, setData ] = React.useState(() => [ ...defaultData ]);
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
						const rpta = await eliminarCarrera(idCarreraSeleccionado)
						setShowLoading(!showLoading)
					},
					showLoading
				)
			}
			<Box>
				{
					defaultData.length > 0
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
	eliminarFun: Function, loading:boolean
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