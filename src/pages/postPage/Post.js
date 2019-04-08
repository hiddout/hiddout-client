// @flow
import React from 'react';
import { NavigationBar } from '../../containers/navigationBar/NavigationBar';
import type { Node } from 'react';
import {
	Button,
	Comment,
	Container,
	Divider,
	Header,
	Form,
	Segment,
	Placeholder,
	Popup,
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
				<Container textAlign='left'>b/{currentPost.board}. Post by {currentPost.userId}</Container>
				<Header as="h1">{currentPost.title}</Header>
				<Container textAlign="justified">
					<MarkdownComponent source={markdown}/>

					<Popup trigger={<Button
						color='green'
						icon='arrow alternate circle up outline'
						label={{ basic: true, color: 'green', pointing: 'left', content: '2,048' }}
					/>} content='up' />

					<Popup trigger={<Button
						color='red'
						icon='arrow alternate circle down outline'
						label={{ basic: true, color: 'red', pointing: 'left', content: '2,048' }}
					/>} content='down' />

					<Popup trigger={<Button
						color='black'
						icon='child'
						label={{ basic: true, color: 'black', pointing: 'left', content: '2,048' }}
					/>} content='lol' />

					<Divider/>

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
