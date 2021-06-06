import { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Landing from './components/layout/Landing';
import Navbar from './components/nav/Navbar';
import Alert from './components/layout/Alert';

// importing redux
import { Provider } from 'react-redux';
import reduxStore from './reduxStrore';

const App = () => {
	return (
		<Provider store={reduxStore}>
			<Router>
				<Fragment>
					<Navbar />
					<Route exact path='/' component={Landing} />

					<section className='container'>
						<Alert />
						<Switch>
							<Route exact path='/register' component={Register} />
							<Route exact path='/login' component={Login} />
						</Switch>
					</section>
				</Fragment>
			</Router>
		</Provider>
	);
};

export default App;
