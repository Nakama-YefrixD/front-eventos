import config from '../../../config'

export const EnviarCorreoReducer = (correo) => async ( dispatch ) => {

    let rpta = {}

    await fetch(config.api+'recuperar-contrasenia',
        {
            mode:'cors',
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-type' : 'application/json',
                'usu_token'	   : localStorage.getItem("usutoken"),
            },
            body: JSON.stringify({
                req_correo : correo
            }),
        }
    )
    .then( async res => {return res.json()})
    .then(data => {

        rpta = data
        
    }).catch((error)=> {
        console.log(error)
    })
    
    return rpta
}

export const CambiarContraseniaReducer = (token, contrasenia) => async ( dispatch ) => {

    let rpta = {}

    await fetch(config.api+'cambiar-contrasenia',
        {
            mode:'cors',
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-type' : 'application/json',
                'usu_token'	   : localStorage.getItem("usutoken"),
            },
            body: JSON.stringify({
                req_token : token,
                req_nuevacontrasenia : contrasenia
            }),
        }
    )
    .then( async res => {return res.json()})
    .then(data => {

        console.log(data);
        rpta = data

    }).catch((error)=> {
        console.log(error)
    })
    
    return rpta
}