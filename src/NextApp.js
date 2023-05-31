import React from 'react';
import {Provider} from 'react-redux'
import generateStore, {history} from './Redux/Store/index';
import { ConnectedRouter } from 'connected-react-router'
import AuthLayout from './layouts/auth';
import AdminLayout from './layouts/admin';
import IndexRoutes from './Routes/index';
import RTLLayout from './layouts/rtl';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

function NextApp() {

    const store = generateStore()

    return (
        <Provider store={store}>

            <Switch>
                <Route path={`/auth`} component={AuthLayout} />
                <Route path={`/admin`} component={AdminLayout} />
                <Route path={`/rtl`} component={RTLLayout} />
                <Route path={`/otros`} component={IndexRoutes} />
                <Redirect from='/' to='/admin' />
            </Switch>
            
        </Provider>
    )
}

export default NextApp;