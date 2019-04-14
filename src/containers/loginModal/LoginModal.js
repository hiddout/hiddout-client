// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Form, Icon } from 'semantic-ui-react';
import { t } from 'i18next';

import {
	closeLoginModal,
	openSignUpModal,
	userLogin,
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
};

type State = {
	redirectToReferrer: boolean,
};

class LoginModal extends React.Component<Props, State> {
	state = { redirectToReferrer: false };

	close = () => {
		this.props.closeLoginModal();
	};

	onLoginClick = () => {
		const usernameInput: any = document.getElementById('usernameInput'),
			passwordInput: any = document.getElementById('passwordInput');

		const user = usernameInput.value,
			password = passwordInput.value;

		const md: Object = forge.md.sha256.create();
		md.update(password);

		this.props.userLogin({
			user,
			pwh: md.digest().toHex(),
		});

		this.setState({ redirectToReferrer: true });
	};

	render(): Node {
		const { loginModalShowed } = this.props.modal;

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
				open={loginModalShowed}
				closeOnDimmerClick={false}
				onClose={this.close}
				closeIcon
			>
				<Modal.Header>{t('loginBtn')}</Modal.Header>
				<Modal.Content>
					<Form>
						<Form.Field>
							<label>{t('USERNAME')}</label>
							<input
								id={'usernameInput'}
								placeholder={t('USERNAME')}
							/>
						</Form.Field>
						<Form.Field>
							<label>{t('PASSWORD')}</label>
							<input
								id={'passwordInput'}
								placeholder={t('PASSWORD')}
								type={'password'}
							/>
						</Form.Field>
						<Button
							type={'submit'}
							primary
							onClick={this.onLoginClick}
						>
							{t('loginBtn')}
						</Button>
					</Form>
				</Modal.Content>
				<Modal.Actions>
					{t('new to hiddout?')}
					<Button
						positive
						icon
						onClick={() => this.props.openSignUpModal()}
					>
						{t('signupBtn')}
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
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps,
	)(LoginModal),
);
