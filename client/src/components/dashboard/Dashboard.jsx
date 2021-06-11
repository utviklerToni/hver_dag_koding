import React from 'react';
import PropTypes from 'prop-types';
import { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import EditDashboard from './EditDashboard';
import Experience from './Experience';

const Dashboard = ({
	getCurrentProfile,
	deleteAccount,
	auth: { user },
	profile: { profile, loading },
}) => {
	useEffect(() => {
		getCurrentProfile();
	}, [getCurrentProfile]);

	return loading && profile === null ? (
		<Spinner />
	) : (
		<Fragment>
			<h3 className=''>Dashboard</h3>
			<h1>VELKOMENN {user && user.name}</h1>
			{profile !== null ? (
				<Fragment>
					<EditDashboard />
					<Experience experience={profile.experience} />

					<div className='margin'>
						<button className='red' onClick={() => deleteAccount()}>
							Delete Account
						</button>
					</div>
				</Fragment>
			) : (
				<Fragment>
					<p>no profile set, maybe create one ?</p>
					<Link to='/create-profile' className='material-btn'>
						Create profile
					</Link>
				</Fragment>
			)}
		</Fragment>
	);
};

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	deleteAccount: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,

	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
	Dashboard
);
