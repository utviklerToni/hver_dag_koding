import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Landing.css';
import '../../App.css';

const Landing = ({ isAuthenticated }) => {
	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}

	return (
		<section className='landing'>
			<div className='greet_outer card'>
				<h1 className='landing_greet'>Velkommen til NorsKokk</h1>
				<p className='lead'>create your profile to explore</p>
				<p>or explore list of chefs</p>
				<div className='buttons'>
					<Link to='/register' className='border-box pad-marg react-btn'>
						sign up
					</Link>
					<Link to='/login' className='border-box pad-marg react-btn'>
						login
					</Link>
				</div>
			</div>
		</section>
	);
};

Landing.propTypes = {
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
