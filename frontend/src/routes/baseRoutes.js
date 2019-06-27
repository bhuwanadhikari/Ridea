import React from 'react'
import Auxi from '../hoc/Auxi'
import PrivateRoute from '../hoc/PrivateRoute'
import PublicRoute from '../hoc/PublicRoute'
import Home from '../containers/Home/Home'
import Landing from '../containers/Landing/Landing'
import Chat from '../components/Chat/Chat'

function baseRoutes() {
    return (
        <Auxi>
            <PrivateRoute exact path="/home" component={Home} />
            <PublicRoute exact path="/" component={Landing} />
            <PrivateRoute exact path="/chat" component={Chat} />
        </Auxi>
    )
}

export default baseRoutes;
