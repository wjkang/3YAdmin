import Loadable from 'react-loadable';
import 'react';
import ContentLoader from '@/containers/MyContentLoader';
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
    loading:ContentLoader
});
const Function = Loadable({
    loader: () => import('@/pages/Function'),
    loading:ContentLoader
});
const Role = Loadable({
    loader: () => import('@/pages/role'),
    loading:ContentLoader
});
const Home = Loadable({
    loader: () => import('@/pages/Home'),
    loading:ContentLoader
});
const RolePermission = Loadable({
    loader: () => import('@/pages/rolePermission'),
    loading:ContentLoader
});
const RoleUser = Loadable({
    loader: () => import('@/pages/roleUser'),
    loading:ContentLoader
});
const UserRole = Loadable({
    loader: () => import('@/pages/userRole'),
    loading:ContentLoader
});
const User = Loadable({
    loader: () => import('@/pages/user'),
    loading:ContentLoader
});
const Page404 = Loadable({
    loader: () => import('@/pages/Page404'),
    loading:ContentLoader
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