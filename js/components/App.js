import React from 'react';
import ReactChartJs from 'react-chartjs';
import 'datejs';
import gitHubApiService from '../services/gitHubApiService.js';
import gitHubStore from '../stores/gitHubStore.js';


var App = React.createClass({
	getInitialState() {
		return { events: gitHubStore.getEvents() };
	},

	componentWillMount() {
		gitHubStore.addChangeListener( this._onChange );
	},

	componentWillUnmount() {
		gitHubStore.removeChangeListener( this._onchange );
	},

	_onChange() {
		this.setState( gitHubStore.getEvents() );
	},

	render() {
		var chartData = {
			labels: [],
			datasets: [{
				data: []
			}]
		};

		this.state.events.map( function(dataset, index) {

			var datasetIndex = index;
			var populateLabels = chartData.labels.length === 0 ? true : false;
			chartData.datasets.push({
				data: [],
				username: dataset.username
			});

			dataset.eventData.map( function(val) {
				if ( populateLabels ) {
					chartData.labels.push( val.date.toString('d/M') );
				}
				chartData.datasets[datasetIndex].data.push( val.commitCount );
			});

		});

		console.log( chartData );
		return(
			<div>
				<ReactChartJs.Bar data = {chartData} height = {600} width = {1024} />
			</div>
		);
	}
});

export default App;