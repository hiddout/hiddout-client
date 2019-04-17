// @flow
import React from 'react';
import { Comment, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import type { PostState } from '../../reducers/post';

const SubmitForm = React.lazy(() =>
	import('../../component/submitForm/SubmitForm'),
);

type Props = {
	post: PostState,
};

type State = {
	isReplying: boolean,
};

class CommentSection extends React.Component<Props, State> {
	state = { isReplying: false };

	render() {
		const { comments } = this.props.post;

		return (
			<Comment.Group>
				<Header as="h3" dividing>
					Comments
				</Header>

				{!!comments.length &&
					comments.map((c, i) => (
						<Comment key={i}>
							<Comment.Content>
								<Comment.Author as="a">
									{c.userId}
								</Comment.Author>
								<Comment.Metadata>
									<div>{c.createTime}</div>
								</Comment.Metadata>
								<Comment.Text>{c.content}</Comment.Text>
								<Comment.Actions>
									<Comment.Action
										onClick={() => {
											this.setState({
												isReplying: !this.state
													.isReplying,
											});
										}}
									>
										Reply
									</Comment.Action>
								</Comment.Actions>
							</Comment.Content>
						</Comment>
					))}

				{this.state.isReplying && (
					<SubmitForm
						ButtonText={'Reply'}
						onClick={() => {}}
						onChange={() => {}}
						disabled={false}
					/>
				)}
			</Comment.Group>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		post: state.post,
	};
};

export default connect(mapStateToProps)(CommentSection);
