// @flow
import React from 'react';
import { t } from 'i18next';
import { Image, Menu, Button, Icon, Popup, Dropdown } from 'semantic-ui-react';
import { NavLink, withRouter } from 'react-router-dom';
import {
	openLoginModal,
	openSignUpModal,
	logout,
} from '../../actions/loginAction';
import { connect } from 'react-redux';
import type { AuthState } from '../../reducers/auth';

import BoardSelector from '../../component/boardSelector/BoardSelector';
import type { AccountState } from '../../reducers/account';

const Nav = (props) => <NavLink exact {...props} activeClassName="active" />;

type Props = {
	auth: AuthState,
	account: AccountState,
	history: Object,
	showBackBtn?: boolean,
	boardValue?: string,
	logout: (...args: any) => any,
	openLoginModal: (...args: any) => any,
	openSignUpModal: (...args: any) => any,
};

type State = {};

const ACCOUNT = 1;
const SETTINGS = 2;
const LOGOUT = 3;

class NavigationBar extends React.Component<Props, State> {

	onDropdownClick(e, { value }) {
		switch (value) {
			case ACCOUNT:
				this.props.history.push(`/u/${hiddoutViewer.encodeId(this.props.account.user)}`);
				break;
			case SETTINGS:
				this.props.history.push('/settings');
				break;
			case LOGOUT:
				this.props.logout();
				break;
			default:
				break;
		}
	}

	renderRightMenu() {
		const { isAuth } = this.props.auth;

		let rightMenu = null;

		const createPostBtn = (
			<Menu.Item as={Nav} to="/submit">
				<Popup
					trigger={<Icon name="signup" />}
					content={t('create a post')}
				/>
			</Menu.Item>
		);

		if (isAuth) {
			const trigger = (
				<span>
					<Image avatar src={'/public/static/Hiddout.png'} />{' '}
					{this.props.account.user}
				</span>
			);
			const options = [
				{
					key: 'userId',
					text: (
						<span style={{ color: 'gray' }}>
							{t('signed in as')}{' '}
							<strong style={{ color: 'green' }}>
								{this.props.account.user}
							</strong>
						</span>
					),
					value: 0,
				},
				{
					key: 'visitUser',
					text: t('accountBtn'),
					icon: 'visitUser',
					value: ACCOUNT,
				},
				{
					key: 'settings',
					text: t('settingsBtn'),
					icon: 'settings',
					value: SETTINGS,
				},
				{
					key: 'sign-out',
					text: t('signOutBtn'),
					icon: 'sign out',
					value: LOGOUT,
				},
			];

			rightMenu = (
				<React.Fragment>
					<Menu.Item>
						<Dropdown
							onChange={this.onDropdownClick.bind(this)}
							trigger={trigger}
							options={options}
							icon={null}
						/>
					</Menu.Item>

					{createPostBtn}
				</React.Fragment>
			);
		} else {
			rightMenu = (
				<React.Fragment>
					<Menu.Item>
						<Button
							content={t('loginBtn')}
							primary
							onClick={() => this.props.openLoginModal()}
						/>
					</Menu.Item>
					<Menu.Item>
						<Button
							content={t('signupBtn')}
							positive
							onClick={() => this.props.openSignUpModal()}
						/>
					</Menu.Item>

					{createPostBtn}
				</React.Fragment>
			);
		}

		return rightMenu;
	}

	render() {
		const { showBackBtn } = this.props;
		const { isAuth } = this.props.auth;
		return (
			<Menu fixed="top" style={{backgroundColor:'ghostwhite'}}>
				{!isAuth && (
					<Menu.Item>
						<Image src="/public/static/Hiddout.png" avatar />
					</Menu.Item>
				)}

				{!isAuth && <Menu.Item name={t('homeMenu')} as={Nav} to="/" />}
				{isAuth && !showBackBtn && (
					<Menu.Item>
						<BoardSelector
							onSelectChange={(value) => {
								if (value === 'home') {
									this.props.history.push('/');
								} else {
									this.props.history.push(`/b/${value}`);
								}
							}}
							value={this.props.boardValue}
						/>
					</Menu.Item>
				)}

				{isAuth && showBackBtn && (
					<Menu.Item>
						<Button
							icon
							color="blue"
							onClick={() => {
								this.props.history.goBack();
							}}
						>
							<Icon name="left arrow" />
						</Button>
					</Menu.Item>
				)}

				<Menu.Item name={t('messagesMenu')} as={Nav} to="/message" />
				<Menu.Menu position="right">{this.renderRightMenu()}</Menu.Menu>
			</Menu>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		account: state.account,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		logout: () => {
			dispatch(logout());
		},
		openLoginModal: () => {
			dispatch(openLoginModal());
		},
		openSignUpModal: () => {
			dispatch(openSignUpModal());
		},
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps,
	)(NavigationBar),
);
