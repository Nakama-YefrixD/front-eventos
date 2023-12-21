import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import AdminGestionUsuarios from './Administrador/GestionUsuarios'
import AdminGestionEventos from './Administrador/GestionEventos'
import AdminGestionCarreras from './Administrador/GestionCarreras'
import Home from './Home/Home'
import EventosDisponibles from './EventosDisponibles/EventosDisponibles'
import Login from './Login/Login'
import MisCertificados from './MisCertificados/MisCertificados'
import EventosRealizados from './EventosRealizados/EventosRealizados'
import EventosInscritos from './EventosInscritos/EventosInscritos'
import HorasExtracurriculares from './HorasExtracurriculares/HorasExtracurriculares'
import CargaAsistencias from './CargaAsistencias/CargaAsistencias'


const createRootReducer = (history) => combineReducers({
    router : connectRouter(history),
    adminGestionUsuarios : AdminGestionUsuarios,
    adminGestionEventos : AdminGestionEventos,
    adminGestionCarreras : AdminGestionCarreras,
    home : Home,
    eventosDisponibles : EventosDisponibles,
    login : Login,
    misCertificados : MisCertificados,
    eventosRealizados : EventosRealizados,
    eventosInscritos : EventosInscritos,
    horasExtracurriculares : HorasExtracurriculares,
    cargaAsistencias : CargaAsistencias
});

export default createRootReducer