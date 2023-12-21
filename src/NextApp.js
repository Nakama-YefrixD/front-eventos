import React from 'react';
import {Provider, useSelector} from 'react-redux'
import generateStore, {history} from './Redux/Store/index';
import { ConnectedRouter } from 'connected-react-router'

import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import RutasValidadas from 'RutasValidadas';

function NextApp() {

    const store = generateStore()
    
    return (
        <Provider store={store}>

            <Switch>
                <RutasValidadas />
                
            </Switch>
            
        </Provider>
    )
}

export default NextApp;