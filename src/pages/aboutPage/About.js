// @flow
import React from 'react';
import { Container } from 'semantic-ui-react';
import type {Node} from 'react';

type Props = {};

type State = {};

class About extends React.Component<Props,State> {

	render(): Node {
		return (
			<React.Fragment>
				<Container className={'PageContent'}  textAlign={'left'}>
				</Container>
			</React.Fragment>
		);
	}
}

export default About;