import ObjectAssign from 'object-assign';
import AppDispatcher from '../dispatcher/appDispatcher.js';
import Events from 'events';
import gitHubService from '../services/gitHubService.js';
import appConstants from '../constants/appConstants.js';


var CHANGE_EVENT = 'change';
var _events = [];

/**
 * @param {string}
 * @param {int}
 * @return {object}
**/
function getEvents( username, duration ) {
	duration = typeof duration === undefined && _events.length === 0 ? 10 : duration;

	return gitHubService.getEvents( username, duration ).then( function( response ) {
		_events = response;
		eventStore.emitChange();
	});
};

/**
 * @param {string}
 * @param {array} _events
**/
function appendEvents( username, events ) {
	return gitHubService.appendEvents( username, events ).then( function( response ) {
		console.log( 'append events' );
		_events = response;
		eventStore.emitChange();
	});
};

var eventStore = ObjectAssign( {}, Events.EventEmitter.prototype, {

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
			if ( _events.length === 0 ) {
				getEvents( action.username, action.duration );
			} else {
				appendEvents( action.username, _events );
			}
			break;
		case appConstants.ADD_EVENTS: 

		case appConstants.REMOVE_EVENTS:
			_events.datasets.map( function(obj, index) {
				if ( obj.label === action.username ) {
					_events.datasets.splice( index, 1 );
				}
			});
			eventStore.emitChange();
			break;

		default:
			return true;
	}

});

export default eventStore;
