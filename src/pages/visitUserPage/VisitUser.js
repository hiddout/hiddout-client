// @flow
import React from 'react';
import { withRouter } from 'react-router-dom';
import { t } from 'i18next';
import type { Node } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../actions/visitUserAction';
import { Container, Statistic, Image, Segment, Grid, Loader, Divider } from 'semantic-ui-react';
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

	render(): Node {

		const { visitingUser } = this.props.visitUser;

		return (
			<React.Fragment>
				<NavigationBar showBackBtn={'back'}/>
				<Container className={'PageContent'} textAlign={'left'} >
					<Segment>
						<Grid>
							<Grid.Column width={4}>
								<Image src='/public/static/Hiddout.png'/>
							</Grid.Column>
							<Grid.Column width={12}>
								<Statistic size='mini'>
									<Statistic.Label>N/A</Statistic.Label>
									<Statistic.Value>{visitingUser ? visitingUser.userId :
										<Loader active inline='centered'/>}</Statistic.Value>
								</Statistic>
								<Divider horizontal> {t('statistic')} </Divider>
								<Segment>
									<Statistic.Group>
										<Statistic>
											<Statistic.Value>N/A</Statistic.Value>
											<Statistic.Label>Rewards</Statistic.Label>
										</Statistic>
										<Statistic>
											<Statistic.Value>N/A</Statistic.Value>
											<Statistic.Label>Views</Statistic.Label>
										</Statistic>
										<Statistic>
											<Statistic.Value>N/A</Statistic.Value>
											<Statistic.Label>Topics</Statistic.Label>
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
