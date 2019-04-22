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
import { changeLanguage } from '../../actions/i18nAction';
import { connect } from 'react-redux';
import type { AuthState } from '../../reducers/auth';

import BoardSelector from '../../component/boardSelector/BoardSelector';

const Nav = (props) => <NavLink exact {...props} activeClassName="active" />;

type Props = {
	auth: AuthState,
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
		// const { language } = this.props.i18n;
		// const nextLanguage = language === 'en' ? 'zh' : 'en';
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
					{this.props.auth.user}
				</span>
			);
			const options = [
				{
					key: 'userId',
					text: (
						<span style={{ color: 'gray' }}>
							{t('signed in as')}{' '}
							<strong style={{ color: 'green' }}>
								{this.props.auth.user}
							</strong>
						</span>
					),
					value: 0,
				},
				{
					key: 'user',
					text: 'Account',
					icon: 'user',
					value: ACCOUNT,
				},
				{
					key: 'settings',
					text: 'Settings',
					icon: 'settings',
					value: SETTINGS,
				},
				{
					key: 'sign-out',
					text: 'Sign Out',
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
			<Menu fixed="top">
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
				<Menu.Item name={t('friendsMenu')} as={Nav} to="/friend" />
				<Menu.Menu position="right">{this.renderRightMenu()}</Menu.Menu>
			</Menu>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		i18n: state.i18n,
		auth: state.auth,
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
		changeLanguage: (lng) => {
			dispatch(changeLanguage(lng));
		},
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps,
	)(NavigationBar),
);
