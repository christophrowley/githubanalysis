import React from 'react';
import ReactDOM from 'react-dom';
import gitHubStore from './stores/gitHubStore.js';

import App from './components/App.js';


gitHubStore.retrieveEvents( 'christophrowley', 15 ).then( () => 
ReactDOM.render( <App />, document.getElementById('app-container') ) );