import config from '../../../config'
import { 
    OBTENER_LISTA_GESTION_EVENTOS,
    EVENTO_SELECCIONADO_ADMINISTRADOR,
    EDITAR_LISTA_FECHAS_EVENTOS,
    OBTENER_FECHAS_EVENTOS,
    OBTENER_ASISTENCIAS_EVENTO,
    OBTENER_PONENTES_EVENTOS,
    OBTENER_LISTA_PONENTES_EVENTOS
} from "../../../Constantes/Administrador/GestionEventos";
import axios from 'axios';

export const ObtenerGestionEventosReducer = (estado = null, fecha = null) => async ( dispatch ) => {

    await fetch(config.api+'administrador/mostrar-eventos',
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
                "req_fecha" : fecha,
            }),
        }
    )
    .then( async res => {return res.json()})
    .then(data => {

        dispatch({
            type: OBTENER_LISTA_GESTION_EVENTOS,
            payload : data.data
        })
        
    }).catch((error)=> {
        console.log(error)
    })
    
}

export const RegistrarEventoReducer = (evento) => async ( dispatch ) => {

    let dat_registrar = {}

    await fetch(config.api+'administrador/crear-evento',
        {
            mode:'cors',
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-type' : 'application/json',
                'usu_token'	   : localStorage.getItem("usutoken"),
            },
            body: JSON.stringify(evento),
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

export const SeleccionarEventoReducer = (evento) => async ( dispatch ) => {
    dispatch({
        type: EVENTO_SELECCIONADO_ADMINISTRADOR,
        payload : evento
    })
}

export const EliminarEventoReducer = (idevento) => async ( dispatch ) => {

    let dat_registrar = {}

    await fetch(config.api+'administrador/eliminar-evento',
        {
            mode:'cors',
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-type' : 'application/json',
                'usu_token'	   : localStorage.getItem("usutoken"),
            },
            body: JSON.stringify({
                "req_id" : idevento
            }),
        }
    )
    .then( async res => {return res.json()})
    .then(async data => {

        dat_registrar = data
        await dispatch(ObtenerGestionEventosReducer())

    }).catch((error)=> {
        console.log(error)
    })

    return dat_registrar
}

export const ActualizarDataEventoSeleccionadoReducer = (eventoSeleccionado) => async ( dispatch, getState ) =>  {

    const rex_lista_gestion_eventos = getState().adminGestionEventos.rex_lista_gestion_eventos
    
    console.log(eventoSeleccionado);

    if(!eventoSeleccionado.ponentes || eventoSeleccionado.edito == true){
        dispatch(ObtenerPonentesEventosReducer(eventoSeleccionado))
    }

    if(!eventoSeleccionado.fechas || eventoSeleccionado.edito == true){
        dispatch(ObtenerFechasEventosReducer(eventoSeleccionado))
    }

    // dispatch({
    //     type: EDITAR_LISTA_FECHAS_EVENTOS,
    //     payload: rex_lista_fechas_eventos
    // })
}

export const AgregarListaFechasEventosReducer = (data) => async ( dispatch, getState ) =>  {

    let rex_lista_fechas_eventos = getState().adminGestionEventos.rex_lista_fechas_eventos
    rex_lista_fechas_eventos.push(data)

    dispatch({
        type: EDITAR_LISTA_FECHAS_EVENTOS,
        payload: rex_lista_fechas_eventos
    })
}

export const EliminarItemListaFechasEventosReducer = (pos, borrartodo = false) => async ( dispatch, getState ) =>  {

    let rex_lista_fechas_eventos = getState().adminGestionEventos.rex_lista_fechas_eventos
    
    if(borrartodo){
        rex_lista_fechas_eventos.splice(1, 99)
    }else{
        rex_lista_fechas_eventos.splice(pos, 1)
    }

    dispatch({
        type: EDITAR_LISTA_FECHAS_EVENTOS,
        payload: rex_lista_fechas_eventos
    })
}

export const EditarListaFechasEventosReducer = (fecha, pos) => async ( dispatch, getState ) =>  {

    let rex_lista_fechas_eventos = getState().adminGestionEventos.rex_lista_fechas_eventos
    rex_lista_fechas_eventos[pos]['fecha'] = fecha

    dispatch({
        type: EDITAR_LISTA_FECHAS_EVENTOS,
        payload: rex_lista_fechas_eventos
    })
}

export const AgregarEventoReducer = (evento, archivo, fileCertificado) => async (dispatch, getState) => {
    
    let dat_registrar = {}

    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('fileCertificado', fileCertificado);
    formData.append('req_carrera', evento.req_carrera)
    formData.append('req_recurrente', evento.req_recurrente)
    formData.append('req_tipoensenanza', evento.req_tipoensenanza)
    formData.append('req_clasificacionevento', evento.req_clasificacionevento)
    formData.append('req_tipoevento', evento.req_tipoevento)
    formData.append('req_organizacion', evento.req_organizacion)
    formData.append('req_zoom', evento.req_zoom)
    formData.append('req_linkEncuesta', evento.req_linkEncuesta)
    formData.append('req_linkflyer', evento.req_linkflyer)
    formData.append('req_sede', evento.req_sede)
    formData.append('req_auditoria', evento.req_auditoria)
    formData.append('req_nombre', evento.req_nombre)
    formData.append('req_fecha', evento.req_fecha)
    formData.append('req_fechahora', evento.req_fechahora)
    formData.append('req_estado', evento.req_estado)
    formData.append('req_ponente', evento.req_ponente)
    formData.append('req_list_fechas', JSON.stringify(evento.req_list_fechas))
    formData.append('req_list_ponentes', JSON.stringify(evento.req_list_ponentes))
    formData.append('req_cupos', evento.req_cupos)
    formData.append('req_hrsextra', evento.req_hrsextra)

    await axios.post(config.api+'/administrador/crear-evento', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'usutoken'	   : localStorage.getItem('usutoken'),
        },
    })
    .then(async data => {
        
        // console.log("data: ---------------------")
        // console.log(data)
        dat_registrar = {
            "respuesta" : data.data.respuesta,
            "mensaje" : data.data.message
        }

        // console.log(dat_registrar)

        await dispatch(ObtenerGestionEventosReducer())
        
        dispatch({
            type: EDITAR_LISTA_FECHAS_EVENTOS,
            payload: [{
                fecha: null
            }]
        })

    }).catch((error)=> {
        console.log(error)
    })

    // await fetch(config.api+'administrador/crear-evento',
    //     {
    //         mode:'cors',
    //         method: 'POST',
    //         headers: {
    //             'Accept' : 'application/json',
    //             'Content-type' : 'application/json',
    //             'usu_token'	   : localStorage.getItem("usutoken"),
    //         },
    //         body: JSON.stringify(evento),
    //     }
    // )
    // .then( async res => {return res.json()})
    // .then(async data => {

    //     dat_registrar = {
    //         "respuesta" : data.respuesta,
    //         "mensaje" : data.message
    //     }

    //     await dispatch(ObtenerGestionEventosReducer())
        
    //     dispatch({
    //         type: EDITAR_LISTA_FECHAS_EVENTOS,
    //         payload: [{
    //             fecha: null
    //         }]
    //     })

    // }).catch((error)=> {
    //     console.log(error)
    // })
    

    return dat_registrar

}

