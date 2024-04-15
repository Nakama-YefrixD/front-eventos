import React, {useState, useEffect} from 'react'
import TablaGestionCarreras from './TablaGestionCarreras'
import tableDataComplex from 'views/admin/dataTables/variables/tableDataComplex';
import Card from 'components/card/Card';
import { useHistory } from "react-router-dom";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    FormControl,
    ModalHeader,
    ModalBody,
    FormLabel,
    Input,
    ModalFooter,
    Button
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux'
import {
    CrearCarreraReducer,
    EliminarCarreraReducer,
    ObtenerGestionCarrerasReducer,
    
} from '../../Redux/Actions/Administrador/GestionCarreras'
import RegistrarCarrera from './RegistrarCarrera';
import cogoToast from 'cogo-toast';
import TabGestionCarreras from './TabGestionCarreras';

const GestionCarreras = () => {

    const history = useHistory();
    const [showModalCrearCarrera, setShowModalCrearCarrera] = useState(false)
    const [showTableCarreras, setShowTableCarreras] = useState(true)
    const [loadingCarrera, setLoadingCarrera] = useState(false)
    
    const dispatch = useDispatch()
    
    const {
		rex_lista_gestion_carreras
    } = useSelector(({adminGestionCarreras}) => adminGestionCarreras)

    useEffect(() => {
        dispatch(ObtenerGestionCarrerasReducer())
    }, [])

    const EliminarCarrera = async (id) => {
        const rpta = await dispatch(EliminarCarreraReducer(id))
        
        if(rpta.respuesta){
            cogoToast.success(
                rpta.mensaje,
                {
                    position: 'top-right',
                    heading: 'Carrera Eliminada'
                },
            );
            setShowTableCarreras(false)
        }else{

        }
        setTimeout(() => {
            setShowTableCarreras(true)
        }, 500)
        return rpta
    }

    const CrearCarrera = async (nombre) => {
        setLoadingCarrera(true)
        const rpta = await dispatch(CrearCarreraReducer(nombre))
        setLoadingCarrera(false)
        if(rpta.respuesta){
            cogoToast.success(
                rpta.mensaje,
                {
                    position: 'top-right',
                    heading: 'Carrera Creada'
                },
            );
            setShowModalCrearCarrera(false)
        }else{

        }
        
        setShowTableCarreras(false)
        setTimeout(() => {
            setShowTableCarreras(true)
        }, 500)
        return rpta
    }

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
                Gestion de Carreras
            </div>


            <div 
                style={{
                    marginBottom:'20px'
                }}
            >
                <div
                    style={{
                    }}
                >
                    <div
                        style={{
                            width:'110px',
                            height:'40px',
                            background:'#0C0F59',
                            color:'white',
                            borderRadius:'8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor:'pointer',
                            
                        }}
                        onClick={() => {
                            setShowModalCrearCarrera(!showModalCrearCarrera)
                        }}
                    >
                        Agregar
                    </div>
                </div>
                
            </div>
            
            {/* {
                rex_lista_gestion_carreras.length > 0 && showTableCarreras
                ?<TablaGestionCarreras 
                    tableData={rex_lista_gestion_carreras}
                    lista_data = {rex_lista_gestion_carreras}
                    eliminarCarrera = {EliminarCarrera}
                />
                :null
            } */}

            <TabGestionCarreras 
                table_data = {rex_lista_gestion_carreras}
                eliminarCarrera = {EliminarCarrera}
            />
            
            <RegistrarCarrera 
                mostrarModal = {showModalCrearCarrera}
                setMostrarModal = {setShowModalCrearCarrera}
                funCrear = {CrearCarrera}
                loading = {loadingCarrera}
            />

        </div>
    )
}

export default GestionCarreras