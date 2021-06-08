import { combineReducers } from 'redux';
import alert from './alert_reducer';
import auth from './auth_reducer';
import profile from './profile_reducer';

export default combineReducers({
	alert,
	auth,
	profile,
});
