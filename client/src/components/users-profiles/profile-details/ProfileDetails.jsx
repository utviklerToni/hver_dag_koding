import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../layout/Spinner';
import { getProfileByID } from '../../../actions/profile';
import { Link } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAboutSection from './ProfileAboutSection';
import ProfileExperienceSection from './ProfileExperienceSection';

const ProfileDetails = ({
	getProfileByID,
	profile: { profile, loading },
	auth,
	match,
}) => {
	useEffect(() => {
		getProfileByID(match.params.id);
	}, [getProfileByID, match.params.id]);

	return (
		<Fragment>
			{profile === null || loading ? (
				<Spinner />
			) : (
				<Fragment>
					<Link to='/profiles'>Back to Profiles</Link>
					{auth.isAuthenticated &&
						auth.loading === false &&
						auth.user._id === profile.user._id && (
							<Link to='/edit-profile'>Edit Profile</Link>
						)}

					<div className='profile-view'>
						<ProfileTop profile={profile} />
						<ProfileAboutSection profile={profile} />
						<div className='exp background-color'>
							<h2>experience</h2>
							{profile.experience.length > 0 ? (
								<Fragment>
									{profile.experience.map((experience) => (
										<ProfileExperienceSection
											key={experience._id}
											experience={experience}
										/>
									))}
								</Fragment>
							) : (
								<h3>no experience</h3>
							)}
						</div>
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

ProfileDetails.propTypes = {
	getProfileByID: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth,
});

export default connect(mapStateToProps, { getProfileByID })(ProfileDetails);
