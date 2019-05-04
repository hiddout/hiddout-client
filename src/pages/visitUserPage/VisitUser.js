// @flow
import React from 'react';
import { withRouter } from 'react-router-dom';
const NavigationBar = React.lazy(() =>
	import('../../containers/navigationBar/NavigationBar'),
);
import type { Node } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../actions/visitUserAction';
type Props = {
	match: Object,
	getUser: (string) => any,
};

type State = {};

class VisitUser extends React.Component<Props, State> {
	async componentDidMount() {
		const id = this.props.match.params.id;
		await this.props.getUser(id);
	}

	render(): Node {
		return (
			<React.Fragment>
				<NavigationBar showBackBtn={true} />
				<h2>User</h2>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
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
