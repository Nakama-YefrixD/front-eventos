import React from 'react'
import { Portal, Box, useDisclosure } from '@chakra-ui/react';
import Footer from 'components/footer/FooterAdmin';
// Layout components
import Navbar from 'components/navbar/NavbarAdmin';
import Sidebar from 'components/sidebar/Sidebar';
import { SidebarContext } from 'contexts/SidebarContext';
import { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import routes from 'routes';
import MainDashboard from '../views/admin/default';
import Home from './Home/Home';
import EventosDisponibles from './EventosDisponibles/EventosDisponibles';
import MisCertificados from './MisCertificados/MisCertificados'
import HorasExtracurriculares from './HorasExtracurriculares/HorasExtracurriculares';
import EventosRealizados from './EventosRealizados/EventosRealizados'
import AdminHome from './AdminHome/AdminHome'
import EventosInscrito from './EventosInscritos/EventosInscrito';
import AdminCarga from './AdminCarga/AdminCarga';
import GestionUsuarios from './GestionUsuarios/GestionUsuarios'

// Auth Imports
import SignInCentered from 'views/auth/signIn';
import GestionEventos from './GestionEventos/GestionEventos';
import GestionCarreras from './GestionCarreras/GestionCarreras';
import RegistrarUsuario from './GestionUsuarios/RegistrarUsuario';
import CrearEvento from './GestionEventos/CrearEvento';
import EditarUsuario from './GestionUsuarios/EditarUsuario';

const IndexRoutes = (props) => {

    const { ...rest } = props;

    const [ fixed ] = useState(false);

    const [ toggleSidebar, setToggleSidebar ] = useState(false);

    const getRoute = () => {
		return window.location.pathname !== '/admin/full-screen-maps';
	};

    const { onOpen } = useDisclosure();

    return (
        <Box>
			<SidebarContext.Provider
				value={{
					toggleSidebar,
					setToggleSidebar
				}}>
				<Sidebar routes={routes} display='none' />
				<Box
					float='right'
					minHeight='100vh'
					height='100%'
					overflow='auto'
					position='relative'
					maxHeight='100%'
					w={{ base: '100%', xl: 'calc( 100% - 290px )' }}
					maxWidth={{ base: '100%', xl: 'calc( 100% - 290px )' }}
					transition='all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)'
					transitionDuration='.2s, .2s, .35s'
					transitionProperty='top, bottom, width'
					transitionTimingFunction='linear, linear, ease'>
					<Portal>
						<Box>
							<Navbar
								onOpen={onOpen}
								logoText={'Horizon UI Dashboard PRO'}
								brandText={() => {}}
								secondary={() => {}}
								message={() => {}}
								fixed={fixed}
								
							/>
						</Box>
					</Portal>

					{/* {getRoute() ? ( */}
						<Box mx='auto' p={{ base: '20px', md: '30px' }} pe='20px' minH='100vh' pt='50px'>
							<Switch>
								
                                <Route path={'/otros/login'} component={SignInCentered} key={1} />;
                                <Route path={'/otros/home'} component={Home} key={8} />;
                                <Route path={'/otros/eventos-disponibles'} component={EventosDisponibles} key={2} />;
                                <Route path={'/otros/mis-certificados'} component={MisCertificados} key={3} />;
                                <Route path={'/otros/horas-extracurriculares'} component={HorasExtracurriculares} key={4} />;

                                <Route path={'/otros/eventos-realizados'} component={EventosRealizados} key={5} />;
                                <Route path={'/otros/eventos-inscritos'} component={EventosInscrito} key={6} />;

                                <Route path={'/otros/gestion-usuarios'} component={GestionUsuarios} key={10} />;
                                <Route path={'/otros/registrar-usuario'} component={RegistrarUsuario} key={13} />;
                                <Route path={'/otros/editar-usuario'} component={EditarUsuario} key={15} />;

                                <Route path={'/otros/gestion-eventos'} component={GestionEventos} key={11} />;
                                <Route path={'/otros/crear-eventos'} component={CrearEvento} key={14} />;

                                <Route path={'/otros/gestion-carreras'} component={GestionCarreras} key={12} />;
								
                                <Route path={'/otros/admin-home'} component={AdminHome} key={7} />;
                                <Route path={'/otros/admin-carga'} component={AdminCarga} key={9} />;
								<Redirect from='/' to='/otros/home' />
							</Switch>
						</Box>
					{/* ) : null} */}
					<Box>
						<Footer />
					</Box>
				</Box>
			</SidebarContext.Provider>
		</Box>
    )
}

export default IndexRoutes