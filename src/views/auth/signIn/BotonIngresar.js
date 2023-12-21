import React from 'react'
// Chakra imports
import {
    Button,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {
    LoginReducer
} from '../../../Redux/Actions/Login/Login'
import cogoToast from 'cogo-toast';
 
const BotonIngresar = (props) => {

    const dispatch = useDispatch()
    const history = useHistory();
    const email = props.email
    const contrasenia = props.contrasenia

    return (
        <div>
            <Button
                fontSize='sm'
                variant='brand'
                fontWeight='500'
                w='100%'
                h='50'
                mb='24px'
                onClick={async() => {
                    console.log(email);
                    console.log(contrasenia);
                    const rpta = await dispatch(LoginReducer(email, contrasenia))
                    if(rpta.respuesta){
                        cogoToast.success(
                            'El usuario y contraseña fueron correctos',
                            {
                                position: 'top-right',
                                heading: 'Login Correcto'
                            },
                        );
                        window.location.reload()
                        // history.push('/otros/home');
                    }else{
                        cogoToast.error(
                            'Lo sentimos, el usuario ingresado es incorrecto',
                            {
                                position: 'top-right',
                                heading: 'Login Incorrecto'
                            },
                        );
                    }
                }}
            >
                Iniciar Sesión
            </Button>
        </div>
    )
}

export default BotonIngresar