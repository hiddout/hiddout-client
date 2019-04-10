// @flow
import React from 'react';
import { NavigationBar } from '../../containers/navigationBar/NavigationBar';
import type { Node } from 'react';
import { Container } from 'semantic-ui-react';

type Props = {};

type State = {};

class Submit extends React.Component<Props, State> {

	render(): Node {
		return (
			<React.Fragment>
				<NavigationBar/>
				<Container textAlign={'left'} style={{ marginTop: '7em' }}>
					Submit
				</Container>
			</React.Fragment>
		);
	}
}

export { Submit };