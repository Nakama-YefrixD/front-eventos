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

const routesponente = [
	{
		name: 'Home',
		layout: '/otros',
		path: '/otros/home',
		icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
		component: MainDashboard
	},
	{
		name: 'Eventos Inscritos',
		layout: '/otros',
		icon: <Icon as={MdOutlineEventAvailable} width='20px' height='20px' color='inherit' />,
		path: '/eventos-inscritos',
		component: DataTables
	},

	{
		name: 'Eventos Realizados',
		layout: '/otros',
		path: '/eventos-realizados',
		icon: <Icon as={MdOutlineEventAvailable} width='20px' height='20px' color='inherit' />,
		component: RTL
	},
	{
		name: 'Carga Asistencias',
		layout: '/otros',
		path: '/carga-asistencias',
		icon: <Icon as={MdOutlineUploadFile} width='20px' height='20px' color='inherit' />,
		component: MainDashboard
	},
];

export default routesponente;
