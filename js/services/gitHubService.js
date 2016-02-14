import chartColors from '../constants/chartColors.js';
import 'datejs';


var GITHUB_URL = 'https://api.github.com/';

/**
 * @param {string} 
 * @return {string}
**/
function getUrl( username ) {
	if ( username === undefined )
		console.log( 'Username undefined!' );
	return GITHUB_URL + 'users/' + username.toString().trim() + '/events';
};

/**
 * @param {string} 	date string from xhr response
 * @param {object} 	date object from bins
 * @return {bool}
**/
function compareDates( eventDate, binDate ) {
	return Date.equals( Date.parse(eventDate).set({ millisecond: 0, second: 0, minute: 0, hour: 0 }), binDate ) ? true : false;
}

/**
 * @param {int} 		number of days of activity history
 * @return {object} 	empty ChartJs object
**/
function generateChartData( duration ) {
	var chart = {
		labels: [],
		datasets: [{
			label: '',
			fillColor: chartColors[0].solid,
			data: []
		}]
	};

	for ( var i = 0; i < duration; i++ ) {
		chart.labels.push( Date.today().add({ days: (i + 1 - duration) }).toString('d/M') );
		chart.datasets[0].data.push( 0 );
	}

	return chart;
};

/**
 * @param {object} 	events object from store
 * @return {object} 	extended events object
**/ 
function extendEvents( events ) {
	var initData = [];
	events.labels.forEach( () => initData.push(0) );
	return events.datasets.push({
		data: initData
	});
};

/**
 * @param {int} 		number of days of activity history
 * @return {array} 	array of date objects in reverse chronological order
**/
function generateDateArray( duration ) {
	var dates = [];
	for ( var i = 0; i < duration; i++ ) {
		dates.push( Date.today().add({ days: (i + 1 - duration) }) );
	}
	return dates;
};


var gitHubService = {

	/**
	 * @param {string} 	username
	 * @param {int} 		event data for the past x days
	 * @return {object}	ChartJs formatted event history
	**/
	getEvents( username, duration ) {
		if ( username && duration ) {

			return new Promise( function( resolve, reject ) {

				var xhr = new XMLHttpRequest();
				xhr.open('GET', getUrl( username ), true);

				xhr.onload = function() {
					if ( xhr.status === 200 ) {
						 
						var chartData = generateChartData( duration );
						var dateBins = generateDateArray( duration );

						JSON.parse( xhr.response ).forEach( function(event) {
							if ( event.type === 'PushEvent' ) {
								for ( var i = 0; i < dateBins.length; i++ ) {
									var datesMatch = compareDates( event.created_at, dateBins[i] );
									if ( datesMatch ) {
										chartData.datasets[0].data[i] += event.payload.distinct_size;
									}
								}
							}
						});

						chartData.datasets[0].label = username.toString().trim();
							
						resolve( chartData );
					} else {
						reject( Error( xhr.response ) );
					}
				};

				xhr.onerror = function() {
					reject( Error('Network error!') );
				};

				xhr.send();
			});

		} else {
			console.log( 'User and/or duration not defined!' );
		}
	},

	/**
	 * @param {string}	username
	 * @param {object}	current events object
	 * @return {object}	ChartJs formatted event history
	**/
	appendEvents( username, events ) {
		if ( username && events ) {

			return new Promise( function( resolve, reject ) {

				var xhr = new XMLHttpRequest();
				xhr.open('GET', getUrl( username ), true);

				xhr.onload = function() {
					if( xhr.status === 200 ) {

						// var updatedEvents = extendEvents( events );
						var initData = [];
						var newDatasetIndex = events.datasets.length;
						events.labels.forEach( () => initData.push(0) );
						events.datasets.push({
							label: username,
							fillColor: chartColors[newDatasetIndex].solid,
							data: initData
						});

						var dateBins = generateDateArray( events.labels.length );

						JSON.parse( xhr.response ).forEach( function(obj) {
							if ( obj.type === 'PushEvent' ) {
								for ( var i = 0; i < dateBins.length; i++ ) {
									var datesMatch = compareDates( obj.created_at, dateBins[i] );
									if ( datesMatch ) {
										events.datasets[newDatasetIndex].data[i] += obj.payload.distinct_size;
									}
								}
							}
						});

						resolve( events );
					} else {
						reject( Error(xhr.response) );
					}
				};

				xhr.onerror = function() {
					reject( Error('Network error!') );
				}

				xhr.send(); 
			});

		} else {
			console.log( 'Username or events undefined!' );
		}
	}

}

export default gitHubService;
