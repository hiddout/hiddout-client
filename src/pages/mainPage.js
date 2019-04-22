// @flow
import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { Redirect, Switch, withRouter } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import { resources } from '../i18n/resources';

import PageRoute from '../containers/pageRoute/PageRoute';
import AuthRoute from '../containers/authRoute/AuthRoute';

const Post = React.lazy(() => import('./postPage/Post'));
const Submit = React.lazy(() => import('./submitPage/Submit'));
const BoardPage = React.lazy( ()=>import('./boardPage/BoardPage') );

const Settings = React.lazy(() => import('./settingsPage/Settings'));

const LoginSignInModal = React.lazy(() =>
	import('../containers/loginSignInModal/LoginSignInModal'),
);

import { About } from './aboutPage/About';
import { Message } from './messagePage/Message';

const Home = React.lazy(() => import('./homePage/Home'));
const NoMatch = React.lazy(() => import('./404Page/NoMatch'));

import type { Node } from 'react';

type Props = {
	auth: AuthState,
	i18n: Object,
	modal: ModalState,
	history: Object,
};

type State = {};

import type { ModalState } from '../reducers/modal';
import type { AuthState } from '../reducers/auth';


class MainPage extends React.Component<Props, State> {
	constructor(props) {
		super(props);
	}

	async initLanguage() {
		const i18n = await import('i18next');
		await i18n.init({
			resources,
			lng: this.props.i18n.language,
		});
	}

	componentDidMount() {
		this.initLanguage();
	}

	componentDidUpdate(prevProps) {
		if (this.props.i18n.language !== prevProps.i18n.language) {
			window.location.reload();
		}

		if(this.props.auth.show404 !== prevProps.auth.show404 && this.props.auth.show404){
			this.props.history.replace('/404');
		}
	}

	render(): Node {

		const { signUpModalShowed, loginModalShowed } = this.props.modal;

		const isLoginSign = (signUpModalShowed || loginModalShowed);

		return (
			<Suspense fallback={<Loader />}>
				{isLoginSign && <LoginSignInModal />}
				<Switch>
					<PageRoute
						exact
						path="/"
						render={(props) => <Home {...props} />}
					/>
					<Redirect from="/index.html" to="/" />
					<AuthRoute path="/message" component={Message} />
					<AuthRoute
						path="/submit"
						component={(props) => <Submit {...props} />}
					/>
					{/*<AuthRoute path="/friend" component={(props) => <Friend {...props} />} />*/}
					<PageRoute
						path="/b/:id"
						render={(props) => <BoardPage {...props} />}
					/>
					<PageRoute
						path="/p/:id"
						render={(props) => <Post {...props} />}
					/>
					<AuthRoute
						path="/settings"
						component={(props) => <Settings {...props} />}
					/>
					<PageRoute path="/about" render={About} />
					<PageRoute render={(props) => <NoMatch {...props} />} />
				</Switch>
			</Suspense>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		i18n: state.i18n,
		modal: state.modal,
	};
};

const mainPage = withRouter(connect(mapStateToProps)(MainPage));

export { mainPage as MainPage };
