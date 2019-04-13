// @flow
import React from 'react';
import { Button, Form } from 'semantic-ui-react';

type Props = {
	ButtonText: string;
};

type State = {};

class SubmitForm extends React.Component<Props, State> {
	render() {

		const {ButtonText} = this.props;

		return (
			<Form reply>
				<Form.TextArea/>
				<Button
					content={ButtonText}
					labelPosition="left"
					icon="edit"
					primary
				/>
			</Form>
		);
	}
}

export default SubmitForm ;
