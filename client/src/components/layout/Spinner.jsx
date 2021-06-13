import { Fragment } from 'react';
import spinner from './loading_spinner.gif';

const Spinner = () => (
	<Fragment>
		<img src={spinner} className='gif' alt='Loading' />
	</Fragment>
);

export default Spinner;