export const EditarEventoReducer = (evento, archivo, fileCertificado) => async ( dispatch ) => {

    let dat_registrar = {}
    
    const formData = new FormData();
    formData.append('req_id', evento.req_id);
    formData.append('archivo', archivo);
    formData.append('fileCertificado', fileCertificado);
    formData.append('req_carrera', evento.req_carrera)
    formData.append('req_recurrente', evento.req_recurrente)
    formData.append('req_tipoensenanza', evento.req_tipoensenanza)
    formData.append('req_clasificacionevento', evento.req_clasificacionevento)
    formData.append('req_tipoevento', evento.req_tipoevento)
    formData.append('req_organizacion', evento.req_organizacion)
    formData.append('req_zoom', evento.req_zoom)
    formData.append('req_linkEncuesta', evento.req_linkEncuesta)
    formData.append('req_linkflyer', evento.req_linkflyer)
    formData.append('req_sede', evento.req_sede)
    formData.append('req_auditoria', evento.req_auditoria)
    formData.append('req_nombre', evento.req_nombre)
    formData.append('req_estado', evento.req_estado)
    formData.append('req_list_fechas', JSON.stringify(evento.req_list_fechas))
    formData.append('req_list_ponentes', JSON.stringify(evento.req_list_ponentes))
    formData.append('req_cupos', evento.req_cupos)
    formData.append('req_hrsextra', evento.req_hrsextra)

    await axios.post(config.api+'/administrador/editar-evento', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'usutoken'	   : localStorage.getItem('usutoken'),
        },
    })
    .then(async data => {
        
        dat_registrar = {
            "respuesta" : data.data.respuesta,
            "mensaje" : data.data.message
        }

        await dispatch(ObtenerGestionEventosReducer())
        
        dispatch({
            type: EDITAR_LISTA_FECHAS_EVENTOS,
            payload: [{
                fecha: null
            }]
        })

    }).catch((error)=> {
        console.log(error)
    })

    return dat_registrar
}


