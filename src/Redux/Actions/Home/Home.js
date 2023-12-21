import {
    OBTENER_LISTA_EVENTOS_HOME
} from '../../../Constantes/Home/Home'
import config from '../../../config'

export const ObtenerEventosHomeReducer = () => async ( dispatch ) => {

    await fetch(config.api+'home-eventos',
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
            type: OBTENER_LISTA_EVENTOS_HOME,
            payload : data.data
        })
        
    }).catch((error)=> {
        console.log(error)
    })
    
}