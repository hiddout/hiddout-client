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

import type { Node } from 'react';

type Props = {
	modal: Object,
	closeLoginModal: () => void,
};

type State = {};

class LoginModal extends React.Component<Props, State> {
	close = () => {
		this.props.closeLoginModal();
	};

	onLoginClick = () => {
		const user = document.getElementById('usernameInput').value,
			password = document.getElementById('passwordInput').value;

		const md = forge.md.sha256.create();
		md.update(password);

		this.props.userLogin({
			user,
			pwh: md.digest().toHex(),
		});
	};

	render(): Node {
		const { loginModalShowed } = this.props.modal;
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

const loginModal = connect(
	mapStateToProps,
	mapDispatchToProps,
)(LoginModal);

export { loginModal as LoginModal };
