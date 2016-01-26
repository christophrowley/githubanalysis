import React from 'react';
import ReactChartJs from 'react-chartjs';
import 'datejs';
import gitHubApiService from '../services/gitHubApiService.js';
import gitHubStore from '../stores/gitHubStore.js';


function getEvents( username, duration ) {
	console.log( 'app ' + username + " " + duration );
	return gitHubStore.getEvents( username, duration );
}

var App = React.createClass({
	getInitialState() {
		return { events: getEvents( 'christophrowley', 15) };
	},

	componentWillMount() {
		gitHubStore.addChangeListener( this._onChange );
	},

	componentWillUnmount() {
		gitHubStore.removeChangeListener( this._onchange );
	},

	_onChange() {
		this.setState( getEvents( 'christophrowley', 15 ) );
	},

	render() {
		var chartData = {
			labels: [],
			datasets: [{
				data: []
			}]
		};
		this.state.events.map( function(val) {
			chartData.labels.push( val.date.toString('d/M') );
			chartData.datasets[0].data.push( val.commitCount );
		});
		console.log( chartData );
		return(
			<div>
				<ReactChartJs.Bar data = {chartData} />
			</div>
		);
	}
});

export default App;