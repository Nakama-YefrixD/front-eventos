import config from '../../../config'
import { 
    OBTENER_LISTA_USUARIOS_ADMINISTRADOR,
    USUARIO_SELECCIONADO_ADMINISTRADOR
} from '../../../Constantes/Administrador/GestionUsuarios'

export const ObtenerListaUsuariosAdministradorReducer = (estado = null, tipo_usuario = null) => async ( dispatch ) => {

    await fetch(config.api+'administrador/mostrar-usuario',
        {
            mode:'cors',
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-type' : 'application/json',
                'usu_token'	   : localStorage.getItem("usutoken"),
            },
            body: JSON.stringify({
                "req_estado" : estado,
                "req_tipo_usuario" : tipo_usuario,
            }),
        }
    )
    .then( async res => {return res.json()})
    .then(data => {

        dispatch({
            type: OBTENER_LISTA_USUARIOS_ADMINISTRADOR,
            payload : data.data
        })
        
    }).catch((error)=> {
        console.log(error)
    })
}

export const RegistrarUsuarioReducer = (usuario) => async ( dispatch ) => {

    let dat_registrar = {}

    await fetch(config.api+'administrador/crear-usuario',
        {
            mode:'cors',
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-type' : 'application/json',
                'usu_token'	   : localStorage.getItem("usutoken"),
            },
            body: JSON.stringify(usuario),
        }
    )
    .then( async res => {return res.json()})
    .then(data => {

        dat_registrar = {
            "respuesta" : data.respuesta,
            "mensaje" : data.message
        }
        
    }).catch((error)=> {
        console.log(error)
    })

    return dat_registrar
}

export const SeleccionarUsuarioReducer = (usuario) => async ( dispatch ) => {
    dispatch({
        type: USUARIO_SELECCIONADO_ADMINISTRADOR,
        payload : usuario
    })
}

export const EditarUsuarioReducer = (usuario) => async ( dispatch ) => {

    let dat_registrar = {}

    await fetch(config.api+'administrador/editar-usuario',
        {
            mode:'cors',
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-type' : 'application/json',
                'usu_token'	   : localStorage.getItem("usutoken"),
            },
            body: JSON.stringify(usuario),
        }
    )
    .then( async res => {return res.json()})
    .then(data => {

        dat_registrar = {
            "respuesta" : data.respuesta,
            "mensaje" : data.message
        }
        
    }).catch((error)=> {
        console.log(error)
    })

    return dat_registrar
}

export const EliminarUsuarioReducer = (usuid) => async ( dispatch ) => {

    let dat_registrar = {}

    await fetch(config.api+'administrador/eliminar-usuario',
        {
            mode:'cors',
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-type' : 'application/json',
                'usu_token'	   : localStorage.getItem("usutoken"),
            },
            body: JSON.stringify({
                "req_usuid" : usuid
            }),
        }
    )
    .then( async res => {return res.json()})
    .then(async data => {

        dat_registrar = data
        await dispatch(ObtenerListaUsuariosAdministradorReducer())

    }).catch((error)=> {
        console.log(error)
    })

    return dat_registrar
}