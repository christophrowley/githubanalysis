import appDispatcher from '../dispatcher/appDispatcher.js';
import appConstants from '../constants/appConstants.js';


var gitHubActions = {
  retrieveEvents( username, duration ) {
    appDispatcher.dispatch({
      actionType: appConstants.RETRIEVE_EVENTS,
      username: username,
      duration: duration
    });
  }
};

export default gitHubActions;
