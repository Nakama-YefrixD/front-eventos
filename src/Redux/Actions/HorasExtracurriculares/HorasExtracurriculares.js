import config from '../../../config'
import { 
    OBTENER_MIS_HRS_EXTRACURRICULARES,
    OBTENER_CANTIDAD_HRS_EXTRACURRICULARES
} from "../../../Constantes/HorasExtracurriculares/HorasExtracurriculares";

export const ObtenerMisHrsExtracurricularesReducer = () => async (dispatch) => {

    await fetch(config.api+'mostrar-mis-hrs-extracurriculares',
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
            type: OBTENER_MIS_HRS_EXTRACURRICULARES,
            payload : data.data
        })
        dispatch({
            type: OBTENER_CANTIDAD_HRS_EXTRACURRICULARES,
            payload : data.cntd
        })
        
    }).catch((error)=> {
        console.log(error)
    })

}