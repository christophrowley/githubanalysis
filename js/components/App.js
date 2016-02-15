import React from 'react';
import 'datejs';
import gitHubActions from '../actions/gitHubActions.js';
import eventStore from '../stores/eventStore.js';
import NameTag from '../components/NameTag.js';
import AddUser from '../components/AddUser.js';
import CommitChart from '../components/CommitChart.js';
import Header from '../components/Header.js';
import chartColors from '../constants/chartColors.js';
import chartOptions from '../constants/chartOptions.js';


var App = React.createClass({
	getInitialState() {
		return {
			events: {},
		};
	},

	componentWillMount() {
		eventStore.addChangeListener( this._onChange );
		gitHubActions.retrieveEvents( 'christophrowley', 7 );
	},

	componentWillUnmount() {
		eventStore.removeChangeListener( this._onchange );
	},

	_onChange() {
		this.setState({
			events: eventStore.getEvents()
		});
	},

	clearEvents() {
		gitHubActions.clearEvents();
	},

	render() {
		return(
			<div>
				<Header />
				{ this.state.events.hasOwnProperty( 'datasets' ) ? 
					<CommitChart chartData={this.state.events} chartOptions={chartOptions} /> : '' 
				}
				<div className = 'nametags' >
					<h1>Team: <span className = {'clear'} onClick = {this.clearEvents} >clear</span></h1>
					{ this.state.events.hasOwnProperty( 'datasets' ) ? 
						this.state.events.datasets.map( function(dataset, index) {
							return <NameTag key = {index} username = { dataset.label } col = {chartColors[index].solid} />;
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