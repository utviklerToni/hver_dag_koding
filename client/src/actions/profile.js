import axios from 'axios';
import { setAlert } from './alert';

// get current users profile
import {
	ACCOUNT_DELETED,
	CLEAR_PROFILE,
	GET_PROFILE,
	GET_PROFILES,
	PROFILE_ERROR,
	UPDATE_PROFILE,
} from './types';

export const getCurrentProfile = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/profile/me');

		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: error.response.statusText,
				status: error.response.status,
			},
		});
	}
};

// get all profiles
export const getProfiles = () => async (dispatch) => {
	dispatch({ type: CLEAR_PROFILE });

	try {
		const res = await axios.get('/api/profile');

		dispatch({
			type: GET_PROFILES,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: error.response.statusText,
				status: error.response.status,
			},
		});
	}
};

// get all profile by ID
export const getProfileByID = (userId) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/profile/user/${userId}`);

		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: error.response.statusText,
				status: error.response.status,
			},
		});
	}
};

// create or update profile
// history object has a method called push that will redirect to a client side route
// edit parameter to track if the user is editing , creating or updating his/her profile
export const createProfile =
	(formData, history, edit = false) =>
	async (dispatch) => {
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};

			const res = await axios.post('/api/profile', formData, config);

			dispatch({
				type: GET_PROFILE,
				payload: res.data,
			});

			// if edit is true then , "profile updated" else "profile created"
			dispatch(
				setAlert(edit ? 'Profile Update' : 'Profile Created', 'success')
			);

			if (!edit) {
				history.push('/dashboard');
			}
		} catch (error) {
			const errors = error.response.data.errors;

			if (errors) {
				errors.forEach((err) => dispatch(setAlert(err.msg, 'danger')));
			}

			dispatch({
				type: PROFILE_ERROR,
				payload: {
					msg: error.response.statusText,
					status: error.response.status,
				},
			});
		}
	};

// add experience
// parameter takes form data to populate, and history to redirect to dashboad
export const addExperience = (formData, history) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.put('/api/profile/experience', formData, config);

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});

		dispatch(setAlert('Experince Added', 'success'));

		history.push('/dashboard');
	} catch (error) {
		const errors = error.response.data.errors;

		if (errors) {
			errors.forEach((err) => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: error.response.statusText,
				status: error.response.status,
			},
		});
	}
};

// to delete experience
export const deleteExperience = (id) => async (dispatch) => {
	try {
		const res = await axios.delete(`/api/profile/experience/${id}`);

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});

		dispatch(setAlert('Experience removed', 'success'));
	} catch (error) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: error.response.satusText, status: error.response.status },
		});
	}
};

// TO DELETE USER'S ACCOUNT
export const deleteAccount = (id) => async (dispatch) => {
	if (window.confirm('Are you sure? ')) {
		try {
			await axios.delete(`/api/profile`);

			dispatch({
				type: CLEAR_PROFILE,
			});

			dispatch({
				type: ACCOUNT_DELETED,
			});

			dispatch(setAlert('Account deleted permanently', 'success'));
		} catch (error) {
			dispatch({
				type: PROFILE_ERROR,
				payload: {
					msg: error.response.satusText,
					status: error.response.status,
				},
			});
		}
	}
};
