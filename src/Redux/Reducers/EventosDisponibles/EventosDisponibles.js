import { 
    OBTENER_EVENTOS_DISPONIBLES
} from "../../../Constantes/EventosDisponibles/EventosDisponibles";


const INIT_STATE = {
    rex_lista_eventos_disponibles : []
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case OBTENER_EVENTOS_DISPONIBLES: {
            return {
                ...state,
                rex_lista_eventos_disponibles : action.payload
            }
        }
        default:
            return state;
    }
}