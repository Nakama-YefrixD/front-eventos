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

const routesestudiantes = [
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
		name: 'Mis Certificados',
		layout: '/otros',
		path: '/mis-certificados',
		icon: <Icon as={MdDocumentScanner} width='20px' height='20px' color='inherit' />,
		component: Profile
	},

	{
		name: 'Mis Horas Extracurriculares',
		layout: '/otros',
		path: '/horas-extracurriculares',
		icon: <Icon as={MdHourglassBottom} width='20px' height='20px' color='inherit' />,
		component: SignInCentered
	},

	{
		name: 'Eventos Realizados',
		layout: '/otros',
		path: '/eventos-realizados',
		icon: <Icon as={MdOutlineEventAvailable} width='20px' height='20px' color='inherit' />,
		component: RTL
	},
];

export default routesestudiantes;
