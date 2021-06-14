import PropTypes from 'prop-types';
import { useEffect, Fragment } from 'react';

import { connect } from 'react-redux';
import Spinner from '../../layout/Spinner';
import { getPost } from '../../../actions/post';
import PostItem from '../PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Replies = ({ getPost, post: { post, loading }, match }) => {
	useEffect(() => {
		getPost(match.params.id);
	}, [getPost]);

	return loading || post === null ? (
		<Spinner />
	) : (
		<Fragment>
			<PostItem post={post} showActions={false} />
			<CommentForm postId={post._id} />

			<div className='comments'>
				{post.comments.map((comment) => (
					<CommentItem key={comment._id} comment={comment} postId={post._id} />
				))}
			</div>
		</Fragment>
	);
};

Replies.propTypes = {
	getPost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	post: state.post,
});

export default connect(mapStateToProps, { getPost })(Replies);
