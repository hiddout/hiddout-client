// @flow
import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { Redirect, Switch, withRouter } from 'react-router-dom';
import { Container, Header, Loader, Segment, Grid, List } from 'semantic-ui-react';
import { resources } from '../i18n/resources';

import PageRoute from '../containers/pageRoute/PageRoute';
import AuthRoute from '../containers/authRoute/AuthRoute';

const Post = React.lazy(() => import('./postPage/Post'));
const Submit = React.lazy(() => import('./submitPage/Submit'));
const BoardPage = React.lazy( ()=>import('./boardPage/BoardPage') );

const Settings = React.lazy(() => import('./settingsPage/Settings'));

import LoginSignInModal from '../containers/loginSignInModal/LoginSignInModal';

import { About } from './aboutPage/About';

const Home = React.lazy(() => import('./homePage/Home'));
const User = React.lazy(() => import('./visitUserPage/VisitUser'));
const Message = React.lazy(() => import('./messagePage/Message'));
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
					<AuthRoute
						path="/message"
						render={(props) => <Message {...props} />}
					/>
					<AuthRoute
						path="/submit"
						render={(props) => <Submit {...props} />}
					/>
					<PageRoute
						path="/b/:id"
						render={(props) => <BoardPage {...props} />}
					/>
					<PageRoute
						path="/p/:id"
						render={(props) => <Post {...props} />}
					/>
					<PageRoute
						path="/u/:id"
						render={(props) => <User {...props} />}
					/>
					<AuthRoute
						path="/settings"
						render={(props) => <Settings {...props} />}
					/>
					<PageRoute path="/about" render={About} />
					<PageRoute render={(props) => <NoMatch {...props} />} />
				</Switch>
				<Segment inverted vertical style={{ padding: '5em 0em' }}>
					<Container>
						<Grid divided inverted stackable>
							<Grid.Row>
								<Grid.Column width={3}>
									<Header inverted as='h4' content='About' />
									<List link inverted>
										<List.Item as='a'>Sitemap</List.Item>
										<List.Item as='a'>Contact Us</List.Item>
										<List.Item as='a'>Religious Ceremonies</List.Item>
										<List.Item as='a'>Gazebo Plans</List.Item>
									</List>
								</Grid.Column>
								<Grid.Column width={3}>
									<Header inverted as='h4' content='Services' />
									<List link inverted>
										<List.Item as='a'>Banana Pre-Order</List.Item>
										<List.Item as='a'>DNA FAQ</List.Item>
										<List.Item as='a'>How To Access</List.Item>
										<List.Item as='a'>Favorite X-Men</List.Item>
									</List>
								</Grid.Column>
								<Grid.Column width={7}>
									<Header as='h4' inverted>
										Footer Header
									</Header>
									<p>
										Extra space for a call to action inside the footer that could help re-engage users.
									</p>
								</Grid.Column>
							</Grid.Row>
						</Grid>
					</Container>
				</Segment>
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

export default withRouter(connect(mapStateToProps)(MainPage));
