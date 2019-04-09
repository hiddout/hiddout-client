import React from 'react';
import { t } from 'i18next';
import './NavigationBar.css';
import {
	Image,
	Menu,
	Button,
	Icon,
	Popup,
	Dropdown,
} from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import {
	openLoginModal,
	openSignUpModal,
	logout,
} from '../../actions/loginAction';
import { changeLanguage } from '../../actions/i18nAction';
import { connect } from 'react-redux';

const Nav = (props) => <NavLink exact {...props} activeClassName="active" />;

class NavigationBar extends React.Component {
	renderRightMenu() {
		// const { language } = this.props.i18n;
		// const nextLanguage = language === 'en' ? 'zh' : 'en';
		const { isAuth } = this.props.auth;

		let rightMenu = null;

		const languageBtn = (
			<Menu.Item>
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
						<span>
							{t('signed in as')} <strong>{this.props.auth.user}</strong>
						</span>
					),
					disabled: true,
				},
				{ key: 'user', text: 'Account', icon: 'user', value: 0 },
				{
					key: 'settings',
					text: 'Settings',
					icon: 'settings',
					value: 1,
				},
				{
					key: 'sign-out',
					text: 'Sign Out',
					icon: 'sign out',
					value: 2,
				},
			];

			rightMenu = (
				<React.Fragment>
					<Menu.Item>
						<Dropdown
							onChange={(e, { value }) => console.log(value)}
							trigger={trigger}
							options={options}
							icon={null}
						/>
					</Menu.Item>

					{languageBtn}
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

					{languageBtn}
				</React.Fragment>
			);
		}

		return rightMenu;
	}

	render() {
		return (
			<Menu fixed="top">
				<Menu.Item>
					<Image src="/public/static/Hiddout.png" avatar />
				</Menu.Item>

				<Menu.Item name={t('homeMenu')} as={Nav} to="/" />
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

const navigationBar = connect(
	mapStateToProps,
	mapDispatchToProps,
)(NavigationBar);

export { navigationBar as NavigationBar };
