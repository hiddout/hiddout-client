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
	Form,
	Input,
	Label,
	Button,
} from 'semantic-ui-react';
import { t } from 'i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { changeLanguage } from '../../actions/i18nAction';

const NavigationBar = React.lazy(() =>
	import('../../containers/navigationBar/NavigationBar'),
);

type Props = {
	i18n: Object,
	changeLanguage: (string) => any,
};

type State = {
	password: string,
	passwordVerify: string,
	passwordViolation: boolean,
	passwordVerification: boolean,
};

const CHINESE = '中文',
	SWEDISH = 'Svenska',
	ENGLISH = 'English',
	GERMAN = 'Deutsch';

class Settings extends React.Component<Props, State> {
	state = {
		password: '',
		passwordVerify: '',
		passwordViolation: false,
		passwordVerification: true,
	};

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

	onVerifyPasswordChange(e, { value }) {
		if (value !== this.state.password) {
			this.setState({
				passwordVerify: value,
				passwordVerification: false,
			});
			return;
		}

		this.setState({ passwordVerify: value, passwordVerification: true });
	}

	onPasswordChange(e, { value }) {
		if (
			!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/.test(
				value,
			)
		) {
			this.setState({ passwordViolation: true });
			return;
		}

		this.setState({ password: value, passwordViolation: false });
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
				<Container className={'PageContent'} textAlign={'left'}>
					<Segment>
						<Header as="h3">{t('settingsBtn')}</Header>

						<Container>
							<Divider horizontal>
								<Header as="h4">Language</Header>
							</Divider>

							<Grid columns="equal">
								<Grid.Column />
								<Grid.Column width={5}>
									<Statistic size="mini">
										<Statistic.Label>
											{t('interface')}
										</Statistic.Label>
									</Statistic>
									{this.getLaguageSelector()}
								</Grid.Column>
								<Grid.Column width={6}>
									<Statistic size="mini">
										<Statistic.Label>
											{t('prefer')}
										</Statistic.Label>
									</Statistic>
									<Dropdown
										placeholder={t('allLanguagePost')}
										fluid
										multiple
										selection
										options={options}
									/>
								</Grid.Column>
								<Grid.Column />
							</Grid>
							<Divider horizontal>
								<Header as="h4">{t('security')}</Header>
							</Divider>

							<Grid columns="equal">
								<Grid.Column />
								<Grid.Column width={12}>
									<Form>
										<Form.Field>
											<label>{t('OLD PASSWORD')}</label>
											<Input
												placeholder={t('OLD PASSWORD')}
												type={'password'}
											/>
										</Form.Field>
										{
											<Form.Field>
												<label>
													{t('NEW PASSWORD')}
												</label>
												<Input
													placeholder={t(
														'NEW PASSWORD',
													)}
													type={'password'}
													onChange={this.onPasswordChange.bind(
														this,
													)}
												/>
												{this.state
													.passwordViolation && (
													<Label
														basic
														color="red"
														pointing
													>
														{t('passwordViolation')}
													</Label>
												)}
											</Form.Field>
										}
										{
											<Form.Field>
												<label>
													{t('VERIFY PASSWORD')}
												</label>
												<Input
													placeholder={t(
														'VERIFY PASSWORD',
													)}
													type={'password'}
													onChange={this.onVerifyPasswordChange.bind(
														this,
													)}
												/>
												{!this.state
													.passwordVerification && (
													<Label
														basic
														color="red"
														pointing
													>
														{t(
															'passwordVerification',
														)}
													</Label>
												)}
											</Form.Field>
										}
										<Button type={'submit'} color={'blue'}>
											{t('change')}
										</Button>
									</Form>
								</Grid.Column>
								<Grid.Column />
							</Grid>

							<Divider horizontal>
								<Header as="h4">{t('accountBtn')}</Header>
							</Divider>

							<Grid columns="equal">
								<Grid.Column width={2} />
								<Grid.Column width={5}>
									<Button type={'submit'} color={'red'}>
										{t('deleteAccount')}
									</Button>
								</Grid.Column>
								<Grid.Column width={2} />
								<Grid.Column width={6}>
									<Button type={'submit'} color={'black'}>
										{t('getAccountData')}
									</Button>
								</Grid.Column>
								<Grid.Column width={1} />
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
