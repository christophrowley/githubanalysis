import React from 'react';
import gitHubApiService from '../services/gitHubApiService.js';
import gitHubStore from '../stores/gitHubStore.js';

function getEvents( username ) {
	return gitHubStore.getEvents( username );
}

var App = React.createClass({
	getInitialState() {
		return { events: getEvents() };
	},

	_processEvents() {
		console.log( Date.now() );
		// this.state.events.map( function(event) {
		// 	if ( event.type === 'PushEvent' ) {
		// 		console.log( 'Push event' );
		// 	}
		// });
	},

	componentWillMount() {
		this._processEvents();
		gitHubStore.addChangeListener( this._onChange );
	},

	componentWillUnmount() {
		gitHubStore.removeChangeListener( this._onchange );
	},

	_onChange() {
		this.setState( getEvents( 'christophrowley' ) );
	},

	render() {
		return(
			<div>
				{ this.state.events }
			</div>
		);
	}
});

export default App;