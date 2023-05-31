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
	name: string;
	status: string;
	date: string; 
	progress: number;
};

const columnHelper = createColumnHelper<RowObj>();

// const columns = columnsDataCheck;
export default function TablaGestionCarreras(props: { tableData: any }) {
	const { tableData } = props;
	const [ sorting, setSorting ] = React.useState<SortingState>([]);
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

	const [showDeleteRow, setShowDeleteRow] = useState(false)

	let defaultData = tableData;
	const columns = [
		columnHelper.accessor('name', {
			id: 'nombreevento',
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
						{/* {info.getValue()} */}
						Texto
					</Text>
				</Flex>
			)
		}),
        columnHelper.accessor('name', {
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
				AlertDialogExample(showDeleteRow, () => {setShowDeleteRow(!showDeleteRow)})
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
			</Box>
		</Card>
	);
}
 

function AlertDialogExample(isOpen:boolean, onOpenClose:Function ) {
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
				<Button colorScheme='red' onClick={() => {onOpenClose()}} ml={3}>
				  Eliminar
				</Button>
			  </AlertDialogFooter>
			</AlertDialogContent>
		  </AlertDialogOverlay>
		</AlertDialog>
	  </>
	)
}