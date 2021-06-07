import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../../App.css';

const Landing = ({ isAuthenticated }) => {
	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}

	return (
		<section className='landing'>
			<div className='dark-overlay'>
				<div className='landing-inner'>
					<h1 className='xlarge'>NorsKokk</h1>
					<p className='lead'>create your profile</p>
					<div className='buttons'>
						<Link to='/register' className='border-box pad-marg'>
							sign up
						</Link>
						<Link to='/login' className='border-box pad-marg'>
							login
						</Link>
					</div>
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
