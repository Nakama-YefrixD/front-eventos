import config from '../../../config'
import {
    USUARIO_SELECCIONADO
} from '../../../Constantes/Login/Login'

export const LoginReducer = (correo, contrasenia) => async ( dispatch ) => {

    let rpta = {}

    await fetch(config.api+'login',
        {
            mode:'cors',
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-type' : 'application/json'
            },
            body: JSON.stringify({
                req_usucorreo : correo,
                req_usucontrasenia : contrasenia
            }),
        }
    )
    .then( async res => {return res.json()})
    .then(data => {

        rpta = data
        if(rpta.respuesta == true){

            localStorage.setItem('req_usucorreo', correo)
            localStorage.setItem('req_usucontrasenia', contrasenia)

            localStorage.setItem('usutoken', rpta.user.usutoken)
            dispatch({
                type: USUARIO_SELECCIONADO,
                payload: rpta.user
            })
        }else{
            if(localStorage.getItem('usutoken')){
                localStorage.clear()
                window.location.reload()
            }
        }
        
    }).catch((error)=> {
        console.log(error)
    })
    
    return rpta
}