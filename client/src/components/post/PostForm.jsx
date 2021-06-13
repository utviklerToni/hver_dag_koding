import PropTypes from 'prop-types';
import { useState } from 'react';
import { connect } from 'react-redux';

import { addPost } from '../../actions/post';

const PostForm = ({ addPost }) => {
	const [text, setText] = useState('');

	return (
		<div className='form'>
			<div className='background-color'>
				<h3>you can post comments here </h3>
			</div>
			<form
				className='form'
				onSubmit={(e) => {
					e.preventDefault();
					addPost({ text });
					setText('');
				}}
			>
				<textarea
					placeholder='type your comments here'
					name='text'
					cols='69'
					rows='9'
					onChange={(e) => setText(e.target.value)}
					value={text}
					required
				></textarea>
				<input type='submit' value='post' />
			</form>
		</div>
	);
};

PostForm.propTypes = {
	addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
