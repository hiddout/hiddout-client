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
import { getPost } from '../../actions/postAction';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import type { PostState } from '../../reducers/post';
import SubmitForm from '../../component/submitForm/SubmitForm';

const NavigationBar = React.lazy(() =>
	import('../../containers/navigationBar/NavigationBar'),
);
const CommentSection = React.lazy(() =>
	import('../../containers/commentSection/CommentSection'),
);

type Props = {
	post: PostState,
	getPost: (string) => void,
	match: { params: { id: string } },
};

type State = {};

class Post extends React.Component<Props, State> {
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
		const { currentPost } = this.props.post;

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
				<Container textAlign="justified">
					<MarkdownComponent
						source={markdown}
					/>

					<Popup
						trigger={
							<Button
								color="green"
								icon="arrow alternate circle up outline"
								label={{
									basic: true,
									color: 'green',
									pointing: 'left',
									content: '2,048',
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
									content: '2,048',
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
									content: '2,048',
								}}
							/>
						}
						content="lol"
					/>

					<Divider />

					<SubmitForm
						ButtonText={'Reply'}
						onClick={() => {}}
						onChange={() => {}}
					/>

					<CommentSection />
				</Container>
			</React.Fragment>
		);
	}

	render(): Node {
		return (
			<React.Fragment>
				<NavigationBar />
				<Container textAlign={'left'} style={{ marginTop: '7em' }}>
					<Segment>{this.getContent()}</Segment>
				</Container>
			</React.Fragment>
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
		getPost: (id) => {
			dispatch(getPost(id));
		},
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps,
	)(Post),
);
