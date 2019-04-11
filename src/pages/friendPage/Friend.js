// @flow
import React from 'react';

import { NavigationBar } from '../../containers/navigationBar/NavigationBar';
import type {Node} from 'react';
type Props = {};

type State = {};

class Friend extends React.Component<Props, State> {

	render(): Node {
		return (
			<React.Fragment>
				<NavigationBar/>
				<h2>Friends</h2>
			</React.Fragment>
		);
	}
}

export { Friend };