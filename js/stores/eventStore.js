import ObjectAssign from 'object-assign';
import Events from 'events';
import AppDispatcher from '../dispatcher/appDispatcher.js';
import gitHubApiService from '../services/gitHubApiService.js';
import appConstants from '../constants/appConstants.js';


var CHANGE_EVENT = 'change';
var _events = [];

/**
 * @param {string} 
 * @param {int} 
**/
function retrieveEvents( username, duration ) {
	if ( _events.length === 0 ) {
		return new Promise( function( resolve, reject ) {
			gitHubApiService.getEvents( username, duration );
		});
	} else {
		return new Promise( function( resolve, reject ) {
			gitHubApiService.appendEvents( username, _events );
		});
	}
};


var eventStore = ObjectAssign( {}, Events.EventEmitter.prototype, {

	emitChange() {
		this.emit( CHANGE_EVENT );
	},

	addChangeListener( callback ) {
		this.on( CHANGE_EVENT, callback );
	},

	removeChangeListener( callback ) {
		this.on( CHANGE_EVENT, callback );
	},

	getEvents() {
		return _events;
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
	}

});


AppDispatcher.register( function( action) {

	switch ( action.actionType ) {
		case appConstants.RETRIEVE_EVENTS:
			retrieveEvents( action.username, action.duration )..then( (events) => _events = events ).then( () => eventStore.emitChange() );
		default: 
			console.log( 'Invalid action.' );
			return true;
	}

});


export default eventStore;
