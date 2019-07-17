// @flow
import React from 'react';
import { connect } from 'react-redux';
import {
	Button,
	Modal,
	Form,
	Icon,
	Input,
	Label,
	Message,
	Container,
	Divider,
} from 'semantic-ui-react';
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
import { LOGIN } from '../../actions/actionType';

type Props = {
	auth: AuthState,
	modal: ModalState,
	location: Object,
	closeLoginModal: () => void,
	openSignUpModal: () => void,
	userLogin: (...arg: any) => any,
	openLoginMdoal: () => void,
	closeSignUpModal: () => void,
	userSignUp: (...arg: any) => any,
};

type State = {
	userNameViolation: boolean,
	passwordViolation: boolean,
	passwordVerification: boolean,
	userOrPwdNotCorrect: boolean,
	signUpInfoViolation: boolean,
	redirectToReferrer: boolean,
	user: string,
	password: string,
	passwordVerify:string,
};

class LoginSignUpModal extends React.Component<Props, State> {
	state = {
		redirectToReferrer: false,
		user: '',
		password: '',
		passwordVerify: '',
		userNameViolation: false,
		passwordViolation: false,
		userOrPwdNotCorrect: false,
		signUpInfoViolation: false,
		passwordVerification: true,
	};

	close() {
		this.props.closeLoginModal();
		this.props.closeSignUpModal();
	}

	async onLoginSignInClick() {
		const { userLogin, userSignUp } = this.props;

		const md: Object = forge.md.sha256.create();
		md.update(this.state.password);

		const userData = {
			user: this.state.user,
			pwh: md.digest().toHex(),
		};

		if (this.props.modal.loginModalShowed) {
			const loginRes = await userLogin(userData);

			if (loginRes && loginRes.type === LOGIN) {
				this.setState({ redirectToReferrer: true });
			} else {
				this.setState({ userOrPwdNotCorrect: true });
			}
		} else {
			if (!this.state.user.length) {
				this.setState({ userNameViolation: true });
				return;
			} else if (!this.state.password.length) {
				this.setState({ passwordViolation: true });
				return;
			} else if(this.state.password !== this.state.passwordVerify){
				this.setState({passwordVerification: false});
				return;
			}

			const {
				userNameViolation,
				passwordViolation,
				passwordVerification,
			} = this.state;

			if (
				userNameViolation ||
				passwordViolation ||
				!passwordVerification
			) {
				return;
			}

			const signUpRes = await userSignUp(userData);

			if (signUpRes) {
				return;
			}

			this.setState({ signUpInfoViolation: true });
		}
	}

	onActionButtonClick() {
		const { openSignUpModal, openLoginMdoal } = this.props;

		if (this.props.modal.loginModalShowed) {
			openSignUpModal();
		} else {
			openLoginMdoal();
		}
	}

	onUserNameChange(e, { value }) {
		if (/[^a-zA-Z0-9_]/.test(value) || !value.length || value.length > 36) {
			this.setState({ userNameViolation: true });
			return;
		}

		this.setState({ user: value, userNameViolation: false });
	}

	onPasswordChange(e, { value }) {
		if (
			!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/.test(
				value,
			)
		) {
			this.setState({ passwordViolation: true });
			return;
		}

		this.setState({ password: value, passwordViolation: false });
	}

	onVerifyPasswordChange(e, { value }) {
		if (value !== this.state.password) {
			this.setState({ passwordVerify: value, passwordVerification: false });
			return;
		}

		this.setState({ passwordVerify: value, passwordVerification: true });
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
				size={'tiny'}
				open={loginModalShowed || signUpModalShowed}
				closeOnDimmerClick={false}
				onClose={this.close.bind(this)}
				closeIcon
			>
				<Modal.Header>
					{loginModalShowed ? t('loginBtn') : t('signupBtn')}
				</Modal.Header>
				<Modal.Content>
					{loginModalShowed && this.state.userOrPwdNotCorrect && (
						<Message color="red">
							{t('userOrPwdNotCorrect')}
						</Message>
					)}
					{!loginModalShowed && this.state.signUpInfoViolation && (
						<Message color="red">
							{t('signUpInfoViolation')}
						</Message>
					)}
					<Form>
						<Form.Field>
							<label>{t('USERNAME')}</label>
							<Input
								placeholder={t('USERNAME')}
								onChange={this.onUserNameChange.bind(this)}
							/>
							{!loginModalShowed && this.state.userNameViolation && (
								<Label basic color="red" pointing>
									{t('userNameViolation')}
								</Label>
							)}
						</Form.Field>
						<Form.Field>
							<label>{t('PASSWORD')}</label>
							<Input
								placeholder={t('PASSWORD')}
								type={'password'}
								onChange={this.onPasswordChange.bind(this)}
							/>
							{!loginModalShowed && this.state.passwordViolation && (
								<Label basic color="red" pointing>
									{t('passwordViolation')}
								</Label>
							)}
						</Form.Field>
						{!loginModalShowed && (
							<Form.Field>
								<label>{t('VERIFY PASSWORD')}</label>
								<Input
									placeholder={t('VERIFY PASSWORD')}
									type={'password'}
									onChange={this.onVerifyPasswordChange.bind(this)}
								/>
								{!this.state.passwordVerification && (
									<Label
										basic color="red"
										pointing>
										{t('passwordVerification')}
										</Label>
								)}
							</Form.Field>
						)}
						<Button
							type={'submit'}
							color={loginModalShowed ? 'blue' : 'green'}
							onClick={this.onLoginSignInClick.bind(this)}
						>
							{loginModalShowed ? t('loginBtn') : t('signupBtn')}
						</Button>
						{!loginModalShowed &&
							<Container>
								<Divider />
								{t('By signing up, you agree to our Terms and that you have read our Privacy Policy and Content Policy')}{' '}
								<a
									target="_blank"
									rel="noopener noreferrer"
									href="https://github.com/hiddout/hiddout-policies/blob/master/README.md"
								>{t('See Here')}</a>
							</Container>
						}
					</Form>
				</Modal.Content>
				<Modal.Actions>
					{loginModalShowed
						? t('new to hiddout?')
						: t('already have hiddout account?')}
					<Button
						color={loginModalShowed ? 'green' : 'blue'}
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
		userLogin: (userData) => dispatch(userLogin(userData)),
		openLoginMdoal: () => {
			dispatch(openLoginModal());
		},
		closeSignUpModal: () => {
			dispatch(closeSignUpModal());
		},
		userSignUp: (userData) => dispatch(userSignUp(userData)),
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps,
	)(LoginSignUpModal),
);
