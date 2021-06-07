import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
	const authLinks = (
		<ul className='flex-box nav-margin'>
			<li className='border-box'>
				<Link to='/dashboard' className='nav-pad'>
					dashboard
				</Link>
			</li>
			<li>
				<a href='#!' onClick={logout}>
					Logout
				</a>
			</li>
		</ul>
	);

	const guestLinks = (
		<ul className='flex-box nav-margin'>
			<li className='border-box'>
				<Link to='/dashboard' className='nav-pad'>
					Hjem
				</Link>
			</li>
			<li className='border-box'>
				<Link to='/register' className='nav-pad'>
					register
				</Link>
			</li>
			<li className='border-box'>
				<Link to='/login' className='nav-pad'>
					Login
				</Link>
			</li>
		</ul>
	);

	return (
		<nav className='flex-box nav-background-color'>
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
