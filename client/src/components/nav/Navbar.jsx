import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import './NavBar.css';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
	const authLinks = (
		<ul className='navigation'>
			<li>
				<Link to='/profiles' className='react-btn'>
					Chefs
				</Link>
			</li>
			<li className='border-box'>
				<Link to='/dashboard' className='react-btn'>
					dashboard
				</Link>
			</li>
			<li className='border-box'>
				<Link to='/posts' className='react-btn'>
					Posts
				</Link>
			</li>
			<li>
				<a href='#!' onClick={logout} className='react-btn'>
					Logout
				</a>
			</li>
		</ul>
	);

	const guestLinks = (
		<ul className='navigation'>
			<li className='border-box'>
				<Link to='/profiles' className='react-btn'>
					Chefs
				</Link>
			</li>
			<li className='border-box'>
				<Link to='/register' className='react-btn'>
					register
				</Link>
			</li>
			<li className='border-box'>
				<Link to='/login' className='react-btn'>
					Login
				</Link>
			</li>
		</ul>
	);

	return (
		<nav className='navigation'>
			<h1 className='border-box'>
				<Link to='/'>NorsKokk</Link>
			</h1>

			{!loading && (
				<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
			)}
		</nav>
	);
};

Navbar.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
