import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/App.css';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/theme';
import NextApp from 'NextApp';
import 'antd/dist/reset.css';

ReactDOM.render(
	<ChakraProvider theme={theme}>
		<React.StrictMode>
			<HashRouter>
				<NextApp />
			</HashRouter>
		</React.StrictMode>
	</ChakraProvider>,
	document.getElementById('root')
);
