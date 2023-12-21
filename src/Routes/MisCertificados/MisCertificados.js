import React, {useEffect} from 'react'
import TablaMisCertificados from './TablaMisCertificados';
import { useSelector, useDispatch } from 'react-redux'
import {
    ObtenerMisCertificadosReducer
} from '../../Redux/Actions/MisCertificados/MisCertificados'

const MisCertificados = () => {

    const dispatch = useDispatch()

    const {
		rex_lista_mis_certificados
    } = useSelector(({misCertificados}) => misCertificados)

    useEffect(() => {
        dispatch(ObtenerMisCertificadosReducer())
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
                Mis Certificados
            </div>
            
            
            <TablaMisCertificados 
                table_data = {rex_lista_mis_certificados}
            />
            
        </div>
    )
}

export default MisCertificados