import React, {useEffect} from 'react'
import TablaAdminMisCertificados from './TablaAdminMisCertificados';
import { useSelector, useDispatch } from 'react-redux'
import {
    ObtenerMisCertificadosReducer
} from '../../Redux/Actions/MisCertificados/MisCertificados'

const AdminMisCertificados = () => {

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
                Admin Certificados
            </div>
            
            
            <TablaAdminMisCertificados 
                table_data = {rex_lista_mis_certificados}
            />

            
            
        </div>
    )
}

export default AdminMisCertificados