// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Form, Icon, Input } from 'semantic-ui-react';
import { t } from 'i18next';

import {
	closeLoginModal,
	closeSignUpModal,
	openLoginModal,
	openSignUpModal,
	userLogin,
	userSignUp,
} from '../../actions/loginAction';

import { Redirect, withRouter } from 'react-router-dom';

import type { Node } from 'react';
import type { AuthState } from '../../reducers/auth';
import type { ModalState } from '../../reducers/modal';

type Props = {
	auth: AuthState,
	modal: ModalState,
	location: Object,
	closeLoginModal: () => void,
	openSignUpModal: () => void,
	userLogin: (...arg: any) => void,
	openLoginMdoal:() => void,
	closeSignUpModal: () => void,
	userSignUp: (...arg: any) => void,
};

type State = {
	redirectToReferrer: boolean,
	user: string,
	password: string,
};

class LoginSignInModal extends React.Component<Props, State> {
	state = { redirectToReferrer: false, user: '', password: '' };

	close() {
		this.props.closeLoginModal();
		this.props.closeSignUpModal();
	}

	onLoginSignInClick() {
		const { userLogin, userSignUp } = this.props;

		const md: Object = forge.md.sha256.create();
		md.update(this.state.password);

		const userData = {
			user: this.state.user,
			pwh: md.digest().toHex(),
		};

		if (this.props.modal.loginModalShowed) {
			userLogin(userData);
			this.setState({ redirectToReferrer: true });
		} else {
			userSignUp(userData);
		}
	}

	onActionButtonClick() {
		const {
			openSignUpModal,
			openLoginMdoal,
		} = this.props;

		if(this.props.modal.loginModalShowed){
			openSignUpModal();
		}else {
			openLoginMdoal();
		}
	}

	onUserNameChange(e, { value }) {
		this.setState({ user: value });
	}

	onPasswordChange(e, { value }) {
		this.setState({ password: value });
	}

	render(): Node {
		const { loginModalShowed, signUpModalShowed } = this.props.modal;

		let { from } = this.props.location.state || {
			from: { pathname: this.props.location.pathname },
		};

		let { redirectToReferrer } = this.state;

		if (redirectToReferrer && this.props.auth.isAuth) {
			this.props.closeLoginModal();
			return <Redirect to={from} />;
		}

		return (
			<Modal
				open={loginModalShowed || signUpModalShowed}
				closeOnDimmerClick={false}
				onClose={this.close.bind(this)}
				closeIcon
			>
				<Modal.Header>
					{loginModalShowed ? t('loginBtn') : t('signupBtn')}
				</Modal.Header>
				<Modal.Content>
					<Form>
						<Form.Field>
							<label>{t('USERNAME')}</label>
							<Input
								placeholder={t('USERNAME')}
								onChange={this.onUserNameChange.bind(this)}
							/>
						</Form.Field>
						<Form.Field>
							<label>{t('PASSWORD')}</label>
							<Input
								placeholder={t('PASSWORD')}
								type={'password'}
								onChange={this.onPasswordChange.bind(this)}
							/>
						</Form.Field>
						<Button
							type={'submit'}
							primary
							onClick={this.onLoginSignInClick.bind(this)}
						>
							{loginModalShowed ? t('loginBtn') : t('signupBtn')}
						</Button>
					</Form>
				</Modal.Content>
				<Modal.Actions>
					{loginModalShowed
						? t('new to hiddout?')
						: t('already have hiddout account?')}
					<Button
						positive
						icon
						onClick={this.onActionButtonClick.bind(this)}
					>
						{loginModalShowed ? t('signupBtn') : t('loginBtn')}
						<Icon name="right chevron" />
					</Button>
				</Modal.Actions>
			</Modal>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		modal: state.modal,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		openSignUpModal: () => {
			dispatch(openSignUpModal());
		},
		closeLoginModal: () => {
			dispatch(closeLoginModal());
		},
		userLogin: (userData) => {
			dispatch(userLogin(userData));
		},
		openLoginMdoal: () => {
			dispatch(openLoginModal());
		},
		closeSignUpModal: () => {
			dispatch(closeSignUpModal());
		},
		userSignUp: (userData) => {
			dispatch(userSignUp(userData));
		},
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps,
	)(LoginSignInModal),
);
