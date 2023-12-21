import React from 'react'
import {Provider, useSelector} from 'react-redux'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthLayout from './layouts/auth';
import AdminLayout from './layouts/admin';
import IndexRoutes from './Routes/index';
import RTLLayout from './layouts/rtl';

const RutasValidadas = () => {

    const validateToken = () => {
        return !localStorage.getItem('usutoken') ? false : true
    }

    const {
		rex_usuario_seleccionado
    } = useSelector(({login}) => login)

    return (
        <div>
            {
                validateToken()
                ?<div>
                    <Route path={`/admin`} render={(props) => <AdminLayout {...props} rex_usuario_seleccionado={rex_usuario_seleccionado} />} />
                    <Route path={`/rtl`} component={RTLLayout} />
                    <Route path={`/otros`} component={IndexRoutes} />
                    <Redirect from='/' to='/admin' />
                </div>
                :<div>
                    <Route path={`/auth`} component={AuthLayout} />
                    <Redirect from='/' to='/auth' />
                </div>
            }
        </div>
    )
}

export default RutasValidadas