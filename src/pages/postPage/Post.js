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
	Message,
} from 'semantic-ui-react';

import { getComments, getPost } from '../../actions/postAction';
import { submitComment, submitReaction } from '../../actions/submitActions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import SubmitForm from '../../component/submitForm/SubmitForm';
import { COMMENT_SUBMITTED } from '../../actions/actionType';

const ReactMarkdown = React.lazy(() => import('react-markdown'));

import type { PostState } from '../../reducers/post';
import type { AuthState } from '../../reducers/auth';
import type { AccountState } from '../../reducers/account';

const NavigationBar = React.lazy(() =>
	import('../../containers/navigationBar/NavigationBar'),
);
const CommentSection = React.lazy(() =>
	import('../../containers/commentSection/CommentSection'),
);

type Props = {
	auth: AuthState,
	account: AccountState,
	post: PostState,
	getPost: (string) => any,
	getComments: (string) => any,
	submitComment: (Object) => any,
	submitReaction: (Object) => any,
	match: { params: { id: string } },
};

type State = {
	submitting: boolean,
};

const REACT_UP = 'up';
const REACT_DOWN = 'down';
const REACT_LOL = 'lol';

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

	reactPost(reaction: string) {
		if(!this.props.auth.isAuth){
			return;
		}

		this.props.submitReaction({postId:this.props.match.params.id, userId: this.props.account.user, reaction });
	}

	getReactionButtons(): Node {

		const { currentPost } = this.props.post;

		if(!currentPost){
			return null;
		}

		return (<React.Fragment>
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
						onClick={()=>{this.reactPost(REACT_UP);}}
					/>
				}
				content={REACT_UP}
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
						onClick={()=>{this.reactPost(REACT_DOWN);}}
					/>
				}
				content={REACT_DOWN}
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
						onClick={()=>{this.reactPost(REACT_LOL);}}
					/>
				}
				content={REACT_LOL}
			/>
		</React.Fragment>);
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

					{this.getReactionButtons()}

					<Divider />

					{!!comments.length && !!replyTo && (
						<Message floating color='yellow' content={`re: @${comments[replyTo - 1].userId} - ${comments[replyTo - 1].content}`} />
					)}

					{this.props.auth.isAuth && (
						<SubmitForm
							disabled={this.state.submitting}
							ButtonText={'Reply'}
							onClick={(formData) => {
								const commentData = {
									replyTo: this.props.post.replyTo,
									content: formData,
									userId: this.props.account.user,
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
				<Container textAlign={'left'} style={{ marginTop: '7em', marginBottom:'3em' }}>
					<Segment>{this.getContent()}</Segment>
				</Container>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		account: state.account,
		post: state.post,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		submitComment: (commentData) => dispatch(submitComment(commentData)),
		submitReaction: (reactionData) => dispatch(submitReaction(reactionData)),
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
