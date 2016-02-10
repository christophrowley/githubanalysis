import React from 'react';
import ReactChartJs from 'react-chartjs';
import 'datejs';
import gitHubActions from '../actions/gitHubActions.js';
import gitHubStore from '../stores/gitHubStore.js';
import NameTag from '../components/NameTag.js';
import AddUser from '../components/AddUser.js';


var App = React.createClass({
	getInitialState() {
		return {
			events: {},
		};
	},

	componentWillMount() {
		gitHubStore.addChangeListener( this._onChange );
		gitHubActions.retrieveEvents( 'christophrowley', 15 );
	},

	componentWillUnmount() {
		gitHubStore.removeChangeListener( this._onchange );
	},

	_onChange() {
		this.setState({
			events: gitHubStore.getEvents()
		});
	},

	/**
	 * @param {array}
	 * @return {object}
	**/ 
	_generateChartData( events ) {
		var chartData = {
			labels: [],
			datasets: []
		};

		events.map( function(dataset, index) {
			var datasetIndex = index;
			var populateLabels = chartData.labels.length === 0 ? true : false;
			chartData.datasets.push({
				data: [],
				label: dataset.username
			});

			dataset.eventData.map( function(val) {
				if ( populateLabels ) {
					chartData.labels.push( val.date.toString('d/M') );
				}
				chartData.datasets[datasetIndex].data.push( val.commitCount );
			});
		});

		return chartData;
	},

	render() {
		var chartOptions = {
			scaleFontColor: '#fff'
		};
		console.log( this.state.events );

		return(
			<div>
				{ ( this.state.events.hasOwnProperty( 'datasets' ) ) ?
					<ReactChartJs.Bar data = {this.state.events} height = {600} options = {chartOptions} width = {1024} /> : ''
				}
				<div className = 'nametags' >
					{ this.state.events.hasOwnProperty( 'datasets' ) ? 
						this.state.events.datasets.forEach( function(dataset, index) {
							return <NameTag key = {index} username = { dataset.label } />;
						}) : 
						''
					}
					<AddUser />
				</div>
			</div>
		);
	}
});

export default App;