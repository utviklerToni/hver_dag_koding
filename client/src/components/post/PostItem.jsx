import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import formatDate from '../../utils/formateDate';
import { addLike, removeLike, deletePost } from '../../actions/post';
import { Fragment } from 'react';

const PostItem = ({
	addLike,
	removeLike,
	deletePost,
	auth,
	post: { _id, text, name, avatar, user, likes, comments, date },
	showActions,
}) => (
	<div className='post bg-color'>
		<div>
			<Link to={`/profile/${user}`}>
				<img src={avatar} alt='' />
				<h3>{name}</h3>
			</Link>
		</div>
		<div>
			<p>
				{name} said: <br />
				{text}
			</p>
			<p>Posted on {formatDate(date)} </p>

			{showActions && (
				<Fragment>
					<button type='button' onClick={() => addLike(_id)}>
						add like :
						<span> {likes.length > 0 && <span>{likes.length}</span>}</span>
					</button>
					<button
						type='button'
						className='thumbs-down'
						onClick={() => removeLike(_id)}
					>
						remove like
					</button>
					<Link to={`/replies/${_id}`}>
						<button>
							replies: {comments.length > 0 && <span>{comments.length}</span>}
						</button>
					</Link>
					{!auth.loading && user === auth.user._id && (
						<button type='button' onClick={(e) => deletePost(_id)}>
							delete Post
						</button>
					)}
				</Fragment>
			)}
		</div>
	</div>
);

PostItem.defaultProps = {
	showActions: true,
};

PostItem.propTypes = {
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	addLike: PropTypes.func.isRequired,
	removeLike: PropTypes.func.isRequired,
	deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
	PostItem
);
