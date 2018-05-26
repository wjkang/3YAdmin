import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import  PageRouters from '@/routers/PageRouters';

ReactDOM.render(
    <Provider store={store}>
        <PageRouters />
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
