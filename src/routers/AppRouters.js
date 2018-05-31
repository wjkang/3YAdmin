import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '@/pages/Home';
import Menu from '@/pages/Menu';
import Page404 from '@/pages/Page404';

class AppRouters extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/app/home" component={Home} />
                <Route exact path="/app/system/menu" component={Menu} />
                <Route exact path="/app/user/index" component={Menu} />
                <Route exact path="/app/cms/article" component={Menu} />
                <Route component={Page404} />
            </Switch>
        )
    }
}

export default AppRouters; 