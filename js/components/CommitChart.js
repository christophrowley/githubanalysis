import React from 'react';
import ReactChartJs from 'react-chartjs';


var CommitChart = React.createClass({
	render() {
		return(
			<div className = {'chart'} >
				<ReactChartJs.Bar data = {this.props.chartData} height = {600} options = {this.props.chartOptions} width = {1280} redraw />
			</div>
		);
	}
});

export default CommitChart;
