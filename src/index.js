import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import appState from './store/app-store'

ReactDOM.render(
    <App appState={ appState } />,
    document.getElementById('root')
)
