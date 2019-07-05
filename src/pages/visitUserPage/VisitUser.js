// @flow
import React from 'react';
import { withRouter } from 'react-router-dom';
import { t } from 'i18next';
import type { Node } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../actions/visitUserAction';
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

const NavigationBar = React.lazy(() =>
	import('../../containers/navigationBar/NavigationBar'),
);

type Props = {
	match: Object,
	visitUser: UserState,
	getUser: (string) => any,
};

type State = {};

class VisitUser extends React.Component<Props, State> {
	async componentDidMount() {
		const id = this.props.match.params.id;
		await this.props.getUser(id);
	}

	getAvatarDropdown() {
		const avatarOptions = [
			{
				key: 'Default',
				text: 'Default',
				value: 0,
				image: {
					avatar: true,
					src: '/public/static/images/avatar/user/0.png',
					style: { backgroundColor: 'gray' },
				},
			},
		];
		for (let index = 1; index < 7; ++index) {
			avatarOptions.push({
				key: `Avatar ${index}`,
				text: `Avatar ${index}`,
				value: index,
				image: {
					avatar: true,
					src: `/public/static/images/avatar/user/${index}.png`,
					style: { backgroundColor: 'gray' },
				},
			});
		}

		return (
			<Container textAlign={'center'}>
				Avatar:{' '}
				<Dropdown
					inline
					options={avatarOptions}
					defaultValue={avatarOptions[0].value}
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
										src="/public/static/images/avatar/user/0.png"
										size="medium"
										circular
										style={{ backgroundColor: 'gray' }}
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
		auth: state.auth,
		account: state.account,
		visitUser: state.visitUser,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getUser: (id) => dispatch(getUser(id)),
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps,
	)(VisitUser),
);
