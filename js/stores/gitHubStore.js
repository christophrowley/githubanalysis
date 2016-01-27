import ObjectAssign from 'object-assign';
import AppDispatcher from '../dispatcher/appDispatcher.js';
import Events from 'events';
import gitHubApiService from '../services/gitHubApiService.js';
import appConstants from '../constants/appConstants.js';


var CHANGE_EVENT = 'change';
var _events = [];

/**
 * @param {string}
 * @param {int}
 * @return {object}
**/
function retrieveEvents( username, duration ) {
	if ( typeof duration === undefined && _events.length === 0 ) {
		duration = 10;
	} else if ( typeof duration === undefined && _events.length > 0 ) {
		duration = _events[0].eventData.length;
	}

	return gitHubApiService.getEvents( username, duration ).then( function(val) {
		_events.push({
			username: username.toLowerCase(),
			eventData: val
		});
	});
}

var gitHubStore = ObjectAssign( {}, Events.EventEmitter.prototype, {

	getProcessedEvents() {
		var events = _events;
		
		var chartData = {
			labels: [],
			datasets: []
		};

		events.map( function(dataset, index) {
			var datasetIndex = index;
			var populateLabels = chartData.labels.length === 0 ? true : false;
			chartData.datasets.push({
				data: [],
				label: dataset.username,
				fillColor: '#F39C12',
				strokeColor: '#F39C12',
				pointColor: '#F39C12',
				pointStrokeColor: '#F39C12',
				pointHighlightFill: '#F39C12',
				pointHighlightStroke: '#F39C12'
			});

			dataset.eventData.map( function(val) {
				if ( populateLabels ) {
					chartData.labels.push( val.date.toString('d/M') );
				}
				chartData.datasets[datasetIndex].data.push( val.commitCount );
			});
		});

		console.log( chartData );
		return chartData;
	},

	getEvents() {
		return _events;
	},

	emitChange() {
		this.emit( CHANGE_EVENT );
	},

	addChangeListener( callback ) {
		this.on( CHANGE_EVENT, callback );
	},

	removeChangeListener( callback ) {
		this.on( CHANGE_EVENT, callback );
	},

	/**
	 * @param {string}
	**/
	clearEvents( username ) {
		for ( var i = 0; i < _events.length; i++ ) {
			if ( _events[i].username === username ) {
				delete _events[i];
				break;
			}
		}
	},

	clearAllEvents() {
		_events = [];
	},

	logEvents() {
		console.log( _events );
	}

});

AppDispatcher.register( function( action ) {

	switch ( action.actionType ) {
		case appConstants.RETRIEVE_EVENTS:
			retrieveEvents( action.username, action.duration ).then( () => gitHubStore.emitChange() );
			break;

		default:
			return true;
	}

});

export default gitHubStore;
