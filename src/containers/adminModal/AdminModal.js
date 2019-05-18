import React from 'react';
import { connect } from 'react-redux';
import {
	Button,
	Modal,
	Header,
	Icon,
} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

import type { AuthState } from '../../reducers/auth';
import type { PostState } from '../../reducers/post';
import type { ModalState } from '../../reducers/modal';
import { closeAdminModal } from '../../actions/adminAction';

type Props = {
	auth: AuthState,
	post: PostState,
	modal: ModalState,
};

type State = {};

class AdminModal extends React.Component<Props, State> {

	render() {

		const {adminModalShowed} = this.props.modal;

		return (
			<Modal
				closeOnDimmerClick={false}
				open={adminModalShowed}
				basic
				size='small'
			>
				<Header icon='browser' content='Cookies policy' />
				<Modal.Content>
					<h3>Admin Modal</h3>
				</Modal.Content>
				<Modal.Actions>
					<Button color='green' onClick={() => {this.props.closeAdminModal();}} inverted>
						<Icon name='checkmark' /> Got it
					</Button>
				</Modal.Actions>
			</Modal>
		);
	}
}


const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		post: state.post,
		modal: state.modal,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		closeAdminModal: () => dispatch(closeAdminModal()),
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps,
	)(AdminModal),
);
