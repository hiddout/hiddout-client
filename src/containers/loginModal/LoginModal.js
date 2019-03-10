// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Form, Icon } from 'semantic-ui-react';
import {t} from "i18next";

import { closeLoginModal } from '../../actions/loginAction';

import type { Node } from 'react';

type Props = {
	login: Object,
	closeLoginModal:()=> void,
};

type State = {};

class LoginModal extends React.Component<Props, State> {

	close = () => {
		this.props.closeLoginModal();
	};

	render() {

		const {modalVisibility} = this.props.login;
		return (
			<Modal
				open={modalVisibility}
				closeOnDimmerClick={false}
				onClose={this.close}
				closeIcon
			>
				<Modal.Header>{t('loginBtn')}</Modal.Header>
				<Modal.Content>
					<Form>
						<Form.Field>
							<label>USERNAME</label>
							<input placeholder='USERNAME' />
						</Form.Field>
						<Form.Field>
							<label>PASSWORD</label>
							<input placeholder='PASSWORD' type={'password'}/>
						</Form.Field>
						<Button type={'submit'} primary>{t('loginBtn')}</Button>
					</Form>
				</Modal.Content>
				<Modal.Actions>
					{t('new to hiddout?')}
					<Button positive icon >
						{t('signupBtn')}<Icon name='right chevron' />
					</Button>
				</Modal.Actions>
			</Modal>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		login: state.login,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		closeLoginModal: () => {
			dispatch(closeLoginModal());
		},
	};
};

const loginModal = connect(
	mapStateToProps,
	mapDispatchToProps,
)(LoginModal);

export { loginModal as LoginModal };
