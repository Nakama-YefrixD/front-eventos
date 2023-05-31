import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import AdminGestionUsuarios from './Administrador/GestionUsuarios'


const createRootReducer = (history) => combineReducers({
    router : connectRouter(history),
    adminGestionUsuarios : AdminGestionUsuarios,
});

export default createRootReducer