import PropTypes from 'prop-types';
import formatDate from '../../../utils/formateDate';

const ProfileExperienceSection = ({
	experience: { restaurant, title, location, current, to, from, description },
}) => {
	return (
		<div>
			<h3>{restaurant}</h3>
			<p>{title}</p>
			<p>
				{formatDate(from)} - {to ? formatDate(to) : 'Now'}
			</p>
			<p>{description}</p>
		</div>
	);
};

ProfileExperienceSection.propTypes = {
	experience: PropTypes.object.isRequired,
};

export default ProfileExperienceSection;
