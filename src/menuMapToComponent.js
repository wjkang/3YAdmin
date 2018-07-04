import Loadable from 'react-loadable';
import React from 'react';
//import Home from '@/pages/Home';
//import Menu from '@/pages/Menu';
//import Function from '@/pages/Function';
//import Role from '@/pages/role';
//import RolePermission from '@/pages/rolePermission';
//import RoleUser from '@/pages/roleUser';
//import UserRole from '@/pages/userRole';
//import User from '@/pages/user';
//import Page404 from '@/pages/Page404';
const Menu = Loadable({
    loader: () => import('@/pages/Menu'),
    loading() {
        return <div>Loading...</div>
    }
});
const Function = Loadable({
    loader: () => import('@/pages/Function'),
    loading() {
        return <div>Loading...</div>
    }
});
const Role = Loadable({
    loader: () => import('@/pages/role'),
    loading() {
        return <div>Loading...</div>
    }
});
const Home = Loadable({
    loader: () => import('@/pages/Home'),
    loading() {
        return <div>Loading...</div>
    }
});
const RolePermission = Loadable({
    loader: () => import('@/pages/rolePermission'),
    loading() {
        return <div>Loading...</div>
    }
});
const RoleUser = Loadable({
    loader: () => import('@/pages/roleUser'),
    loading() {
        return <div>Loading...</div>
    }
});
const UserRole = Loadable({
    loader: () => import('@/pages/userRole'),
    loading() {
        return <div>Loading...</div>
    }
});
const User = Loadable({
    loader: () => import('@/pages/user'),
    loading() {
        return <div>Loading...</div>
    }
});
const Page404 = Loadable({
    loader: () => import('@/pages/Page404'),
    loading() {
        return <div>Loading...</div>
    }
});

export default {
    "menu": Menu,
    "home": Home,
    "function": Function,
    "role": Role,
    "rolepermission": RolePermission,
    "roleuser": RoleUser,
    "userrole": UserRole,
    "user_index": User,
    "page404": Page404
}