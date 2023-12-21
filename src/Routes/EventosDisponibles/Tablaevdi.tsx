import { 
	Box, Flex, Icon, Progress, 
	Table, Tbody, Td, Text, Th, Thead, Tr, 
	Input,
	Button,
	HStack,
	VStack,
	useColorModeValue 
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
import * as React from 'react';
// Assets
import { MdCancel, MdCheckCircle, MdOutlineError } from 'react-icons/md';

type RowObj = {
	name: string;
	status: string;
	date: string; 
	progress: number;
};

const columnHelper = createColumnHelper<RowObj>();

// const columns = columnsDataCheck;
export default function Tablaevdi(props: { tableData: any }) {
	const { tableData } = props;
	const [ sorting, setSorting ] = React.useState<SortingState>([]);
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
	let defaultData = tableData;
	const columns = [
		columnHelper.accessor('name', {
			id: 'name',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					Nombre del Evento
				</Text>
			),
			cell: (info: any) => (
				<Flex align='center'>
					<Flex align='center'>
						{info.getValue()}
					</Flex>
				</Flex>
			)
		}),
		columnHelper.accessor('name', {
			id: 'tipo',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					Tipo
				</Text>
			),
			cell: (info) => (
			<Flex align='center'>
				<Flex align='center'>
					texto
				</Flex>
			</Flex> 
			)
		}),
		columnHelper.accessor('name', {
			id: 'cupos',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					#Cupos
				</Text>
			),
			cell: (info) => (
				<Flex align='center'>
					{/* {info.getValue()} */}
					texto
				</Flex>
			)
		}),
		columnHelper.accessor('name', {
			id: 'ponente',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					Ponente
				</Text>
			),
			cell: (info) => (
				<Flex align='center'>
					texto
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
					Hrs Extracurriculares
				</Text>
			),
			cell: (info) => (
				<Flex align='center'>
					texto
				</Flex>
			)
		}),
		columnHelper.accessor('name', {
			id: 'fechahora',
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
					texto
				</Flex>
			)
		}),
		columnHelper.accessor('name', {
			id: 'flyer',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					Ver Flyer
				</Text>
			),
			cell: (info) => (
				<Flex align='center'>
					texto
				</Flex>
			)
		}),
		columnHelper.accessor('name', {
			id: 'inscripcion',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					Inscripción
				</Text>
			),
			cell: (info) => (
				<Flex align='center'>
					texto
				</Flex>
			)
		})
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

	// PAGINATE
	const [currentPage, setCurrentPage] = React.useState(1);
	const [itemsPerPage, setItemsPerPage] = React.useState(5);
	const [searchTerm, setSearchTerm] = React.useState('');
  
	const handlePageChange = (pageNumber: any) => {
	  setCurrentPage(pageNumber);
	};
  
	const handleItemsPerPageChange = (event: any) => {
	  setItemsPerPage(Number(event.target.value));
	  setCurrentPage(1); // Reseteamos a la primera página cuando cambia el número de elementos por página
	};
  
	const handleSearchChange = (event: any) => {
	  setSearchTerm(event.target.value);
	  setCurrentPage(1); // Reseteamos a la primera página cuando cambia el término de búsqueda
	};
  
	const filteredData = data.filter((item) =>
	  item.name.toLowerCase().includes(searchTerm.toLowerCase())
	);
  
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

	return (
		<Card flexDirection='column' w='100%' px='0px' overflowX={{ sm: 'scroll', lg: 'hidden' }}>
			<Box>

				<HStack>
					<Button
					disabled={currentPage === 1}
					onClick={() => handlePageChange(currentPage - 1)}
					>
					Anterior
					</Button>
					<Button
					disabled={indexOfLastItem >= filteredData.length}
					onClick={() => handlePageChange(currentPage + 1)}
					>
					Siguiente
					</Button>
					<span>
					Página {currentPage} de {Math.ceil(filteredData.length / itemsPerPage)}
					</span>
					<Input
					type="number"
					min="1"
					value={itemsPerPage}
					onChange={handleItemsPerPageChange}
					w="80px"
					/>
					<span>elementos por página</span>
				</HStack>

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
 