import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import AppStore from './store/app-store'

ReactDOM.render(<App appState={new AppStore()}/>, document.getElementById('root'));
registerServiceWorker();
