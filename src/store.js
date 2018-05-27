import { createStore, combineReducers } from 'redux';

import user from '@/reducers/user'
import app from '@/reducers/app'

// 定义reducer
// 每个组件自己的reducer负责维护自己的状态, 注意key的名字和组件名一致
const reducers = {
    user: user,
    app: app
};


// 组合最终的store
const store = createStore(combineReducers(reducers), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
