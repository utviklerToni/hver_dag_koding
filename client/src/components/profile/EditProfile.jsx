import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';
import { Link, withRouter } from 'react-router-dom';

const EditProfile = ({
	profile: { profile, loading },
	createProfile,
	getCurrentProfile,
	history,
}) => {
	// form data state
	const [formData, setFormData] = useState({
		status: '',
		restaurant: '',

		dishes: '',
		about: '',
		location: '',
		odysse: '',
		youtube: '',
	});

	// social media input state
	const [recipeVideo, setRecipeVideo] = useState(false);

	// getting all the above data from the forms
	const { status, restaurant, dishes, about, location, odysse, youtube } =
		formData;

	useEffect(() => {
		getCurrentProfile();

		setFormData({
			status: loading || !profile.status ? '' : profile.status,
			restaurant: loading || !profile.restaurant ? '' : profile.restaurant,
			dishes: loading || !profile.dishes ? '' : profile.dishes.join(','),
			about: loading || !profile.about ? '' : profile.about,
			location: loading || !profile.location ? '' : profile.location,
			odysse: loading || !profile.video ? '' : profile.video.odysse,
			youtube: loading || !profile.video ? '' : profile.video.youtube,
		});
	}, [loading]);

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		createProfile(formData, history, true);
	};

	return (
		<Fragment>
			<h1>Edit your profile</h1>

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
						placeholder='restaurant name '
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
						placeholder='location'
						name='location'
						value={location}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<hr />

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

EditProfile.propTypes = {
	createProfile: PropTypes.func.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
	withRouter(EditProfile)
);
