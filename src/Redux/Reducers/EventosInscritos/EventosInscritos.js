import { 
    OBTENER_EVENTOS_INSCRITOS,
    AGREGAR_EVENTOS_INSCRITOS
} from "../../../Constantes/EventosInscritos/EventosInscritos";


const INIT_STATE = {
    rex_lista_eventos_inscritos : [],
    rex_eventos_inscritos : [],
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case OBTENER_EVENTOS_INSCRITOS: {
            return {
                ...state,
                rex_lista_eventos_inscritos : action.payload
            }
        }
        case AGREGAR_EVENTOS_INSCRITOS: {
            return {
                ...state,
                rex_eventos_inscritos : action.payload
            }
        }
        default:
            return state;
    }
}