// @flow
import React from 'react';

import type {Node} from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Header, Segment } from 'semantic-ui-react';
import {connect} from 'react-redux';
import { PAGE_404 } from '../../actions/actionType';

type Props = {};

type State = {};

class NoMatch extends React.Component<Props,State> {

	static getDerivedStateFromProps(props){
		props.page404();
	}

	render(): Node {
		return (
			<React.Fragment>
				<Container textAlign={'left'} style={{ marginTop: '7em' }}>
					<Segment>
						<Header as='h2'>Nothing to see here</Header>
						<p>
							The link is out of date, try to go back to home page to refresh again. We are refreshing url regularly in order to keep some necessary privacy.
						</p>
						<p>
							If someone or some website is sharing this link to you, the guy who does this might not be a really trustworthy person.
						</p>
					</Segment>
				</Container>
			</React.Fragment>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		page404: () => {
			dispatch({type: PAGE_404});
		},
	};
};

export default withRouter(
	connect(
		null,
		mapDispatchToProps,
	)(NoMatch),
);
