// @flow
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container, Segment, Header, Divider, Input } from 'semantic-ui-react';

import SubmitForm from '../../component/submitForm/SubmitForm';
import BoardSelector from '../../component/boardSelector/BoardSelector';

const NavigationBar = React.lazy(() =>
	import('../../containers/navigationBar/NavigationBar'),
);

import type { Node } from 'react';
import { submitPost } from '../../actions/submitActions';
import type { AuthState } from '../../reducers/auth';
import type { SubmitState } from '../../reducers/submit';

type Props = {
	auth: AuthState,
	submit: SubmitState,
	history: Object,
	submitPost: (Object) => any,
};

type State = {
	submitting: boolean,
	title: string,
	content: string,
	boardSelected: string,
};

class Submit extends React.Component<Props, State> {
	state = {
		submitting: false,
		title: '',
		content: '',
		boardSelected: 'life',
	};

	onBoardSelect(value) {
		this.setState({ boardSelected: value });
	}

	onSubmitPost() {
		this.setState({ submitting: true });

		const postData = {
			title: this.state.title,
			content: this.state.content,
			board: this.state.boardSelected,
			userId: this.props.auth.user,
		};
		this.props.submitPost(postData);
	}

	componentDidUpdate(prevProps) {
		const cratedPostId = this.props.submit.cratedPostId;

		if (cratedPostId !== prevProps.submit.cratedPostId) {
			this.props.history.replace(
				`/p/${hiddoutViewer.encodeId(cratedPostId)}`,
			);
		}
	}

	render(): Node {
		return (
			<React.Fragment>
				<NavigationBar />
				<Container textAlign={'left'} style={{ marginTop: '7em' }}>
					<Segment>
						<BoardSelector
							onSelectChange={this.onBoardSelect.bind(this)}
						/>
						<Header floated={'right'}>Submit a post</Header>
						<Divider clearing />
						<Input
							placeholder="Title"
							size={'large'}
							onChange={(e, data) =>
								this.setState({ title: data.value })
							}
						/>
						<Divider hidden />
						<SubmitForm
							disabled={this.state.submitting}
							ButtonText={'Submit'}
							onClick={this.onSubmitPost.bind(this)}
							onChange={(e, data) =>
								this.setState({ content: data.value })
							}
						/>
					</Segment>
				</Container>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		submit: state.submit,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		submitPost: (post) => {
			dispatch(submitPost(post));
		},
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps,
	)(Submit),
);
