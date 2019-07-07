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
import { changeLanguage, changePrefer } from '../../actions/i18nAction';
import { changePassword } from '../../actions/loginAction';
import LanguageSelector from '../../component/languageSelector/LanguageSelector';
import AccountModal from '../../containers/accountModal/AccountModal';
import { openAccountModal } from '../../actions/accountAction';

const NavigationBar = React.lazy(() =>
	import('../../containers/navigationBar/NavigationBar'),
);

type Props = {
	i18n: Object,
	changeLanguage: (string) => any,
	changePassword: (Object) => any,
	changePrefer: (Array<string>) => any,
	openAccountModal: () => any,
};

type State = {
	oldPassword:string,
	password: string,
	passwordVerify: string,
	passwordViolation: boolean,
	passwordVerification: boolean,
};

class Settings extends React.Component<Props, State> {
	state = {
		oldPassword:'',
		password: '',
		passwordVerify: '',
		passwordViolation: false,
		passwordVerification: true,
	};

	onLanguageClick( value ) {
		this.props.changeLanguage(value);
	}

	onPreferClick(e, { value }) {
		this.props.changePrefer(value);
	}

	getLanguageSelector() {
		const { language } = this.props.i18n;

		return (
			<Menu.Item>
				<LanguageSelector language={language} onChange={this.onLanguageClick.bind(this)}/>
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

	onOldPasswordChange(e, { value }) {
		if (
			!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/.test(
				value,
			)
		) {
			return;
		}

		this.setState({ oldPassword: value });
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

	onChangePasswordClick() {

		if(this.state.passwordViolation || this.state.password.length === 0){
			return;
		}

		const md: Object = forge.md.sha256.create();
		md.update(this.state.oldPassword);
		const opwh = md.digest().toHex();

		const nmd: Object = forge.md.sha256.create();
		nmd.update(this.state.password);
		const npwh = nmd.digest().toHex();

		const pwhData = {
			old:opwh,
			new:npwh,
		};

		this.props.changePassword(pwhData);
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
				<AccountModal />
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
									{this.getLanguageSelector()}
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
										value={this.props.i18n.prefer}
										onChange={this.onPreferClick.bind(this)}
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
												onChange={this.onOldPasswordChange.bind(
													this,
												)}
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
										<Button
											type={'submit'}
											color={'blue'}
											onClick={this.onChangePasswordClick.bind(this)}
										>
											{t('Change Password')}
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
								<Grid.Column width={6}>
									<Button type={'submit'} color={'red'} onClick={()=> this.props.openAccountModal()}>
										{t('delete Account')}
									</Button>
								</Grid.Column>
								<Grid.Column width={1} />
								<Grid.Column width={6}>
									<Button type={'submit'} color={'black'}>
										{t('get Account Data')}
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
		openAccountModal: () => dispatch(openAccountModal()),
		changePassword: (pwhData) => dispatch(changePassword(pwhData)),
		changeLanguage: (lng) => dispatch(changeLanguage(lng)),
		changePrefer: (prefer) => dispatch(changePrefer(prefer)),
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps,
	)(Settings),
);
