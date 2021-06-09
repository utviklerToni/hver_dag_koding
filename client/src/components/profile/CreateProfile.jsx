import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';
import { Link } from 'react-router-dom';

const CreateProfile = ({ createProfile, history }) => {
	// form data state
	const [formData, setFormData] = useState({
		restaurant: '',
		status: '',
		dishes: '',
		about: '',
		location: '',
		odysse: '',
		youtube: '',
	});

	// getting all the above data from the forms
	const { restaurant, status, dishes, about, location, odysse, youtube } =
		formData;

	// social media input state
	const [recipeVideo, setRecipeVideo] = useState(false);

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		createProfile(formData, history);
	};

	return (
		<Fragment>
			<h1>create your profile</h1>
			<p>add your information to get started</p>

			<form className='form' onSubmit={(e) => onSubmit(e)}>
				<div className='form-elements'>
					<select name='status' value={status} onChange={(e) => onChange(e)}>
						<option value='0'>select your status</option>
						<option value='master chef'>master chef</option>
						<option value='head of chef'>head of chef</option>
						<option value='senior chef'>senior chef</option>
						<option value='junior cook'>junior cook</option>
						<option value='intern cook'>intern cook</option>
					</select>
				</div>
				<div className='form-elements'>
					<input
						type='text'
						placeholder='restaurant'
						name='restaurant'
						value={restaurant}
						onChange={(e) => onChange(e)}
					/>
				</div>

				<div className='form-elements'>
					<input
						type='text'
						placeholder='dishes'
						name='dishes'
						value={dishes}
						onChange={(e) => onChange(e)}
					/>
					<p>
						add your fav or signature dishes(eg. fried rice, dan dan noodles,
						chicken chilli)
					</p>
				</div>
				<div className='form-elements'>
					<input
						type='text'
						placeholder='restaurant location'
						name='location'
						value={location}
						onChange={(e) => onChange(e)}
					/>
				</div>

				<div className='form-elements'>
					<input
						type='text'
						placeholder='about'
						name='about'
						value={about}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<p>stay anonymous or let people know who you are </p>

				<hr />
				<p>if you have any video you wanna share</p>
				<div className='react-btn-theme'>
					<button type='button' onClick={() => setRecipeVideo(!recipeVideo)}>
						recipe videos
					</button>
					<span>optional(*)</span>
				</div>
				{recipeVideo && (
					<Fragment>
						<div className='form-elements'>
							<input
								type='text'
								placeholder='your odysse link'
								name='odysse'
								value={odysse}
								onChange={(e) => onChange(e)}
							/>
						</div>
						<div className='form-elements'>
							<input
								type='text'
								placeholder='youtube link'
								name='youtube'
								value={youtube}
								onChange={(e) => onChange(e)}
							/>
						</div>
					</Fragment>
				)}

				<button type='submit'>Submit</button>

				<Link to='/dashboard'>Go Back</Link>
			</form>
		</Fragment>
	);
};

CreateProfile.propTypes = {
	createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile })(CreateProfile);
