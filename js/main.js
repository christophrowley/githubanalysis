import React from 'react';
import ReactDOM from 'react-dom';
import gitHubStore from './stores/gitHubStore.js';
import gitHubActions from './actions/gitHubActions.js';
import App from './components/App.js';


ReactDOM.render( <App />, document.getElementById('app-container') );