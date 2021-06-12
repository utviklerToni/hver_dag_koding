import PropTypes from 'prop-types';
import { Fragment } from 'react';

const ProfileAboutSection = ({
	profile: {
		about,
		dishes,
		user: { name },
	},
}) => {
	return (
		<div>
			{about && (
				<Fragment>
					<h3>About {name}</h3>
					<p>{about}</p>
				</Fragment>
			)}
			<h3>dishes</h3>
			<div>
				{dishes.map((dish, index) => (
					<div key={index}> {dish}</div>
				))}
			</div>
		</div>
	);
};

ProfileAboutSection.propTypes = {
	profile: PropTypes.object.isRequired,
};

export default ProfileAboutSection;
