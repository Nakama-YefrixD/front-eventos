import React, {useEffect} from 'react'
import MiniStatistics from 'components/card/MiniStatistics';
import IconBox from 'components/icons/IconBox';
import { Icon, SimpleGrid } from '@chakra-ui/react';
import { MdAddTask } from 'react-icons/md';
import TablaMisHorasExtracurriculares from './TablaMisHorasExtracurriculares';
import { useSelector, useDispatch } from 'react-redux'
import {
    ObtenerMisHrsExtracurricularesReducer
} from '../../Redux/Actions/HorasExtracurriculares/HorasExtracurriculares'

const HorasExtracurriculares = () => {

    const dispatch = useDispatch()

    const {
		rex_lista_mis_hrs_extracurriculares,
        rex_cnt_hrs_extracurriculares
    } = useSelector(({horasExtracurriculares}) => horasExtracurriculares)

    useEffect(() => {
        dispatch(ObtenerMisHrsExtracurricularesReducer())
    }, [])

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
                        value={rex_cnt_hrs_extracurriculares}
                    />
                </div>
                <div></div>
            </SimpleGrid>
            {/* <TablaHoraExtra tableData={tableDataComplex} /> */}
            <TablaMisHorasExtracurriculares 
                table_data = {rex_lista_mis_hrs_extracurriculares}
            />
            
        </div>
    )
}

export default HorasExtracurriculares