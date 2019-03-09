// @flow
import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import { Home } from './homePage/Home';
import { About } from './aboutPage/About';
import { Login } from './loginPage/Login';
import { Message } from './messagePage/Message';
import { Friend } from './friendPage/Friend';
import { NoMatch } from './404Page/NoMatch';

import type {Node} from 'react';

type Props = {};

type State = {};

class MainPage extends React.Component<Props, State> {

	render(): Node {

		return (
			<Switch>
				<Route exact path="/" component={Home}/>
				<Redirect from='/index.html' to='/'/>
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
