// @flow
import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { t } from 'i18next';

const CHINESE = '中文',
	SWEDISH = 'Svenska',
	ENGLISH = 'English',
	GERMAN = 'Deutsch';

type Props = {
	language?: string,
	onChange?: string => any,
};

type State = {
	language: string,
};

class LanguageSelector extends React.Component<Props, State> {
	constructor(props:Props){
		super(props);

		this.state = {
			language: this.props.language || 'en',
		};
	}

	onInterfaceClick(e: Object, { value }: Object) {
		let language = 'en';
		switch (value) {
			case CHINESE:
				language = 'zh';
				break;
			case ENGLISH:
				language = 'en';
				break;
			case SWEDISH:
				language = 'sv';
				break;
			case GERMAN:
				language = 'de';
				break;
			default:
				break;
		}

		this.setState({language},()=>{
			if(this.props.onChange){
				this.props.onChange(language);
			}
		});
	}

	render(){
		const trigger = <span>{t(this.state.language)}</span>;
		const options = [
			{
				key: 'userId',
				text: (
					<span style={{ color: 'gray' }}>
						{'current using '}
						<strong style={{ color: 'green' }}>
							{t(this.state.language)}
						</strong>
					</span>
				),
				value: 0,
			},
			{
				key: CHINESE,
				text: CHINESE,
				value: CHINESE,
			},
			{
				key: ENGLISH,
				text: ENGLISH,
				value: ENGLISH,
			},
			{
				key: SWEDISH,
				text: SWEDISH,
				value: SWEDISH,
			},
			{
				key: GERMAN,
				text: GERMAN,
				value: GERMAN,
			},
		];

		return (<Dropdown
					onChange={this.onInterfaceClick.bind(this)}
					trigger={trigger}
					options={options}/>
		);
	}
}

export default LanguageSelector;