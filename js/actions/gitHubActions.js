import appDispatcher from '../dispatcher/appDispatcher.js';
import appConstants from '../constants/appConstants.js';


var gitHubActions = {
  pullUserData() {
    appDispatcher.dispatch({
      actionType: appConstants.RETRIEVE_EVENTS,
      username: username
    });
  }
};

export default gitHubActions;
