import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { setLoginRedirectUrl } from '../actions/loginAction'

class AuthorizedRoute extends React.Component {
    render() {
        const { component: Component, ...rest } = this.props
        const isLogged = sessionStorage.getItem("userName") != null ? true : false;
        if(!isLogged) {
            setLoginRedirectUrl(this.props.location.pathname);
        }
        return (
                <Route {...rest} render={props => {
                    return isLogged
                            ?  <Component {...props} />
                            : <Redirect to="/login" />
                }} />
        )
    }
}

export default AuthorizedRoute
