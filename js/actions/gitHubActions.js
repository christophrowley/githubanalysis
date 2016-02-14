import appDispatcher from '../dispatcher/appDispatcher.js';
import appConstants from '../constants/appConstants.js';


var gitHubActions = {
  /** 
   * @param {string}
   * @param {int} 
  **/
  retrieveEvents( username, duration ) {
    appDispatcher.dispatch({
      actionType: appConstants.RETRIEVE_EVENTS,
      username: username,
      duration: duration
    });
  },

  /**
   * @param {string}
  **/
  removeEvents( username ) {
    appDispatcher.dispatch({
      actionType: appConstants.REMOVE_EVENTS,
      username: username
    });
  },

  /** 
   *
  **/
  clearEvents() {
    appDispatcher.dispatch({
      actionType: appConstants.CLEAR_EVENTS
    });
  } 
};

export default gitHubActions;
