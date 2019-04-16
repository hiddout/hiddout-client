// @flow
import React from 'react';
import { Comment, Header } from 'semantic-ui-react';

const SubmitForm = React.lazy(()=> import('../../component/submitForm/SubmitForm'));

type Props = {
};

type State = {};

class CommentSection extends React.Component<Props, State> {

	render() {
		return (
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
				</Comment.Content>
				<SubmitForm ButtonText={'Reply'}  onClick={()=>{}} onChange={()=>{}} disabled={false}/>
			</Comment>
			</Comment.Group>
		);
	}
}

export default CommentSection;
