import { 
    USUARIO_SELECCIONADO
} from "../../../Constantes/Login/Login";


const INIT_STATE = {
    rex_usuario_seleccionado : null
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case USUARIO_SELECCIONADO: {
            return {
                ...state,
                rex_usuario_seleccionado : action.payload
            }
        }
        default:
            return state;
    }
}