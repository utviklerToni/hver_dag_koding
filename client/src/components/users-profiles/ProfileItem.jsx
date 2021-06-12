import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
	profile: {
		user: { _id, name, avatar },
		status,
		restaurant,
		location,
		dishes,
	},
}) => {
	return (
		<div className='profile light-back'>
			<img src={avatar} alt='' />
			<div>
				<h3>{name}</h3>
				<p>
					{status} {restaurant && <span>at {restaurant}</span>}
				</p>
				<p>{location && <span>{location}</span>}</p>
				<Link to={`/profile/${_id}`}>view profile</Link>
			</div>
			<ul>
				{/* if you wanna display chef's selected recipe/dish on main profile list page */}
				{/* {dishes.slice(0, 4).map((skill, index) => (
					<li key={index}>{skill}</li>
				))} */}
			</ul>
		</div>
	);
};

ProfileItem.propTypes = {
	profile: PropTypes.object.isRequired,
};

export default ProfileItem;
