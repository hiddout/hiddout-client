import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home } from './homePage/Home';
import { About } from './aboutPage/About';
import { Login } from './loginPage/Login';
import { Message } from './messagePage/Message';
import { Friend } from './friendPage/Friend';
import { NoMatch } from './404Page/NoMatch';

class MainPage extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {

		return (
			<Switch>
				<Route exact path="/" component={Home}/>
				<Route path="/message" component={Message}/>
				<Route path="/friend" component={Friend}/>
				<Route path="/login" component={Login}/>
				<Route path="/about" component={About}/>
				<Route component={NoMatch}/>
			</Switch>
		);
	}
}

export { MainPage };
