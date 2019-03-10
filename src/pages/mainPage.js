// @flow
import React from 'react';
import { connect } from 'react-redux'
import { Route, Redirect, Switch } from 'react-router-dom';
import i18n from "i18next";

import { LoginModal } from '../containers/loginModal/LoginModal';

import { Home } from './homePage/Home';
import { About } from './aboutPage/About';
import { Login } from './loginPage/Login';
import { Message } from './messagePage/Message';
import { Friend } from './friendPage/Friend';
import { NoMatch } from './404Page/NoMatch';

import type { Node } from 'react';

type Props = {
	i18n: Object
};

type State = {};

import {resources} from '../i18n/resources';

class MainPage extends React.Component<Props, State> {

	constructor(props){
		super(props);

		i18n.init({
			resources,
			lng: this.props.i18n.language,
		});
	}

	componentDidUpdate(prevProps) {
		// Typical usage (don't forget to compare props):
		if (this.props.i18n.language !== prevProps.i18n.language) {
			window.location.reload();
		}
	}

	render(): Node {
		return (
			<React.Fragment>
				<LoginModal />
				<Switch>
					<Route exact path="/" component={Home} />
					<Redirect from="/index.html" to="/" />
					<Route path="/message" component={Message} />
					<Route path="/friend" component={Friend} />
					<Route path="/login" component={Login} />
					<Route path="/about" component={About} />
					<Route component={NoMatch} />
				</Switch>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		i18n: state.i18n
	}
};

const mainPage = connect(
	mapStateToProps
)(MainPage);

export { mainPage as MainPage };
