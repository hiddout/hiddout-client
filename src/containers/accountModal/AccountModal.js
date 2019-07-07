// @flow
import React from 'react';
import { connect } from 'react-redux';
import {
	Button,
	Modal,
	Form,
	Input,
} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import type { ModalState } from '../../reducers/modal';
import { closeAccountModal, deleteAccount } from '../../actions/accountAction';
import { t } from 'i18next';
import { ACCOUNT_DELETED } from '../../actions/actionType';
import { logout } from '../../actions/loginAction';

type Props = {
	modal: ModalState,
	closeModal: () => void,
	logout: () => void,
	deleteAccount: (Object) => any,
};

type State = {
	user: string,
	password: string,
};

class AccountModal extends React.Component<Props, State> {
	state = {
		user: '',
		password: '',
	};

	onUserNameChange(e, { value }) {
		this.setState({ user: value });
	}

	onPasswordChange(e, { value }) {
		this.setState({ password: value });
	}

	close() {
		this.props.closeModal();
	}

	async onClickDelete() {
		const md: Object = forge.md.sha256.create();
		md.update(this.state.password);

		const userData = {
			user: this.state.user,
			pwh: md.digest().toHex(),
		};
		const res = await this.props.deleteAccount(userData);
		if(res.type === ACCOUNT_DELETED){
			alert('good bye');
			this.props.logout();
		}
	}

	render() {
		return (
			<Modal
				size={'mini'}
				closeOnDimmerClick={false}
				open={this.props.modal.accountModalShowed}
				onClose={this.close.bind(this)}
			>
				<Modal.Header>Delete Your Account</Modal.Header>
				<Modal.Content>
					<p>
						Are you sure you want to delete your account? Input your
						username and password to confirm.{' '}
					</p>
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
					</Form>
				</Modal.Content>
				<Modal.Actions>
					<Button negative onClick={this.close.bind(this)}>
						No
					</Button>
					<Button
						icon="checkmark"
						labelPosition="right"
						content="Yes"
						onClick={this.onClickDelete.bind(this)}
					/>
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
		logout: () => dispatch(logout()),
		deleteAccount: (account) => dispatch(deleteAccount(account)),
		closeModal: () => dispatch(closeAccountModal()),
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps,
	)(AccountModal),
);
