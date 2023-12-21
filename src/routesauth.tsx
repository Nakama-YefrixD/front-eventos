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

const routesauth = [
	{
		name: 'Login',
		layout: '/auth',
		path: '/sign-in/default',
		icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
		component: SignInCentered
	},
	{
		name: 'Recuperar',
		layout: '/auth',
		path: '/recuperar/:urltoken',
		icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
		component: Recuperar
	},
];

export default routesauth;
