import { Fragment } from 'react';
import spinner from './beer-tap.gif';
import './beer-tap.css';

export default () => (
	<Fragment>
		<img src={spinner} className='gif' alt='Loading' />
	</Fragment>
);
