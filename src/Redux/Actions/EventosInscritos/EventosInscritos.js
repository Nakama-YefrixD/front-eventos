import config from '../../../config'
import { 
    OBTENER_EVENTOS_INSCRITOS,
    AGREGAR_EVENTOS_INSCRITOS
} from "../../../Constantes/EventosInscritos/EventosInscritos";

export const ObtenerEventosInscritosReducer = () => async (dispatch) => {

    await fetch(config.api+'mostrar-eventos-inscritos',
        {
            mode:'cors',
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-type' : 'application/json',
                'usu_token'	   : localStorage.getItem("usutoken"),
            },
            body: JSON.stringify({
                req_usutoken : localStorage.getItem("usutoken")
            }),
        }
    )
    .then( async res => {return res.json()})
    .then(data => {

        dispatch({
            type: OBTENER_EVENTOS_INSCRITOS,
            payload : data.data
        })
        
    }).catch((error)=> {
        console.log(error)
    })
    
    return true
}

export const InscribirUsuarioEventoReducer = (eventoid) => async (dispatch, getState) => {

    let rpta = {}
    let rex_eventos_inscritos = getState().eventosInscritos.rex_eventos_inscritos
    
    await fetch(config.api+'inscribir-usuario-evento',
        {
            mode:'cors',
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-type' : 'application/json',
                'usu_token'	   : localStorage.getItem("usutoken"),
            },
            body: JSON.stringify({
                req_usutoken : localStorage.getItem("usutoken"),
                req_eventoid : eventoid
            }),
        }
    )
    .then( async res => {return res.json()})
    .then(async data => {

        await dispatch(ObtenerEventosInscritosReducer())
        rpta = data
        rex_eventos_inscritos.push(eventoid)
        dispatch({
            type: AGREGAR_EVENTOS_INSCRITOS,
            payload : rex_eventos_inscritos
        })
    }).catch((error)=> {
        console.log(error)
    })

    return rpta
}