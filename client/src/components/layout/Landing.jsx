import React from 'react';
import { Link } from 'react-router-dom';

import '../../App.css';

const Landing = () => {
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

export default Landing;
