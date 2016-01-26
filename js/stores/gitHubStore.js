import ObjectAssign from 'object-assign';
import AppDispatcher from '../dispatcher/appDispatcher.js';
import Events from 'events';
import gitHubApiService from '../services/gitHubApiService.js';
import appConstants from '../constants/appConstants.js';


var CHANGE_EVENT = 'change';
var _events = [];

var gitHubStore = ObjectAssign( {}, Events.EventEmitter.prototype, {

	retrieveEvents( username, duration ) {
		return gitHubApiService.getEvents( username, duration ).then( (val) => _events = val );
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
	}

});

AppDispatcher.register( function( payload ) {

	switch ( action.actionType ) {
		case appConstants.RETRIEVE_EVENTS:
			_username = action.username;
			gitHubStore.emitChange();
			break;

		default:
			return true;
	}

});

export default gitHubStore;
