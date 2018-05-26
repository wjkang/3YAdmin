import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from '@/pages/Login';
import App from '@/App';

export default () => (
    <Router>
        <Switch>
            <Route exact path="/" render={() => <Redirect to="/home" push />} />        
            <Route path="/home" component={App} />
            <Route path="/login" component={Login} />
        </Switch>
    </Router>
)