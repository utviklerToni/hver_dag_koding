import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const ColorButton = withStyles((theme) => ({
	root: {
		color: 'white',
		borderRadius: '3px',
		background: '#00B46E',
		'&:hover': {
			backgroundColor: '#008C5A',
		},
	},
}))(Button);

const EditDashboard = () => {
	return (
		<div className='react-btn'>
			<Link to='/edit-profile'>
				<ColorButton variant='contained'>Edit Profile</ColorButton>
			</Link>

			<br />
			<br />
			<Link to='/add-profile'>
				<ColorButton variant='contained'>Add Profile</ColorButton>
			</Link>
		</div>
	);
};

export default EditDashboard;
