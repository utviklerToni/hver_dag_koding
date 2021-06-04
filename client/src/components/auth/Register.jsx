import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	});

	const { name, email, password } = formData;
	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();

		const newUser = {
			name,
			email,
			password,
		};

		console.log(newUser);
	};

	return (
		<Fragment>
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
						autoComplete='your username or real name'
					/>
				</div>
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
				<button type='submit'>Create</button>
			</form>

			<p>
				already registered ? <Link to='/login'>Login now</Link>
			</p>
		</Fragment>
	);
};

export default Register;
