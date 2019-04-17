// @flow
import React from 'react';
import { Button, Form } from 'semantic-ui-react';

type Props = {
	ButtonText: string;
	disabled: boolean;
	onClick: (...arg:any) => any;
	onChange: (...arg:any) => any;
};

type State = {
	formData:string,
};

class SubmitForm extends React.Component<Props, State> {
	state = {formData: ''};

	onTextAreaChange(e: Object,data: Object){
		this.setState({formData: data.value});
		this.props.onChange(e,data);
	}

	render() {

		const {ButtonText, onClick, disabled} = this.props;

		return (
			<Form reply>
				<Form.TextArea onChange={this.onTextAreaChange.bind(this)}/>
				<Button
					content={ButtonText}
					labelPosition="left"
					icon="edit"
					onClick={()=> onClick(this.state.formData)}
					disabled={disabled}
					primary
				/>
			</Form>
		);
	}
}

export default SubmitForm ;
