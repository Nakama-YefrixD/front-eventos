import React from 'react'
import Card from 'components/card/Card';
import { Box, Flex, Icon, Progress, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react';
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable
} from '@tanstack/react-table';
import { MdCancel, MdCheckCircle, MdOutlineError } from 'react-icons/md';
import Tablaevdi from './Tablaevdi';
import tableDataComplex from 'views/admin/dataTables/variables/tableDataComplex';


const EventosDisponibles = () => {
    
    return (
        <div>
            <br/>
            <br/>
            <br/>
            
            <div
                className='chakra-link css-jw2vrk'
                style={{
                    marginBottom:'15px'
                }}
            >
                Eventos Disponibles
            </div>

            <Tablaevdi tableData={tableDataComplex} />
        </div>
    )
}

export default EventosDisponibles