export const ObtenerFechasEventosReducer = (evento) => async (dispatch, getState) => {

    let rex_lista_gestion_eventos = getState().adminGestionEventos.rex_lista_gestion_eventos
    evento.idevento = evento.id

    await fetch(config.api+'administrador/mostrar-fechas-eventos',
        {
            mode:'cors',
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-type' : 'application/json',
                'usu_token'	   : localStorage.getItem("usutoken"),
            },
            body: JSON.stringify({
                "req_evento" : evento
            }),
        }
    )
    .then( async res => {return res.json()})
    .then(data => {

        dispatch({
            type: OBTENER_FECHAS_EVENTOS,
            payload : data.data
        })

        rex_lista_gestion_eventos.find(evt => evt.id == evento.id).fechas = data.data

        dispatch({
            type: OBTENER_LISTA_GESTION_EVENTOS,
            payload : rex_lista_gestion_eventos
        })
        
    }).catch((error)=> {
        console.log(error)
    })

}

export const ObtenerAsistenciaEventoReducer = (evento, fecha_evento) => async (dispatch) => {

    await fetch(config.api+'administrador/mostrar-asistencias-evento',
        {
            mode:'cors',
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-type' : 'application/json',
                'usu_token'	   : localStorage.getItem("usutoken"),
            },
            body: JSON.stringify({
                "req_evento" : evento,
                "req_fecha_evento" : fecha_evento
            }),
        }
    )
    .then( async res => {return res.json()})
    .then(data => {

        dispatch({
            type: OBTENER_ASISTENCIAS_EVENTO,
            payload : data.data
        })
        
    }).catch((error)=> {
        console.log(error)
    })

}

export const ObtenerPonentesEventosReducer = (evento) => async (dispatch, getState) => {

    let rex_lista_gestion_eventos = getState().adminGestionEventos.rex_lista_gestion_eventos

    await fetch(config.api+'administrador/mostrar-ponentes-eventos',
        {
            mode:'cors',
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-type' : 'application/json',
                'usu_token'	   : localStorage.getItem("usutoken"),
            },
            body: JSON.stringify({
                "req_evento" : evento
            }),
        }
    )
    .then( async res => {return res.json()})
    .then(data => {

        dispatch({
            type: OBTENER_PONENTES_EVENTOS,
            payload : data.data
        })

        rex_lista_gestion_eventos.find(evt => evt.id == evento.id).ponentes = data.data

        dispatch({
            type: OBTENER_LISTA_GESTION_EVENTOS,
            payload : rex_lista_gestion_eventos
        })
        
    }).catch((error)=> {
        console.log(error)
    })

}

export const ObtenerListaPonentesEventosReducer = () => async (dispatch) => {

    await fetch(config.api+'administrador/mostrar-lista-ponentes',
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
            type: OBTENER_LISTA_PONENTES_EVENTOS,
            payload : data.data
        })
        
    }).catch((error)=> {
        console.log(error)
    })

}