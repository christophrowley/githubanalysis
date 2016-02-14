import React from 'react';
import ReactChartJs from 'react-chartjs';


var CommitChart = React.createClass({
	render() {
		console.log( this.props );
		return(
			<div>
				<ReactChartJs.Bar data = {this.props.chartData} height = {600} options = {this.props.chartOptions} width = {1024} redraw />
			</div>
		);
	}
});

export default CommitChart;
