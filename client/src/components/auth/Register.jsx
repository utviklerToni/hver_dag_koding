import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		re_enter_password: '',
	});

	const { name, email, password, re_enter_password } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();

		if (password !== re_enter_password) {
			setAlert('password did not match', 'danger');
		} else {
			register({ name, email, password });
		}
	};

	// redirect
	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}

	return (
		<Fragment>
			<h1>Sign up</h1>
			<p>create your account</p>

			<form onSubmit={(e) => onSubmit(e)}>
				<div className='form-element'>
					<input
						type='text'
						placeholder='name'
						name='name'
						value={name}
						onChange={(e) => onChange(e)}
						required
					/>
				</div>
				<div className='form-element'>
					<input
						type='email'
						placeholder='email address'
						value={email}
						name='email'
						onChange={(e) => onChange(e)}
						required
					/>
				</div>
				<div className='form-element'>
					<input
						type='password'
						placeholder='password'
						value={password}
						name='password'
						onChange={(e) => onChange(e)}
						required
					/>
				</div>
				<div className='form-element'>
					<input
						type='password'
						placeholder='re-enter password'
						value={re_enter_password}
						name='re_enter_password'
						onChange={(e) => onChange(e)}
						required
					/>
				</div>
				<button type='submit'>Create</button>
			</form>

			<p>
				already registered ? <Link to='/login'>Login now</Link>
			</p>
		</Fragment>
	);
};

Register.propTypes = {
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

// connect() takes 2 arguments, state and an object with action
export default connect(mapStateToProps, { setAlert, register })(Register);
