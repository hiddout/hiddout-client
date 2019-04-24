// @flow
import React from 'react';
import { Comment, Header, Message, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { replyTo } from '../../actions/postAction';
import type { PostState } from '../../reducers/post';
import type { AuthState } from '../../reducers/auth';

type Props = {
	auth: AuthState,
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
								{!!c.replyTo && <Message floating color='yellow' content={`re: @${comments[c.replyTo - 1].userId} - ${comments[c.replyTo - 1].content}`} />}
								<Comment.Text>{c.content}</Comment.Text>
								{this.props.auth.isAuth && <Comment.Actions>
									<Comment.Action
										onClick={() => {
											if(!this.props.auth.isAuth){
												return;
											}
											this.props.replyTo(i+1);
										}}
									>
										Reply
									</Comment.Action>
								</Comment.Actions>}
							</Comment.Content>
							<Divider />
						</Comment>
					))}
			</Comment.Group>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		post: state.post,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		replyTo: (level) => dispatch(replyTo(level)),
	};
};

export default connect(mapStateToProps,mapDispatchToProps)(CommentSection);
