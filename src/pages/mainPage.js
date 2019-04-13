// @flow
import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';

const LoginModal = React.lazy(() =>
	import('../containers/loginModal/LoginModal'),
);
const SignUpModal = React.lazy(() =>
	import('../containers/signUpModal/SignUpModal'),
);

import { About } from './aboutPage/About';
import { Message } from './messagePage/Message';

const Home = React.lazy(() => import('./homePage/Home'));
const NoMatch = React.lazy(() => import('./404Page/NoMatch'));


import type { Node } from 'react';

type Props = {
	i18n: Object,
	modal: ModalState,
};

type State = {};

import { resources } from '../i18n/resources';
import type { ModalState } from '../reducers/modal';
const Post = React.lazy(() => import('./postPage/Post'));
const Submit = React.lazy(() => import('./submitPage/Submit'));

class MainPage extends React.Component<Props, State> {
	constructor(props) {
		super(props);
	}

	async initLanguage(){
		const i18n = await import('i18next');
		await i18n.init({
			resources,
			lng: this.props.i18n.language,
		});
	}

	componentDidMount(){
		this.initLanguage();
	}

	componentDidUpdate(prevProps) {
		if (this.props.i18n.language !== prevProps.i18n.language) {
			window.location.reload();
		}
	}

	render(): Node {
		const { signUpModalShowed, loginModalShowed } = this.props.modal;
		return (
			<Suspense fallback={<Loader />}>
				{ loginModalShowed && <LoginModal />}
				{ signUpModalShowed && <SignUpModal />}
				<Switch>
					<Route
						exact
						path="/"
						component={(props) => <Home {...props} />}
					/>
					<Redirect from="/index.html" to="/" />
					<Route path="/message" component={Message} />
					<Route path="/submit" component={(props) => <Submit {...props} />} />
					<Route
						path="/p/:id"
						component={(props) => <Post {...props} />}
					/>
					<Route path="/about" component={About} />
					<Route component={(props) => <NoMatch {...props} />} />
				</Switch>
			</Suspense>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		i18n: state.i18n,
		modal: state.modal,
	};
};

const mainPage = withRouter(connect(mapStateToProps)(MainPage));

export { mainPage as MainPage };
