import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import formatDate from '../../../utils/formateDate';
import { deleteComment } from '../../../actions/post';

const CommentItem = ({
	postId,
	comment: { _id, text, name, avatar, user, date },
	auth,
	deleteComment,
}) => {
	return (
		<div className='post color'>
			<div>
				<Link to={`/profile/${user}`}>
					<img src={avatar} alt='' />
					<h3>{name}</h3>
				</Link>
			</div>
			<div>
				<p>{text}</p>
				<p>posted on : {formatDate(date)}</p>

				{!auth.loading && user === auth.user._id && (
					<button
						onClick={(e) => deleteComment(postId, _id)}
						type='button'
						className='react-btn'
					>
						delete
					</button>
				)}
			</div>
		</div>
	);
};

CommentItem.propTypes = {
	postId: PropTypes.string.isRequired,
	comment: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
