import React from 'react'
import { Box, Button, Flex, Grid, Link, Text, Icon, SimpleGrid } from '@chakra-ui/react';
import MiniStatistics from 'components/card/MiniStatistics';
import IconBox from 'components/icons/IconBox';
import { MdAddTask, MdAttachMoney, MdBarChart, MdFileCopy } from 'react-icons/md';
import TotalSpent from 'views/admin/default/components/TotalSpent';

const AdminHome = () => {
    return (
        <div>
            Home
            <br/>
            <br/>
            <br/>
            
            <div
                className='chakra-link css-jw2vrk'
                style={{
                    marginBottom:'20px'
                }}
            >
                ¡Bienvenido, Sebastian Gomez!
            </div>

            <SimpleGrid columns={{ base: 1, md: 3 }} gap='20px'>
                <MiniStatistics
                    startContent={
                        <IconBox
                            w='56px'
                            h='56px'
                            bg='linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)'
                            icon={<Icon w='28px' h='28px' as={MdAddTask} color='white' />}
                        />
                    }
                    name='Eventos Realizados en el Mes'
                    value='4 de 10'
                />

                <MiniStatistics
                    startContent={
                        <IconBox
                            w='56px'
                            h='56px'
                            bg='linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)'
                            icon={<Icon w='28px' h='28px' as={MdAddTask} color='white' />}
                        />
                    }
                    name='Eventos ...'
                    value='4 de 10'
                />

                <MiniStatistics
                    startContent={
                        <IconBox
                            w='56px'
                            h='56px'
                            bg='linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)'
                            icon={<Icon w='28px' h='28px' as={MdAddTask} color='white' />}
                        />
                    }
                    name='Eventos ...'
                    value='4 de 10'
                />
            </SimpleGrid>
            <div style={{margin:'20px'}}></div>
            <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap='20px' mb='20px'>
                <TotalSpent />
            </SimpleGrid>

        </div>
    )
}

export default AdminHome