import config from '../../../config'
import { 
    OBTENER_EVENTOS_DISPONIBLES
} from "../../../Constantes/EventosDisponibles/EventosDisponibles";

export const ObtenerEventosDisponiblesReducer = (evento) => async (dispatch) => {

    await fetch(config.api+'mostrar-eventos-disponibles',
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
            type: OBTENER_EVENTOS_DISPONIBLES,
            payload : data.data
        })
        
    }).catch((error)=> {
        console.log(error)
    })

}

export const InscribirmeEventoReducer = (evento) => async (dispatch) => {

    await fetch(config.api+'mostrar-eventos-disponibles',
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
            type: OBTENER_EVENTOS_DISPONIBLES,
            payload : data.data
        })
        
    }).catch((error)=> {
        console.log(error)
    })

}