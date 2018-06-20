import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthorizedRoute from '@/containers/AuthorizedRoute';

import Home from '@/pages/Home';
import Menu from '@/pages/Menu';
import Function from '@/pages/Function';
import Page404 from '@/pages/Page404';
//此处配置只对App layout有效
export default () => (
    <Switch>
        <Route exact path="/app/home" component={Home} />
        <AuthorizedRoute exact path="/app/system/menu" component={Menu} />
        <AuthorizedRoute exact path="/app/permission/function" component={Function} />
        <AuthorizedRoute exact path="/app/user/index" component={Menu} />
        <AuthorizedRoute exact path="/app/cms/article" component={Menu} />
        <Route component={Page404} />
    </Switch>

)
