// @flow
import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { Redirect, Switch, withRouter } from 'react-router-dom';
import i18n from 'i18next';
import { Loader } from 'semantic-ui-react';
import { resources } from '../i18n/resources';

import PageRoute from '../containers/pageRoute/PageRoute';
import AuthRoute from '../containers/authRoute/AuthRoute';

import AdminModal from '../containers/adminModal/AdminModal';
import LoginSignUpModal from '../containers/loginSignUpModal/LoginSignUpModal';

const Post = React.lazy(() => import('./postPage/Post'));
const Submit = React.lazy(() => import('./submitPage/Submit'));
const BoardPage = React.lazy( ()=>import('./boardPage/BoardPage') );

const Settings = React.lazy(() => import('./settingsPage/Settings'));
const Home = React.lazy(() => import('./homePage/Home'));
const User = React.lazy(() => import('./visitUserPage/VisitUser'));
const Message = React.lazy(() => import('./messagePage/Message'));
const NoMatch = React.lazy(() => import('./404Page/NoMatch'));
const About = React.lazy(() => import('./aboutPage/About'));
const FooterPage = React.lazy(() => import('./footerPage/FooterPage') );

import type { Node } from 'react';
import type { ModalState } from '../reducers/modal';
import type { AuthState } from '../reducers/auth';
import { CORRECT_REDUCERS_VERSION } from '../actions/actionType';

type Props = {
	auth: AuthState,
	i18n: Object,
	modal: ModalState,
	history: Object,
	location: Object,
	version: Object,
	correctReducerVersion: (number) => any,
};

type State = {};

class MainPage extends React.Component<Props, State> {
	constructor(props) {
		super(props);
	}

	async initLanguage() {
		await i18n.init({
			resources,
			lng: this.props.i18n.language,
		});
	}

	componentDidMount() {
		this.checkVersion();
		this.initLanguage();
	}

	checkVersion(){
		const latestVersion = 1;
		const {reducer} = this.props.version;
		if(reducer !== latestVersion){
			this.props.correctReducerVersion(latestVersion);
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.i18n.language !== prevProps.i18n.language) {
			window.location.reload();
		}

		if(this.props.auth.show404 && this.props.location.pathname !== '/404'){
			this.props.history.replace('/404');
			window.location.reload();
		}
	}

	render(): Node {

		const { signUpModalShowed, loginModalShowed, adminModalShowed } = this.props.modal;

		const isLoginSignUp = (signUpModalShowed || loginModalShowed);

		return (
			<Suspense fallback={<Loader />}>
				{isLoginSignUp && <LoginSignUpModal />}
				{adminModalShowed && <AdminModal/>}
				<Switch>
					<PageRoute
						exact
						path="/"
						render={(props) => <Home {...props} />}
					/>
					<Redirect from="/index.html" to="/" />
					<AuthRoute
						path="/message"
						render={(props) => <Message {...props} />}
					/>
					<AuthRoute
						path="/submit"
						render={(props) => <Submit {...props} />}
					/>
					<AuthRoute
						path="/b/:id"
						render={(props) => <BoardPage {...props} />}
					/>
					<PageRoute
						path="/p/:id"
						render={(props) => <Post {...props} />}
					/>
					<AuthRoute
						path="/u/:id"
						render={(props) => <User {...props} />}
					/>
					<AuthRoute
						path="/settings"
						render={(props) => <Settings {...props} />}
					/>
					<PageRoute path="/about" render={(props) => <About {...props} />} />
					<PageRoute render={(props) => <NoMatch {...props} />} />
				</Switch>
				<FooterPage/>
			</Suspense>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		i18n: state.i18n,
		modal: state.modal,
		version: state.version,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		correctReducerVersion: (version) => dispatch({type: CORRECT_REDUCERS_VERSION, payload: {version}}),
	};
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(MainPage));
