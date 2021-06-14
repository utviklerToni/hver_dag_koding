import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addComment } from '../../../actions/post';
import { connect } from 'react-redux';

const CommentForm = ({ postId, addComment }) => {
	const [text, setText] = useState('');

	return (
		<div className='form-elements'>
			<div className='background-color'>
				<h3>Leave a comment</h3>
			</div>
			<form
				className='form'
				onSubmit={(e) => {
					e.preventDefault();
					addComment(postId, { text });
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

CommentForm.propTypes = {
	addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
