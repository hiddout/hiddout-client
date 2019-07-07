// @flow
import React from 'react';
import { withRouter } from 'react-router-dom';
import { t } from 'i18next';
import type { Node } from 'react';
import { connect } from 'react-redux';
import { changeAvatar, getUser } from '../../actions/visitUserAction';
import {
	Container,
	Statistic,
	Image,
	Segment,
	Grid,
	Loader,
	Divider,
	Dropdown,
} from 'semantic-ui-react';
import type { UserState } from '../../reducers/visitUser';
import type { AccountState } from '../../reducers/account';
import { getUserColor } from '../../utils/commonUtil';

const NavigationBar = React.lazy(() =>
	import('../../containers/navigationBar/NavigationBar'),
);

type Props = {
	match: Object,
	account: AccountState,
	visitUser: UserState,
	getUser: (string) => any,
	changeAvatar: (number) => any,
};

type State ={
	isChangingAvatar: boolean,
};

class VisitUser extends React.Component<Props, State> {

	state = {isChangingAvatar: false};

	async componentDidMount() {
		const id = this.props.match.params.id;
		await this.props.getUser(id);
	}

	getAvatarDropdown() {
		const { visitingUser } = this.props.visitUser;
		if(!visitingUser){
			return null;
		}

		const userColor = getUserColor(visitingUser.userId);
		const avatarOptions = [
			{
				key: 'Default',
				text: 'default',
				value: 0,
				image: {
					avatar: true,
					src: '/public/static/images/avatar/user/0.png',
					style: { backgroundColor: userColor },
				},
			},
		];
		for (let index = 1; index < 7; ++index) {
			avatarOptions.push({
				key: `Avatar-${index}`,
				text: `h${index}`,
				value: index,
				image: {
					avatar: true,
					src: `/public/static/images/avatar/user/${index}.png`,
					style: { backgroundColor: userColor },
				},
			});
		}

		return (
			<Container textAlign={'center'}>
				Avatar:{' '}
				<Dropdown
					inline
					disabled={this.state.isChangingAvatar}
					options={avatarOptions}
					defaultValue={avatarOptions[visitingUser?visitingUser.avatar:0].value}
					onChange={async (e,{value})=>{
						this.setState({isChangingAvatar:true});
						const res = await this.props.changeAvatar(value);
						if(res.payload.changed) {
							await this.props.getUser(this.props.match.params.id);
							this.setState({isChangingAvatar:false});
						}
					}}
				/>
			</Container>
		);
	}

	render(): Node {
		const { visitingUser } = this.props.visitUser;
		const { user } = this.props.account;

		return (
			<React.Fragment>
				<NavigationBar showBackBtn={'back'} />
				<Container className={'PageContent'} textAlign={'left'}>
					<Segment>
						<Grid>
							<Grid.Column width={4}>
								{visitingUser &&
									user === visitingUser.userId &&
									this.getAvatarDropdown()}
								{visitingUser ? (
									<Image
										src={`/public/static/images/avatar/user/${visitingUser.avatar || 0}.png`}
										size="medium"
										circular
										style={{ backgroundColor: getUserColor(visitingUser.userId) }}
									/>
								) : (
									<Loader active inline="centered" />
								)}
							</Grid.Column>
							<Grid.Column width={12}>
								<Container textAlign={'center'}>
									<Statistic size="mini">
										<Statistic.Label>N/A</Statistic.Label>
										<Statistic.Value>
											{visitingUser ? (
												visitingUser.userId
											) : (
												<Loader
													active
													inline="centered"
												/>
											)}
										</Statistic.Value>
									</Statistic>
								</Container>

								<Divider horizontal> {t('statistic')} </Divider>
								<Segment>
									<Statistic.Group>
										<Statistic>
											<Statistic.Value>
												N/A
											</Statistic.Value>
											<Statistic.Label>
												Rewards
											</Statistic.Label>
										</Statistic>
										<Statistic>
											<Statistic.Value>
												N/A
											</Statistic.Value>
											<Statistic.Label>
												Views
											</Statistic.Label>
										</Statistic>
										<Statistic>
											<Statistic.Value>
												N/A
											</Statistic.Value>
											<Statistic.Label>
												Topics
											</Statistic.Label>
										</Statistic>
									</Statistic.Group>
								</Segment>
							</Grid.Column>
						</Grid>
					</Segment>
				</Container>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		account: state.account,
		visitUser: state.visitUser,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getUser: (id) => dispatch(getUser(id)),
		changeAvatar: (avatarId) => dispatch(changeAvatar(avatarId)),
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps,
	)(VisitUser),
);
