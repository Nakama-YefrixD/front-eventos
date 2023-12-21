import { 
    OBTENER_LISTA_GESTION_EVENTOS,
    EDITAR_LISTA_FECHAS_EVENTOS,
    OBTENER_FECHAS_EVENTOS,
    OBTENER_ASISTENCIAS_EVENTO,
    OBTENER_PONENTES_EVENTOS,
    OBTENER_LISTA_PONENTES_EVENTOS
} from "../../../Constantes/Administrador/GestionEventos";


const INIT_STATE = {
    rex_lista_gestion_eventos : [],
    rex_lista_fechas_eventos : [{
        fecha: null
    }],
    rex_lista_fechas_eventos_tabla : [],
    rex_lista_ponentes_eventos_tabla : [],
    rex_lista_completa_ponentes_eventos : [],
    rex_lista_asistencias_evento_tabla : []
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case OBTENER_LISTA_GESTION_EVENTOS: {
            return {
                ...state,
                rex_lista_gestion_eventos : action.payload
            }
        }
        case EDITAR_LISTA_FECHAS_EVENTOS: {
            return {
                ...state,
                rex_lista_fechas_eventos : action.payload
            }
        }
        case OBTENER_FECHAS_EVENTOS: {
            return {
                ...state,
                rex_lista_fechas_eventos_tabla : action.payload
            }
        }
        case OBTENER_PONENTES_EVENTOS: {
            return {
                ...state,
                rex_lista_ponentes_eventos_tabla : action.payload
            }
        } 
        case OBTENER_LISTA_PONENTES_EVENTOS: {
            return {
                ...state,
                rex_lista_completa_ponentes_eventos : action.payload
            }
        }
        case OBTENER_ASISTENCIAS_EVENTO: {
            return {
                ...state,
                rex_lista_asistencias_evento_tabla : action.payload
            }
        }
        default:
            return state;
    }
}