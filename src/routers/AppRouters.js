import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthorizedRoute from '@/containers/AuthorizedRoute';

import Loadable from 'react-loadable';
import ContentLoader from '@/containers/MyContentLoader';

const Page404 = Loadable({
    loader: () => import('@/pages/Page404'),
    loading: ContentLoader
});
const Menu = Loadable({
    loader: () => import('@/pages/Menu'),
    loading: ContentLoader
});
const Function = Loadable({
    loader: () => import('@/pages/Function'),
    loading: ContentLoader
});
const Role = Loadable({
    loader: () => import('@/pages/role'),
    loading: ContentLoader
});
const Home = Loadable({
    loader: () => import('@/pages/Home'),
    loading: ContentLoader
});
const RolePermission = Loadable({
    loader: () => import('@/pages/rolePermission'),
    loading: ContentLoader
});
const RoleUser = Loadable({
    loader: () => import('@/pages/roleUser'),
    loading: ContentLoader
});
const UserRole = Loadable({
    loader: () => import('@/pages/userRole'),
    loading: ContentLoader
});
const User = Loadable({
    loader: () => import('@/pages/user'),
    loading: ContentLoader
});
const RequestLog = Loadable({
    loader: () => import('@/pages/RequestLog'),
    loading: ContentLoader
});
//example
const Page403 = Loadable({
    loader: () => import('@/pages/Page403'),
    loading: ContentLoader
});
const PermissionTest = Loadable({
    loader: () => import('@/pages/example/PermissionTest'),
    loading: ContentLoader
});
const SearchForm = Loadable({
    loader: () => import('@/pages/example/JsonForm/SearchForm'),
    loading: ContentLoader
});
const CommonForm = Loadable({
    loader: () => import('@/pages/example/JsonForm/CommonForm'),
    loading: ContentLoader
});
const DynamicForm = Loadable({
    loader: () => import('@/pages/example/JsonForm/DynamicForm'),
    loading: ContentLoader
});

//此处配置只对非Tab模式有效,Tab模式在menuMapToComponent.js配置
export default () => (
    <Switch>
        <Route exact path="/app/home" component={Home} />
        <AuthorizedRoute exact path="/app/system/menu" component={Menu} />
        <AuthorizedRoute exact path="/app/permission/function" component={Function} />
        <AuthorizedRoute exact path="/app/permission/role" component={Role} />
        <AuthorizedRoute exact path="/app/permission/rolepermission" component={RolePermission} />
        <AuthorizedRoute exact path="/app/permission/roleuser" component={RoleUser} />
        <AuthorizedRoute exact path="/app/permission/userrole" component={UserRole} />
        <AuthorizedRoute exact path="/app/user/index" component={User} />
        <AuthorizedRoute exact path="/app/requestlog" component={RequestLog} />
        {/* example */}
        <AuthorizedRoute exact path="/app/example/404" component={Page404} />
        <AuthorizedRoute exact path="/app/example/403" component={Page403} />
        <AuthorizedRoute exact path="/app/example/permissiontest" component={PermissionTest} />
        <AuthorizedRoute exact path="/app/example/searchform" component={SearchForm} />
        <AuthorizedRoute exact path="/app/example/commonform" component={CommonForm} />
        <AuthorizedRoute exact path="/app/example/dynamicform" component={DynamicForm} />
        {/* end example */}
        <Route component={Page404} />
    </Switch>

)
