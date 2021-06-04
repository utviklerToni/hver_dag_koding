import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<nav className='flex-box nav-background-color'>
			<h1 className='border-box'>
				<Link to='/'>NorsKokk</Link>
			</h1>
			<ul className='flex-box nav-margin'>
				<li className='border-box'>
					<Link to='/' className='nav-pad'>
						Hjem
					</Link>
				</li>
				<li className='border-box'>
					<Link to='/register' className='nav-pad'>
						register
					</Link>
				</li>
				<li className='border-box'>
					<Link to='/login' className='nav-pad'>
						Login
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
