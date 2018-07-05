import React from 'react'
import { Provider } from 'react-redux';
import store from './store';
import PageRouters from '@/routers/PageRouters';
import MySpin from '@/containers/MySpin';
import { hot } from 'react-hot-loader'

const App = () => <Provider store={store}>
    <MySpin pageRouters={PageRouters}>  
    </MySpin>
</Provider>

export default hot(module)(App)