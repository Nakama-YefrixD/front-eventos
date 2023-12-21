import { 
    OBTENER_LISTA_EVENTOS_REALIZADOS
} from "../../../Constantes/EventosRealizados/EventosRealizados";


const INIT_STATE = {
    rex_lista_eventos_realizados : []
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case OBTENER_LISTA_EVENTOS_REALIZADOS: {
            return {
                ...state,
                rex_lista_eventos_realizados : action.payload
            }
        }
        default:
            return state;
    }
}