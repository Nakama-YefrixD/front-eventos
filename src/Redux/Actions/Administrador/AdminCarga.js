import config from '../../../config'
import axios from 'axios';

export const SubirArchivosEstudiantesReducer = (archivo) => async ( dispatch ) => {

    const formData = new FormData();
    formData.append('listado_carga', archivo);

    const rquest = await axios.post(config.api+'/carga-masiva/usuarios-estudiantes', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'usutoken'	   : localStorage.getItem('usutoken'),
        },
    })
    
    return true
}
