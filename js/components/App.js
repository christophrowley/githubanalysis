import React from 'react';
import ReactChartJs from 'react-chartjs';
import 'datejs';
import gitHubActions from '../actions/gitHubActions.js';
import gitHubStore from '../stores/gitHubStore.js';
import NameTag from '../components/NameTag.js';


var App = React.createClass({
	getInitialState() {
		return {
			events: gitHubActions.retrieveEvents('christophrowley', 15),
			newUser: '',
			chartData: null
		};
	},

	componentWillMount() {
		gitHubStore.addChangeListener( this._onChange );
	},

	componentWillUnmount() {
		gitHubStore.removeChangeListener( this._onchange );
	},

	_onChange() {
		this.setState({
			events: gitHubStore.getEvents(),
			chartData: gitHubStore.getProcessedEvents()
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

	_onTextChange( event, value ) {
		this.setState({ newUser: event.target.value });
	},

	/**
	 * @param {object}
	**/
	_onKeyDown( event ) {
		switch ( event.keyCode ) {
			case 13: // Return key
				event.preventDefault();
				var text = this.state.newUser.trim();
				if ( text ) {
					gitHubActions.retrieveEvents( text, 15 );
				}
				this.setState({ newUser: "" });
				break;
			case 27: // Esc key
				event.preventDefault();
				this.setState({
					active: false,
					post_text: ''
				});
				break;
		}
	},

	render() {
		var data = this.state.chartData;
		console.log( data );

		var chartOptions = {
			scaleFontColor: '#fff'
		};

		return(
			<div>
				{ ( this.state.events !== undefined ) ?
					<ReactChartJs.Bar data = {data} height = {600} options = {chartOptions} width = {1024} /> : ''
				}
				<div className = 'nametags' >
					{ this.state.events !== undefined ? 
						this.state.events.map( function(event, index) {
							return <NameTag key = {index} username = {event.username} />;
						}) : 
						''
					}
					<textarea 
						rows = {1}
						ref = 'addUser'
						value = {this.state.newUser}
						onChange = {this._onTextChange}
						onKeyDown = {this._onKeyDown}
					/>
				</div>
			</div>
		);
	}
});

export default App;