import config from '../../../config'
import { 
    OBTENER_LISTA_EVENTOS_REALIZADOS
} from "../../../Constantes/EventosRealizados/EventosRealizados";

export const ObtenerEventosRealizadosReducer = () => async (dispatch) => {

    await fetch(config.api+'mostrar-eventos-realizados',
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
            type: OBTENER_LISTA_EVENTOS_REALIZADOS,
            payload : data.data
        })
        
    }).catch((error)=> {
        console.log(error)
    })

}

export const DescargarPlantillaListaUsuariosReducer = (idevento) => async (dispatch) => {

    await fetch(config.api+'carga-masiva/descargar-plantilla-estudiantes',
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
                req_idevento : idevento
            }),
        }
    )
    // .then( async res => {return res.json()})
    .then((response) => {
        if (response.ok) {
            // Crear un enlace temporal para la descarga
            return response.blob();
        } else {
            throw new Error('Error al descargar el archivo');
        }
    })
    .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'miArchivo.xlsx'; // Nombre del archivo
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    })
    .catch((error)=> {
        console.log(error)
    })
}