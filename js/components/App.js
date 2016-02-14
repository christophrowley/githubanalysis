import React from 'react';
import 'datejs';
import gitHubActions from '../actions/gitHubActions.js';
import gitHubStore from '../stores/gitHubStore.js';
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
		gitHubStore.addChangeListener( this._onChange );
		gitHubActions.retrieveEvents( 'christophrowley', 5 );
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

		// var chartData = {
		// 	labels: ['a','b','c','d','e'],
		// 	datasets: [{
		// 		label: 'set a',
		// 		data: [1,2,3,4,5]
		// 	}, {
		// 		label: 'set b',
		// 		data: [4,5,6,7,8]
		// 	}]
		// };

		return(
			<div>
				{ this.state.events.hasOwnProperty( 'datasets' ) ? 
					<CommitChart chartData={this.state.events} chartOptions={chartOptions} /> : '' 
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