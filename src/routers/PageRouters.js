import React from 'react';
import { HashRouter as Router, Route, Switch} from 'react-router-dom';
import Login from '@/pages/Login';
import App from '@/layout/App';

export default () => (
    <Router>
        <Switch>      
            <Route exact path="/" component={App} />
            <Route exact path="/login" component={Login} />
        </Switch>
    </Router>
)