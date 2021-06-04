import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;
	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();

		console.log('successfully logged in ');
	};

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
						autoComplete='email'
					/>
				</div>
				<div className='form-element'>
					<input
						type='password'
						placeholder='password'
						value={password}
						name='password'
						onChange={(e) => onChange(e)}
						autoComplete='password'
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

export default Login;
