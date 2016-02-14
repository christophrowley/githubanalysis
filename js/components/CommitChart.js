import React from 'react';
import ReactChartJs from 'react-chartjs';


var CommitChart = React.createClass({
	render() {
		return(
			<ReactChartJs.Bar data = {this.props.chartData} height = {600} options = {this.props.chartOptions} width = {1024} redraw />
		);
	}
});

export default CommitChart;
