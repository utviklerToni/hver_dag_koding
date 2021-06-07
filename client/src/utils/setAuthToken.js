import axios from 'axios';

const setAuthToken = (token) => {
	// check if there is token in local storage or not
	if (token) {
		// if found then set global headers to follow
		// header to set is x-auth-token to token
		axios.defaults.headers.common['x-auth-token'] = token;
	} else {
		delete axios.defaults.headers.common['x-auth-token'];
	}
};

export default setAuthToken;
