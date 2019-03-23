// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Form, Icon } from 'semantic-ui-react';
import { t } from 'i18next';

import {
	closeSignUpModal,
	openLoginModal,
	userSignUp,
} from '../../actions/loginAction';

import type { Node } from 'react';

type Props = {
	modal: Object,
	closeSignUpModal: () => void,
};

type State = {};

class SignUpModal extends React.Component<Props, State> {
	close = () => {
		this.props.closeSignUpModal();
	};

	onSignUpClick = () => {
		const user = document.getElementById('signUp_usernameInput').value,
			password = document.getElementById('signUp_passwordInput').value;

		const md = forge.md.sha256.create();
		md.update(password);

		this.props.userSignUp({
			user,
			pwh: md.digest().toHex(),
		});
	};

	render(): Node {
		const { signUpModalShowed } = this.props.modal;
		return (
			<Modal
				open={signUpModalShowed}
				closeOnDimmerClick={false}
				onClose={this.close}
				closeIcon
			>
				<Modal.Header>{t('signupBtn')}</Modal.Header>
				<Modal.Content>
					<Form>
						<Form.Field>
							<label>{t('USERNAME')}</label>
							<input
								id={'signUp_usernameInput'}
								placeholder={t('USERNAME')}
							/>
						</Form.Field>
						<Form.Field>
							<label>{t('PASSWORD')}</label>
							<input
								id={'signUp_passwordInput'}
								placeholder={t('PASSWORD')}
								type={'password'}
							/>
						</Form.Field>
						<Button
							type={'submit'}
							primary
							onClick={this.onSignUpClick}
						>
							{t('signupBtn')}
						</Button>
					</Form>
				</Modal.Content>
				<Modal.Actions>
					{t('already have hiddout account?')}
					<Button
						positive
						icon
						onClick={() => this.props.openLoginMdoal()}
					>
						{t('loginBtn')}
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

const signUpModal = connect(
	mapStateToProps,
	mapDispatchToProps,
)(SignUpModal);

export { signUpModal as SignUpModal };
