import { 
    OBTENER_MIS_HRS_EXTRACURRICULARES,
    OBTENER_CANTIDAD_HRS_EXTRACURRICULARES
} from "../../../Constantes/HorasExtracurriculares/HorasExtracurriculares";


const INIT_STATE = {
    rex_lista_mis_hrs_extracurriculares : [],
    rex_cnt_hrs_extracurriculares : 0
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case OBTENER_MIS_HRS_EXTRACURRICULARES: {
            return {
                ...state,
                rex_lista_mis_hrs_extracurriculares : action.payload
            }
        }
        case OBTENER_CANTIDAD_HRS_EXTRACURRICULARES: {
            return {
                ...state,
                rex_cnt_hrs_extracurriculares : action.payload
            }
        }
        default:
            return state;
    }
}