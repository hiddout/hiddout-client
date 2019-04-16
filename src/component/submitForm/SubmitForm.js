// @flow
import React from 'react';
import { Button, Form } from 'semantic-ui-react';

type Props = {
	ButtonText: string;
	disabled: boolean;
	onClick: (...arg:any) => any;
	onChange: (...arg:any) => any;
};

type State = {};

class SubmitForm extends React.Component<Props, State> {
	render() {

		const {ButtonText, onClick, onChange, disabled} = this.props;

		return (
			<Form reply>
				<Form.TextArea onChange={(e,data) => onChange(e,data)}/>
				<Button
					content={ButtonText}
					labelPosition="left"
					icon="edit"
					onClick={()=> onClick()}
					disabled={disabled}
					primary
				/>
			</Form>
		);
	}
}

export default SubmitForm ;
