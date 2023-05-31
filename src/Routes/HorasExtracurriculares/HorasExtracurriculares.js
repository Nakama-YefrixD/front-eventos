import React from 'react'
import TablaHoraExtra from './TablaHoraExtra'
import tableDataComplex from 'views/admin/dataTables/variables/tableDataComplex';
import MiniStatistics from 'components/card/MiniStatistics';
import IconBox from 'components/icons/IconBox';
import { Icon, SimpleGrid } from '@chakra-ui/react';
import { MdAddTask } from 'react-icons/md';

const HorasExtracurriculares = () => {
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
                Horas Extracurriculares
            </div>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3, '2xl': 12 }} gap='20px' mb='20px'>
                <div></div>
                <div>
                    <MiniStatistics
                        startContent={
                            <IconBox
                                w='56px'
                                h='56px'
                                bg='linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)'
                                icon={<Icon w='28px' h='28px' as={MdAddTask} color='white' />}
                            />
                        }
                        name='Horas Acumuladas'
                        value='154'
                    />
                </div>
                <div></div>
            </SimpleGrid>
            <TablaHoraExtra tableData={tableDataComplex} />
            
        </div>
    )
}

export default HorasExtracurriculares