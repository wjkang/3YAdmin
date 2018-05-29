import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import Home from '@/pages/Home';

class AppRouters extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/home" component={Home} />
            </Switch>
        )
    }
}

export default AppRouters;