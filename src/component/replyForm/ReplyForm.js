// @flow
import React from 'react';
import { Button, Form } from 'semantic-ui-react';

type Props = {
};

type State = {};

class ReplyForm extends React.Component<Props, State> {
	render() {
		return (
			<Form reply>
				<Form.TextArea/>
				<Button
					content="Add Reply"
					labelPosition="left"
					icon="edit"
					primary
				/>
			</Form>
		);
	}
}

export default ReplyForm ;
