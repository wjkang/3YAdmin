import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import Home from '@/pages/Home';
import Menu from '@/pages/Menu';

class AppRouters extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/app/home" component={Home} />
                <Route exact path="/app/system/menu" component={Menu} />
            </Switch>
        )
    }
}

export default AppRouters; 