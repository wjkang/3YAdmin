import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import MenuToRouter from '@/menuMapToRouter';
import Page403 from '@/pages/Page403';

class AuthorizedRoute extends React.Component {
    render() {
        const { component: Component, openAccessMenu, ...props } = this.props
        const pathname = this.props.location.pathname;
        let name = Object.keys(MenuToRouter).find(key => MenuToRouter[key] === pathname);
        let hasPermission = true;
        if (name) {
            if (!openAccessMenu.some(s => s.name === name)) {
                hasPermission = false;
            }
        }
        return (
            <Route {...props} render={props => {
                return hasPermission
                    ? <Component {...props} />
                    : <Page403 />
            }} />
        )
    }
}
const mapStateToProps = state => {
    return {
        openAccessMenu: state.app.openAccessMenu
    }
}
export default connect(mapStateToProps)(AuthorizedRoute);
