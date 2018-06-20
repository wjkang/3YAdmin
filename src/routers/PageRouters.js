import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from '@/pages/Login';
// if (process.env.TAB_MODE) {
//     import Layout from '@/layout/App';
// } else {
//     import Layout from '@/layout/TabMode';
// }
import Page404 from '@/pages/Page404';
let Layout = null;
if (process.env.REACT_APP_LAYOUT_MODE==='tab') {
    Layout = require('@/layout/TabMode').default;
} else {
    Layout = require('@/layout/App').default;
}
console.log(process.env.REACT_APP_TAB_MODE)

export default () => (
    <Router>
        <Switch>
            <Route exact path="/" render={() => <Redirect to="/app/home" push />} />
            <Route path="/app" component={Layout} />
            <Route exact path="/login" component={Login} />
            <Route component={Page404} />
        </Switch>
    </Router>
)