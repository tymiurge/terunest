import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';

import {startRouter} from 'mobx-router'
import {Provider} from 'mobx-react'
import store from './store/app-store'
import views from './config/views'
import App from './App'

startRouter(views, store)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
