// @flow
import React from 'react';
import {
	Container,
	Segment,
	Header,
	Dropdown,
	Menu,
	Divider,
	Statistic,
	Grid,
} from 'semantic-ui-react';
import { t } from 'i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { changeLanguage } from '../../actions/i18nAction';

const NavigationBar = React.lazy(() =>
	import('../../containers/navigationBar/NavigationBar'),
);

type Props = {
	i18n: Object;
	changeLanguage: (string) => any;
};

type State = {};

const CHINESE = '中文',
	SWEDISH = 'Svenska',
	ENGLISH = 'English',
	GERMAN = 'Deutsch';

class Settings extends React.Component<Props, State> {
	onDropdownClick(e, { value }) {
		switch (value) {
			case CHINESE:
				this.props.changeLanguage('zh');
				break;
			case ENGLISH:
				this.props.changeLanguage('en');
				break;
			case SWEDISH:
				this.props.changeLanguage('sv');
				break;
			case GERMAN:
				this.props.changeLanguage('de');
				break;
			default:
				break;
		}
	}

	getLaguageSelector() {
		const { language } = this.props.i18n;

		const trigger = <span>{t(language)}</span>;
		const options = [
			{
				key: 'userId',
				text: (
					<span style={{ color: 'gray' }}>
						{'current using '}
						<strong style={{ color: 'green' }}>
							{t(language)}
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

		return (
			<Menu.Item>
				<Dropdown
					onChange={this.onDropdownClick.bind(this)}
					trigger={trigger}
					options={options}
				/>
			</Menu.Item>
		);
	}

	render() {

		const options = [
			{ key: 'en', text: 'English', value: 'en' },
			{ key: 'zh', text: '中文', value: 'zh' },
			{ key: 'de', text: 'Deutsch', value: 'de' },
			{ key: 'sv', text: 'Svenska', value: 'sv' },
		];

		return (
			<React.Fragment>
				<NavigationBar showBackBtn={true} />
				<Container
					className={'PageContent'}
					textAlign={'left'}
				>
					<Segment>
						<Header as="h3">{t('settingsBtn')}</Header>

						<Container>
							<Divider horizontal>
								<Header as="h4">Language</Header>
							</Divider>

							<Grid centered columns={3}>
							<Grid.Row >
								<Grid.Column>
									<Statistic size='mini'>
										<Statistic.Label>{t('interface')}</Statistic.Label>
									</Statistic>
									{this.getLaguageSelector()}
								</Grid.Column>
								<Grid.Column>
									<Statistic size='mini'>
										<Statistic.Label>{t('prefer')}</Statistic.Label>
									</Statistic>
									<Dropdown placeholder={t('allLanguagePost')} fluid multiple selection options={options} />
								</Grid.Column>
							</Grid.Row>
							</Grid>
						</Container>
					</Segment>
				</Container>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		i18n: state.i18n,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		changeLanguage: (lng) => dispatch(changeLanguage(lng)),
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps,
	)(Settings),
);
