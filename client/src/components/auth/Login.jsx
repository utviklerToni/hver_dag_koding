import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;
	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();

		login(email, password);
	};

	// redirecting
	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}

	return (
		<Fragment>
			<p>Login in to your profile</p>

			<form onSubmit={(e) => onSubmit(e)}>
				<div className='form-element'>
					<input
						type='email'
						placeholder='email address'
						value={email}
						name='email'
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className='form-element'>
					<input
						type='password'
						placeholder='password'
						value={password}
						name='password'
						onChange={(e) => onChange(e)}
						minLength={6}
					/>
				</div>
				<button type='submit'>Login</button>
			</form>
			<p>
				not registered yet? <Link to='/register'>Register now </Link>
			</p>
		</Fragment>
	);
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
