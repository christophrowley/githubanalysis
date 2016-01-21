import React from 'react';
import gitHubApiService from '../services/gitHubApiService.js';

var App = React.createClass({
	componentWillMount() {
		console.log( gitHubApiService );
		gitHubApiService.getRepos( 'christophrowley' ).then( (response) => console.log(response) );
	},

	render() {
		return(
			<div>
				{'I am the thing'}
			</div>
		);
	}
});

export default App;