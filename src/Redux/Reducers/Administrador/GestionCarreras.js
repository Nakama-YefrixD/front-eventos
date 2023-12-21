import { 
    OBTENER_LISTA_GESTION_CARRERAS
} from "../../../Constantes/Administrador/GestionCarreras";


const INIT_STATE = {
    rex_lista_gestion_carreras : [],
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case OBTENER_LISTA_GESTION_CARRERAS: {
            return {
                ...state,
                rex_lista_gestion_carreras : action.payload
            }
        }
        default:
            return state;
    }
}