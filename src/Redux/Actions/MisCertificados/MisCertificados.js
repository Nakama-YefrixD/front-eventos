import config from '../../../config'
import { 
    OBTENER_MIS_CERTIFICADOS
} from "../../../Constantes/MisCertificados/MisCertificados";

export const ObtenerMisCertificadosReducer = () => async (dispatch) => {

    await fetch(config.api+'mostrar-mis-certificados',
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
            type: OBTENER_MIS_CERTIFICADOS,
            payload : data.data
        })
        
    }).catch((error)=> {
        console.log(error)
    })

}

export const ObtenerEstudiantesEventoReducer = (evento) => async (dispatch) => {

    await fetch(config.api+'mostrar-estudiantes-evento',
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
                req_evento : evento
            }),
        }
    )
    .then( async res => {return res.json()})
    .then(data => {

        
        
    }).catch((error)=> {
        console.log(error)
    })

}