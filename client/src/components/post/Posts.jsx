import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getPosts } from '../../actions/post';
import Spinner from '../layout/Spinner';
import { Fragment } from 'react';
import PostItem from './PostItem';
import PostForm from './PostForm';

import './Post.css';

const Posts = ({ getPosts, post: { posts, loading } }) => {
	useEffect(() => {
		getPosts();
	}, [getPosts]);

	return loading ? (
		<Spinner />
	) : (
		<Fragment>
			<div className='margin'>
				<p>welcome to chef's forum</p>
				<p>you can post comments here</p>
				<p>
					rules: be polite.
					<span>
						Though, you have "free speech", we recommend{' '}
						<span className='chan-text'>NOT TO GO FULL 4CHAN</span> in the
						comments.
					</span>
				</p>
				<PostForm />
				<div className='post-form'>
					{posts.map((post) => (
						<PostItem key={post._id} post={post} />
					))}
				</div>
			</div>
		</Fragment>
	);
};

Posts.propTypes = {
	getPosts: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
