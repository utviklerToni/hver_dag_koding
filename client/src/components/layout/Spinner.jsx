import { Fragment } from 'react';
import spinner from './loading_spinner.gif';
import './beer-tap.css';

const loading_spinner = () => (
	<Fragment>
		<img src={spinner} className='gif' alt='Loading' />
	</Fragment>
);

export default loading_spinner;
