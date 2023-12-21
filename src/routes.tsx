import { Icon } from '@chakra-ui/react';
import { 
	MdDocumentScanner, MdHourglassBottom, MdHome,
	MdLock, MdOutlineEventAvailable, MdOutlineEventNote,
	MdSupervisedUserCircle,
	MdEventNote,
	MdNoteAdd,
	MdOutlineUploadFile
} from 'react-icons/md';

// Admin Imports
import MainDashboard from 'views/admin/default';
import NFTMarketplace from 'views/admin/marketplace';
import Profile from 'views/admin/profile';
import DataTables from 'views/admin/dataTables';
import RTL from 'views/admin/rtl';

// Auth Imports
import SignInCentered from 'views/auth/signIn';
import Recuperar from 'Routes/Recuperar/Recuperar';

const routes = [
	{
		name: 'Home',
		layout: '/otros',
		path: '/otros/home',
		icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
		component: MainDashboard
	},
	{
		name: 'Eventos Disponibles',
		layout: '/otros',
		path: '/eventos-disponibles',
		icon: <Icon as={MdOutlineEventNote} width='20px' height='20px' color='inherit' />,
		component: NFTMarketplace,
		secondary: true
	},
	{
		name: 'Eventos Inscritos',
		layout: '/otros',
		icon: <Icon as={MdOutlineEventAvailable} width='20px' height='20px' color='inherit' />,
		path: '/eventos-inscritos',
		component: DataTables
	},
	{
		name: 'Certificados',
		layout: '/otros',
		// path: '/admin-mis-certificados',
		path: '/mis-certificados',
		icon: <Icon as={MdDocumentScanner} width='20px' height='20px' color='inherit' />,
		component: Profile
	},
	// {
	// 	name: 'Login',
	// 	layout: '/auth',
	// 	path: '/sign-in/default',
	// 	icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
	// 	component: SignInCentered
	// },

	// {
	// 	name: 'Recuperar',
	// 	layout: '/auth',
	// 	path: '/recuperar/:urltoken',
	// 	icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
	// 	component: Recuperar
	// },

	{
		name: 'Mis Horas Extracurriculares',
		layout: '/otros',
		path: '/horas-extracurriculares',
		icon: <Icon as={MdHourglassBottom} width='20px' height='20px' color='inherit' />,
		component: SignInCentered
	},

	{
		name: 'Asistencia',
		layout: '/otros',
		path: '/eventos-realizados',
		icon: <Icon as={MdOutlineEventAvailable} width='20px' height='20px' color='inherit' />,
		component: RTL
	},

	{
		name: 'Home Admin',
		layout: '/otros',
		path: '/admin-home',
		icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
		component: MainDashboard
	},
	{
		name: 'Gestión de Usuarios',
		layout: '/otros',
		path: '/gestion-usuarios',
		icon: <Icon as={MdSupervisedUserCircle} width='20px' height='20px' color='inherit' />,
		component: MainDashboard
	},
	{
		name: 'Gestión de Eventos',
		layout: '/otros',
		path: '/gestion-eventos',
		icon: <Icon as={MdNoteAdd} width='20px' height='20px' color='inherit' />,
		component: MainDashboard
	},
	{
		name: 'Gestión de Carreras',
		layout: '/otros',
		path: '/gestion-carreras',
		icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
		component: MainDashboard
	},
	{
		name: 'Carga Masiva',
		layout: '/otros',
		path: '/admin-carga',
		icon: <Icon as={MdOutlineUploadFile} width='20px' height='20px' color='inherit' />,
		component: MainDashboard
	},

	{
		name: 'Carga Asistencias',
		layout: '/otros',
		path: '/carga-asistencias',
		icon: <Icon as={MdOutlineUploadFile} width='20px' height='20px' color='inherit' />,
		component: MainDashboard
	},
];

export default routes;
