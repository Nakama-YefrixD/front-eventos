import { 
    OBTENER_LISTA_EVENTOS_HOME
} from "../../../Constantes/Home/Home";


const INIT_STATE = {
    rex_lista_eventos_home : []
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case OBTENER_LISTA_EVENTOS_HOME: {
            return {
                ...state,
                rex_lista_eventos_home : action.payload
            }
        }
        default:
            return state;
    }
}