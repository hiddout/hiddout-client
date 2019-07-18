// @flow
import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { t } from 'i18next';

type Props = {
	ButtonText: string,
	disabled?: boolean,
	onClick: (...arg: any) => any,
	onChange?: (...arg: any) => any,
};

type State = {
	formData: string,
};

class SubmitForm extends React.Component<Props, State> {
	state = { formData: '' };

	onTextAreaChange(e: Object, data: Object) {
		const { onChange } = this.props;

		if (onChange) {
			onChange(e, data);
		}

		this.setState({ formData: data.value });
	}

	onClick() {
		if (!this.state.formData.length) {
			return;
		}

		const { onClick } = this.props;

		onClick(this.state.formData);

		this.setState({ formData: '' });
	}

	render() {
		const { ButtonText, disabled } = this.props;

		return (
			<Form reply>
				<Form.TextArea
					value={this.state.formData}
					placeholder={t('Our text editor is using markdown format')}
					onChange={this.onTextAreaChange.bind(this)}
				/>
				<Button
					content={ButtonText}
					labelPosition="left"
					icon="edit"
					onClick={this.onClick.bind(this)}
					disabled={disabled}
					primary
				/>
			</Form>
		);
	}
}

export default SubmitForm;
