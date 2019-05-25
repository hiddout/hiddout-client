import React from 'react';
import { connect } from 'react-redux';
import {
	Button,
	Modal,
	Header,
	Icon,
	Form,
} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

import type { AuthState } from '../../reducers/auth';
import type { PostState } from '../../reducers/post';
import type { ModalState } from '../../reducers/modal';
import { closeAdminModal, lockPost } from '../../actions/adminAction';
import { REQUEST_DELETE_POST, REQUEST_LOCK_POST, REQUEST_MOVE_POST, LOCK_POST } from '../../actions/actionType';
import BoardSelector from '../../component/boardSelector/BoardSelector';

type Props = {
	auth: AuthState,
	post: PostState,
	modal: ModalState,
};

type State = {
	board: string,
	formData: string,
};

class AdminModal extends React.Component<Props, State> {

	state = {board: 'spam', formData: ''};

	onTextAreaChange(e: Object,data: Object){

		this.setState({formData: data.value});
	}

	onClickContinue(){

		const { currentPost } = this.props.post;

		switch (this.props.admin.currentAction) {
			case REQUEST_LOCK_POST:
				this.props.lockPost({postId: currentPost._id, reason: this.state.formData}).then((res?:Object) => {
					if (res.type === LOCK_POST) {
						this.props.closeAdminModal();
					}
				});
				break;
			default:
				this.props.closeAdminModal();
				break;
		}

	}

	render() {

		const {adminModalShowed} = this.props.modal;

		return (
			<Modal
				closeOnDimmerClick={false}
				open={adminModalShowed}
				basic
				size='small'
			>
				<Header icon='exclamation circle' content='Admin action' />
				<Modal.Content>
					{this.props.admin.currentAction === REQUEST_LOCK_POST && <Form>
						<Form.TextArea placeholder='Reason of locking' value={this.state.formData} onChange={this.onTextAreaChange.bind(this)} />
					</Form>}
					{this.props.admin.currentAction === REQUEST_DELETE_POST && <h3>Should you delete this post?</h3>}
					{this.props.admin.currentAction === REQUEST_MOVE_POST && <h3>Move to <BoardSelector
						onSelectChange={(value) => {
							this.setState({board: value});
						}}
						exclude={['home']}
						value={this.state.board}
					/>
					</h3>}
				</Modal.Content>
				<Modal.Actions>
					<Button color='gray' onClick={() => {this.props.closeAdminModal();}} inverted>
						<Icon name='undo alternate' /> Cancel
					</Button>
					<Button color='red' onClick={() => {
						this.onClickContinue();
					}} inverted>
						<Icon name='check circle' /> Continue
					</Button>
				</Modal.Actions>
			</Modal>
		);
	}
}


const mapStateToProps = (state) => {
	return {
		admin: state.admin,
		auth: state.auth,
		post: state.post,
		modal: state.modal,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		lockPost: (postData) => dispatch(lockPost(postData)),
		closeAdminModal: () => dispatch(closeAdminModal()),
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps,
	)(AdminModal),
);
