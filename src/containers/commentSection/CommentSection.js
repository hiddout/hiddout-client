// @flow
import React from 'react';
import { Comment, Header, Message, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { t } from 'i18next';
import { replyTo } from '../../actions/postAction';
import type { PostState } from '../../reducers/post';
import type { AuthState } from '../../reducers/auth';
import { getHiddoutTime } from '../../utils/commonUtil';

type Props = {
	auth: AuthState,
	post: PostState,
	replyTo: (number) => void,
};

type State = {};

class CommentSection extends React.Component<Props, State> {
	render() {
		const { comments, currentPost } = this.props.post;

		return (
			<Comment.Group>
				<Header as="h3" dividing>
					{`${t('comments')} (${(!comments || !comments.length)? 0: comments.length})`}
				</Header>

				{comments &&
					comments.map((c, i) => (
						<Comment key={i}>
							<Comment.Content>
								{c.userId !=='N/A' &&
								<Comment.Author as="a" href={`/u/${hiddoutViewer.encodeId(c.userId)}`}>
									{`@${c.userId}`}
								</Comment.Author>}
								<Comment.Metadata>
									<div>{getHiddoutTime(c.createTime)}</div>
								</Comment.Metadata>
								{!!c.replyTo && (
									<Message
										floating
										color="yellow"
										content={`@${
											comments[c.replyTo - 1].userId
										} - ${comments[c.replyTo - 1].content}`}
									/>
								)}
								<Comment.Text>{c.content}</Comment.Text>
								{this.props.auth.isAuth && (
									<Comment.Actions>
										<Comment.Action
											onClick={() => {
												if (!this.props.auth.isAuth || (currentPost && currentPost.isLocked)) {
													return;
												}
												this.props.replyTo(i + 1);
												window.scrollTo(0, 0);
											}}
										>
											{t('reply')}
										</Comment.Action>
										<Comment.Action>
											{t('up')}
										</Comment.Action>
										<Comment.Action>
											{t('down')}
										</Comment.Action>
										<Comment.Action>
											{t('lol')}
										</Comment.Action>
										<Comment.Action>
											{t('reward')}
										</Comment.Action>
									</Comment.Actions>
								)}
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

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CommentSection);
