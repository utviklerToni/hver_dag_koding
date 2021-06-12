import React from 'react';
import PropTypes from 'prop-types';

const ProfileTop = ({
	profile: {
		status,
		restaurant,
		location,
		video,
		user: { name, avatar },
	},
}) => {
	return (
		<div>
			<img src={avatar} alt='' />

			<p>
				{status} {restaurant && <span>{restaurant}</span>}
			</p>
			<p>{location && <span>{location}</span>}</p>

			<p>
				{video && video.odysse && (
					<a href={video.odysse} target='_blank' rel='noopener noreferrer'>
						odysse
					</a>
				)}
			</p>
			<p>
				{video && video.youtube && (
					<a href={video.youtube} target='_blank' rel='noopener noreferrer'>
						youtube
					</a>
				)}
			</p>
		</div>
	);
};

ProfileTop.propTypes = {
	profile: PropTypes.object.isRequired,
};

export default ProfileTop;
