import config from '../../../config'
import { 
    OBTENER_LISTA_GESTION_CARRERAS,
} from "../../../Constantes/Administrador/GestionCarreras";

export const ObtenerGestionCarrerasReducer = (estado = null, fecha = null) => async ( dispatch ) => {

    await fetch(config.api+'administrador/mostrar-carreras',
        {
            mode:'cors',
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-type' : 'application/json',
                'usu_token'	   : localStorage.getItem("usutoken"),
            },
            body: JSON.stringify({
                
            }),
        }
    )
    .then( async res => {return res.json()})
    .then(data => {

        dispatch({
            type: OBTENER_LISTA_GESTION_CARRERAS,
            payload : data.data
        })
        
    }).catch((error)=> {
        console.log(error)
    })
    
}

export const EliminarCarreraReducer = (id) => async ( dispatch ) => {

    let dat_registrar = {}

    await fetch(config.api+'administrador/eliminar-carrera',
        {
            mode:'cors',
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-type' : 'application/json',
                'usu_token'	   : localStorage.getItem("usutoken"),
            },
            body: JSON.stringify({
                req_id_carrera : id
            }),
        }
    )
    .then( async res => {return res.json()})
    .then( async data => {

        dat_registrar = {
            "respuesta" : data.respuesta,
            "mensaje" : data.message
        }
        await dispatch(ObtenerGestionCarrerasReducer())
        
    }).catch((error)=> {
        console.log(error)
    })
    
    return dat_registrar
}

export const EditarCarreraReducer = (id, nombre) => async ( dispatch ) => {

    let dat_registrar = {}

    await fetch(config.api+'administrador/editar-carrera',
        {
            mode:'cors',
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-type' : 'application/json',
                'usu_token'	   : localStorage.getItem("usutoken"),
            },
            body: JSON.stringify({
                req_id_carrera : id,
                req_nombre_carrera : nombre
            }),
        }
    )
    .then( async res => {return res.json()})
    .then( async data => {

        dat_registrar = {
            "respuesta" : data.respuesta,
            "mensaje" : data.message
        }

        await dispatch(ObtenerGestionCarrerasReducer())
        
    }).catch((error)=> {
        console.log(error)
    })
    
    return dat_registrar
}

export const CrearCarreraReducer = (nombre) => async ( dispatch ) => {

    let dat_registrar = {}

    await fetch(config.api+'administrador/crear-carrera',
        {
            mode:'cors',
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-type' : 'application/json',
                'usu_token'	   : localStorage.getItem("usutoken"),
            },
            body: JSON.stringify({
                req_nombre_carrera : nombre
            }),
        }
    )
    .then( async res => {return res.json()})
    .then( async data => {

        dat_registrar = {
            "respuesta" : data.respuesta,
            "mensaje" : data.message
        }

        await dispatch(ObtenerGestionCarrerasReducer())
        
    }).catch((error)=> {
        console.log(error)
    })
    
    return dat_registrar
}