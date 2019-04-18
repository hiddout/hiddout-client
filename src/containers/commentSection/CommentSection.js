// @flow
import React from 'react';
import { Comment, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import type { PostState } from '../../reducers/post';
import { replyTo } from '../../actions/postAction';

type Props = {
	post: PostState,
	replyTo: (number) => void,
};

type State = {
};

class CommentSection extends React.Component<Props, State> {

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
											this.props.replyTo(i+1);
										}}
									>
										Reply
									</Comment.Action>
								</Comment.Actions>
							</Comment.Content>
						</Comment>
					))}
			</Comment.Group>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		post: state.post,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		replyTo: (level) => dispatch(replyTo(level)),
	};
};

export default connect(mapStateToProps,mapDispatchToProps)(CommentSection);
