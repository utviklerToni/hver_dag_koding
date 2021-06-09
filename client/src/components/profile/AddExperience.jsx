import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';

const AddExperience = ({ addExperience, history }) => {
	const [formData, setFormData] = useState({
		restaurant: '',
		title: '',
		location: '',
		from: '',
		to: '',
		current: false,
		description: '',
	});

	const [currentChef, setCurrentChef] = useState(false);

	const { restaurant, title, location, from, to, current, description } =
		formData;

	const onChange = (event) =>
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});

	const onSubmit = (event) => {
		event.preventDefault();
		addExperience(formData, history);
	};

	return (
		<Fragment>
			<h1>Add your experience of chef/cook career</h1>
			<p>Let people know where it all started </p>
			<form onSubmit={(event) => onSubmit(event)}>
				<div className='form-elements'>
					<input
						type='text'
						placeholder='* title'
						name='title'
						required
						value={title}
						onChange={(event) => onChange(event)}
					/>
				</div>
				<div className='form-elements'>
					<input
						type='text'
						placeholder='restaurant'
						name='restaurant'
						required
						value={restaurant}
						onChange={(event) => onChange(event)}
					/>
				</div>
				<div className='form-elements'>
					<input
						type='text'
						placeholder='location'
						name='location'
						value={location}
						onChange={(event) => onChange(event)}
					/>
				</div>
				<div className='form-elements'>
					<h4>from date</h4>
					<input
						type='date'
						name='from'
						value={from}
						onChange={(event) => onChange(event)}
					/>
				</div>
				<div className='form-elements'>
					<p>
						<input
							type='checkbox'
							name='current'
							checked={current}
							value={current}
							onChange={(event) => {
								setFormData({
									...formData,
									current: !current,
								});
								setCurrentChef(!currentChef);
							}}
						/>{' '}
						Currently chef
					</p>
				</div>
				<div className='form-elements'>
					<h4>To date</h4>
					<input
						type='date'
						name='to'
						value={to}
						disabled={currentChef ? 'disabled' : ''}
						onChange={(event) => onChange(event)}
					/>
				</div>
				<div className='form-elements'>
					<textarea
						name='description'
						cols='54'
						rows='9'
						value={description}
						placeholder='descriptions...'
						onChange={(event) => onChange(event)}
					></textarea>
				</div>
				<input type='submit' value='Submit' />
				<Link to='/dashboard'>Go Back</Link>
			</form>
		</Fragment>
	);
};

AddExperience.propTypes = {
	addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(AddExperience);
