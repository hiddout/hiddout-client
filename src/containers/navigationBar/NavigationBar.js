import React from 'react';
import { t } from 'i18next';
import './NavigationBar.css';
import { Image, Menu, Button, Flag, Popup, Label } from 'semantic-ui-react';
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
		const { language } = this.props.i18n;
		const nextLanguage = language === 'en' ? 'zh' : 'en';
		const { isAuth } = this.props.auth;

		let rightMenu = null;

		const languageBtn = (
			<Menu.Item>
				<Popup
					trigger={
						<Flag
							name={language === 'en' ? 'us' : 'hk'}
							style={{ cursor: 'pointer' }}
							onClick={() => {
								this.props.changeLanguage(nextLanguage);
							}}
						/>
					}
					content={t('change Language')}
				/>
			</Menu.Item>
		);

		if (isAuth) {

			const imageProps = {
				avatar: true,
				spaced: 'right',
				src: './public/static/Hiddout.png',
			};

			rightMenu = (
				<React.Fragment>
					<Menu.Item>
						<Label
							as={'a'}
							content={this.props.auth.user}
							image={imageProps}
							onClick={() => this.props.logout()}
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
			<Menu pointing secondary>
				<Menu.Item>
					<Image src="./public/static/Hiddout.png" avatar />
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
