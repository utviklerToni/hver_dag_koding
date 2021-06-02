const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

// route 	=> api/posts
// desc  	=> create a post
// access => private
router.post(
	'/',
	[auth, [check('text', 'Text is required').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const user = await User.findById(req.user.id).select('-password');

			const newPost = new Post({
				text: req.body.text,
				name: user.name,
				avatar: user.avatar,
				user: req.user.id,
			});

			const post = await newPost.save();

			res.json(post);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('server error');
		}
	}
);

// route 	=> api/posts
// desc  	=> list all the posts
// access => private
router.get('/', auth, async (req, res) => {
	try {
		const posts = await Post.find().sort({ date: -1 });
		res.json(posts);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('server error');
	}
});

// route 	=> api/posts/:id
// desc  	=> list post by userID
// access => private
router.get('/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		// if there is no post with the given user ID
		if (!post) {
			return res.status(404).json({ msg: 'Post not found' });
		}
		res.json(post);
	} catch (err) {
		console.error(err.message);

		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Post not found' });
		}

		res.status(500).send('server error');
	}
});

// #route type > DELETE
// #endpoint   > api/posts/:id
// #task       > delete user's post
// #access     > private
router.delete('/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		//if the post doesnt exists
		if (!post) {
			return res.status(404).json({ msg: 'Post not found' });
		}

		//checking if user owns the post or not
		if (post.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'user not authorized' });
		}

		await post.remove();
		res.json({ msg: 'post removed' });
	} catch (err) {
		console.error(err.message);

		// if the user id doesnt match
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Post not found' });
		}
		res.status(500).send('server error');
	}
});

// #route type > PUT
// #endpoint   > api/posts/like/:id
// #task       > like a user's post
// #access     > private
router.put('/like/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		// checking if the post already liked or not
		if (
			post.likes.filter((like) => like.user.toString() === req.user.id).length >
			0
		) {
			return res.status(400).json({ msg: 'post already liked' });
		}
		post.likes.unshift({ user: req.user.id });

		await post.save();

		res.json(post.likes);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('server error');
	}
});

// #route type > PUT
// #endpoint   > api/posts/unlike/:id
// #task       > unlike a user's post
// #access     > private
router.put('/unlike/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		// checking if the post already liked or not
		if (
			post.likes.filter((like) => like.user.toString() === req.user.id)
				.length === 0
		) {
			return res.status(400).json({ msg: 'post has not yet been liked' });
		}
		// get remove index
		const removeIndex = post.likes
			.map((like) => like.user.toString())
			.indexOf(req.user.id);

		post.likes.splice(removeIndex, 1);

		await post.save();

		res.json(post.likes);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('server error');
	}
});

module.exports = router;
