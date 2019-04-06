// @flow
import React from 'react';
import { NavigationBar } from '../../containers/navigationBar/NavigationBar';
import type { Node } from 'react';
import {
	Button,
	Comment,
	Container,
	Header,
	Form,
	Segment,
	Placeholder,
} from 'semantic-ui-react';
import * as ReactMarkdown from 'react-markdown';
import { getPost } from '../../actions/postAction';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import type { PostState } from '../../reducers/post';

type Props = {
	post: PostState;
	getPost: (string) => void;
	match: { params: { id: string } };
};

type State = {};

class Post extends React.Component<Props, State> {
	componentDidMount = () => {
		this.props.getPost(this.props.match.params.id);
	};

	getPlaceholderContent(): Node {

		const placeholderContent = (
			<Placeholder>
				<Placeholder.Paragraph>
					<Placeholder.Line/>
					<Placeholder.Line/>
					<Placeholder.Line/>
					<Placeholder.Line/>
					<Placeholder.Line/>
				</Placeholder.Paragraph>
				<Placeholder.Paragraph>
					<Placeholder.Line/>
					<Placeholder.Line/>
					<Placeholder.Line/>
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

		const markdown = `${currentPost.content}`;
		const MarkdownComponent: any = ReactMarkdown;

		return (
			<React.Fragment>
				<Header as="h1">{currentPost.title}</Header>
				<Container textAlign="justified">
					<MarkdownComponent source={markdown}/>
					<Comment.Group>
						<Comment>
							<Comment.Content>
								<Comment.Actions>
									<Comment.Action>
										Actions here
									</Comment.Action>
								</Comment.Actions>
							</Comment.Content>
						</Comment>
					</Comment.Group>

					<Form reply>
						<Form.TextArea/>
						<Button
							content="Add Reply"
							labelPosition="left"
							icon="edit"
							primary
						/>
					</Form>

					<Comment.Group>
						<Header as="h3" dividing>
							Comments
						</Header>

						<Comment>
							<Comment.Content>
								<Comment.Author as="a">Matt</Comment.Author>
								<Comment.Metadata>
									<div>Today at 5:42PM</div>
								</Comment.Metadata>
								<Comment.Text>How artistic!</Comment.Text>
								<Comment.Actions>
									<Comment.Action>Reply</Comment.Action>
								</Comment.Actions>
								<Form reply>
									<Form.TextArea/>
									<Button
										content="Add Reply"
										labelPosition="left"
										icon="edit"
										primary
									/>
								</Form>
							</Comment.Content>
						</Comment>
					</Comment.Group>
				</Container>
			</React.Fragment>
		);
	}

	render(): Node {
		return (
			<React.Fragment>
				<NavigationBar/>
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

const post = withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps,
	)(Post),
);

export { post as Post };
