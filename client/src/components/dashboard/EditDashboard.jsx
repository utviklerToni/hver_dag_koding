import React from 'react';
import { Link } from 'react-router-dom';

import './Dashboard.css';

const EditDashboard = () => {
	return (
		<div className='flex-box'>
			<div>
				<Link to='/edit-profile' className='react-btn'>
					edit profile
				</Link>
			</div>

			<div>
				<Link to='/add-experience' className='react-btn'>
					add experience
				</Link>
			</div>
		</div>
	);
};

export default EditDashboard;
