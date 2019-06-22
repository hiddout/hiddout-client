// @flow
import React from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const NavigationBar = React.lazy(() =>
	import('../../containers/navigationBar/NavigationBar'),
);

import type { Node } from 'react';
import { Container, Segment } from 'semantic-ui-react';

type Props = {};

type State = {};

class Message extends React.Component<Props, State> {
	render(): Node {
		return (
			<React.Fragment>
				<NavigationBar showBackBtn={'back'} />
				<Container className={'PageContent'} textAlign={'left'}>
					<Segment>
						<h2>Messages</h2>
					</Segment>
				</Container>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps,
	)(Message),
);
