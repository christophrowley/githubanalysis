import React from 'react';
import 'datejs';
import gitHubActions from '../actions/gitHubActions.js';
import eventStore from '../stores/eventStore.js';
import NameTag from '../components/NameTag.js';
import AddUser from '../components/AddUser.js';
import CommitChart from '../components/CommitChart.js';


var App = React.createClass({
	getInitialState() {
		return {
			events: {},
		};
	},

	componentWillMount() {
		eventStore.addChangeListener( this._onChange );
		gitHubActions.retrieveEvents( 'christophrowley', 5 );
	},

	componentWillUnmount() {
		eventStore.removeChangeListener( this._onchange );
	},

	_onChange() {
		this.setState({
			events: eventStore.getEvents()
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

		return(
			<div>
				{ this.state.events.hasOwnProperty( 'datasets' ) ? 
					<CommitChart chartData={this.state.events} chartOptions={chartOptions} /> : '' 
				}
				<div className = 'nametags' >
					{ this.state.events.hasOwnProperty( 'datasets' ) ? 
						this.state.events.datasets.map( function(dataset, index) {
							console.log( dataset );
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