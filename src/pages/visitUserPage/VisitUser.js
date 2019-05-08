// @flow
import React from 'react';
import { withRouter } from 'react-router-dom';
const NavigationBar = React.lazy(() =>
	import('../../containers/navigationBar/NavigationBar'),
);
import type { Node } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../actions/visitUserAction';
import { Container, Statistic, Image, Icon, Segment, Grid, Loader } from 'semantic-ui-react';
import type { UserState } from '../../reducers/visitUser';

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

		const {visitingUser} = this.props.visitUser;

		return (
			<React.Fragment>
				<NavigationBar showBackBtn={true} />
				<Container textAlign={'left'} style={{ marginTop: '7em', marginBottom:'3em' }}>
					<Grid columns={2}>
						<Grid.Row stretched>
							<Grid.Column>
								<Segment>1</Segment>
								<Segment>2</Segment>
								<Segment>3</Segment>
							</Grid.Column>
							<Grid.Column>
								<Segment>
									<Statistic size='mini'>
										<Statistic.Label>Name</Statistic.Label>
										<Statistic.Value>{visitingUser? visitingUser.userId : <Loader active inline='centered' /> }</Statistic.Value>
									</Statistic>
								</Segment>
								<Segment>
									<Statistic.Group>
									<Statistic>
										<Statistic.Value>22</Statistic.Value>
										<Statistic.Label>Saves</Statistic.Label>
									</Statistic>

									<Statistic>
										<Statistic.Value text>
											Three<br />
											Thousand
										</Statistic.Value>
										<Statistic.Label>Signups</Statistic.Label>
									</Statistic>

									<Statistic>
										<Statistic.Value>
											<Icon name='plane' />
											5
										</Statistic.Value>
										<Statistic.Label>Flights</Statistic.Label>
									</Statistic>

									<Statistic>
										<Statistic.Value>
											<Image src='/public/static/Hiddout.png' inline circular />
											42
										</Statistic.Value>
										<Statistic.Label>Team Members</Statistic.Label>
									</Statistic>
								</Statistic.Group>
								</Segment>
							</Grid.Column>

						</Grid.Row>
					</Grid>
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
