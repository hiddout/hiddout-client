// @flow
import React from 'react';
import { NavigationBar } from '../../containers/navigationBar/NavigationBar';
import type { Node } from 'react';
import { Button, Comment, Container, Header, Form, Segment } from 'semantic-ui-react';
import * as ReactMarkdown from 'react-markdown';

type Props = {};

type State = {};

class Post extends React.Component<Props, State>  {

	componentDidMount = () => {
		console.log(this.props);
		/**
		 * this.props.match.id get content
		 */
	};

	render(): Node {

		const markdown = `**Post content**`;
		const MarkdownComponent: any = ReactMarkdown;

		return (
			<React.Fragment>
				<NavigationBar/>
				<Container textAlign={'left'} style={{ marginTop: '7em' }}>

					<Segment><Header as='h1'>First Header</Header>
						<Container textAlign='justified'>
							<MarkdownComponent source={markdown}/>
							<Comment.Group>
							<Comment>
								<Comment.Content>
									<Comment.Actions>
										<Comment.Action>Actions here</Comment.Action>
									</Comment.Actions>
								</Comment.Content>
							</Comment>
							</Comment.Group>

							<Form reply>
								<Form.TextArea/>
								<Button content='Add Reply' labelPosition='left' icon='edit' primary/>
							</Form>

							<Comment.Group>
								<Header as='h3' dividing>
									Comments
								</Header>

								<Comment>
									<Comment.Content>
										<Comment.Author as='a'>Matt</Comment.Author>
										<Comment.Metadata>
											<div>Today at 5:42PM</div>
										</Comment.Metadata>
										<Comment.Text>How artistic!</Comment.Text>
										<Comment.Actions>
											<Comment.Action>Reply</Comment.Action>
										</Comment.Actions>
										<Form reply>
											<Form.TextArea />
											<Button content='Add Reply' labelPosition='left' icon='edit' primary />
										</Form>
									</Comment.Content>
								</Comment>
							</Comment.Group>
						</Container>
					</Segment>

				</Container>
			</React.Fragment>
		);
	}
}

export { Post };