import { 
    OBTENER_MIS_CERTIFICADOS
} from "../../../Constantes/MisCertificados/MisCertificados";


const INIT_STATE = {
    rex_lista_mis_certificados : []
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case OBTENER_MIS_CERTIFICADOS: {
            return {
                ...state,
                rex_lista_mis_certificados : action.payload
            }
        }
        default:
            return state;
    }
}