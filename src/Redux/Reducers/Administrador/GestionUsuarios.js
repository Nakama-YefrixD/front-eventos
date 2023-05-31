import { 
    OBTENER_LISTA_USUARIOS_ADMINISTRADOR,
    USUARIO_SELECCIONADO_ADMINISTRADOR
} from "../../../Constantes/Administrador/GestionUsuarios";


const INIT_STATE = {
    rex_lista_usuarios_adminsitrador : [],
    rex_usuario_seleccionado_administrador : {}
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case OBTENER_LISTA_USUARIOS_ADMINISTRADOR: {
            return {
                ...state,
                rex_lista_usuarios_adminsitrador : action.payload
            }
        }
        case USUARIO_SELECCIONADO_ADMINISTRADOR: {
            return {
                ...state,
                rex_usuario_seleccionado_administrador : action.payload
            }
        }
        default:
            return state;
    }
}