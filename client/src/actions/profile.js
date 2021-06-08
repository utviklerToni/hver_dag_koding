import axios from 'axios';
import { setAlert } from './alert';

// get current users profile
import { GET_PROFILE, PROFILE_ERROR } from './types';

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
			dispatch(setAlert(edit ? 'Profile Update' : 'Profile Created'));

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
