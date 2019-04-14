// @flow
import React from 'react';

const NavigationBar = React.lazy( () => import( '../../containers/navigationBar/NavigationBar'));

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