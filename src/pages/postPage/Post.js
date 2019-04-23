// @flow
import React from 'react';
import type { Node } from 'react';
import {
	Button,
	Comment,
	Container,
	Divider,
	Header,
	Segment,
	Placeholder,
	Popup,
} from 'semantic-ui-react';
const ReactMarkdown = React.lazy(() => import('react-markdown'));
import { getComments, getPost } from '../../actions/postAction';
import { submitComment } from '../../actions/submitActions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import SubmitForm from '../../component/submitForm/SubmitForm';
import { COMMENT_SUBMITTED } from '../../actions/actionType';

import type { PostState } from '../../reducers/post';
import type { AuthState } from '../../reducers/auth';

const NavigationBar = React.lazy(() =>
	import('../../containers/navigationBar/NavigationBar'),
);
const CommentSection = React.lazy(() =>
	import('../../containers/commentSection/CommentSection'),
);

type Props = {
	auth: AuthState,
	post: PostState,
	getPost: (string) => any,
	getComments: (string) => any,
	submitComment: (Object) => any,
	match: { params: { id: string } },
};

type State = {
	submitting: boolean,
};

class Post extends React.Component<Props, State> {

	state = {
		submitting: false,
	};

	componentDidMount() {
		this.props.getPost(this.props.match.params.id);
	}

	getPlaceholderContent(): Node {
		const placeholderContent = (
			<Placeholder>
				<Placeholder.Paragraph>
					<Placeholder.Line />
					<Placeholder.Line />
					<Placeholder.Line />
					<Placeholder.Line />
					<Placeholder.Line />
				</Placeholder.Paragraph>
				<Placeholder.Paragraph>
					<Placeholder.Line />
					<Placeholder.Line />
					<Placeholder.Line />
				</Placeholder.Paragraph>
			</Placeholder>
		);

		return (
			<React.Fragment>
				{placeholderContent}

				<Comment.Group>
					<Header as="h3" dividing>
						Comments
					</Header>

					{placeholderContent}
				</Comment.Group>
			</React.Fragment>
		);
	}

	getContent(): Node {
		const { currentPost, comments, replyTo } = this.props.post;

		if (!currentPost) {
			return this.getPlaceholderContent();
		}

		const markdown = currentPost.content;
		const MarkdownComponent: any = ReactMarkdown;

		return (
			<React.Fragment>
				<Container textAlign="left">
					b/{currentPost.board}. Post by {currentPost.userId}
				</Container>
				<Header as="h1">{currentPost.title}</Header>
				<Container>
					<Container
						textAlign="justified"
						style={{ overflowX: 'auto' }}
					>
						<MarkdownComponent source={markdown} />
					</Container>

					<Divider hidden />

					<Popup
						trigger={
							<Button
								color="green"
								icon="arrow alternate circle up outline"
								label={{
									basic: true,
									color: 'green',
									pointing: 'left',
									content: currentPost.up,
								}}
							/>
						}
						content="up"
					/>

					<Popup
						trigger={
							<Button
								color="red"
								icon="arrow alternate circle down outline"
								label={{
									basic: true,
									color: 'red',
									pointing: 'left',
									content: currentPost.down,
								}}
							/>
						}
						content="down"
					/>

					<Popup
						trigger={
							<Button
								color="black"
								icon="child"
								label={{
									basic: true,
									color: 'black',
									pointing: 'left',
									content: currentPost.lol,
								}}
							/>
						}
						content="lol"
					/>

					<Divider />

					{!!comments.length && !!replyTo && (
						<div>re: {comments[replyTo - 1].content}</div>
					)}

					{this.props.auth.isAuth && (
						<SubmitForm
							disabled={this.state.submitting}
							ButtonText={'Reply'}
							onClick={(formData) => {
								const commentData = {
									replyTo: 0,
									content: formData,
									userId: 'nobody',
									postId: this.props.match.params.id,
								};

								this.setState({submitting: true},() => {
									this.props
										.submitComment(commentData)
										.then((response: Object) => {
											if (
												response.type === COMMENT_SUBMITTED
											) {
												this.props.getComments(this.props.match.params.id);
												this.setState({submitting: false},()=>{

												});
											}
										});
								});


							}}
						/>
					)}

					<CommentSection />
				</Container>
			</React.Fragment>
		);
	}

	render(): Node {
		return (
			<React.Fragment>
				<NavigationBar showBackBtn={true} />
				<Container textAlign={'left'} style={{ marginTop: '7em' }}>
					<Segment>{this.getContent()}</Segment>
				</Container>
			</React.Fragment>
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
		submitComment: (commentData) => dispatch(submitComment(commentData)),
		getPost: (id) => {
			dispatch(getPost(id));
		},
		getComments: (id) => dispatch(getComments(id)),
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps,
	)(Post),
);
