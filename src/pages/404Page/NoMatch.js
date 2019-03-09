// @flow
import React from 'react';
import './NoMatch.css';

import type {Node} from 'react';

type Props = {};

type State = {};

class NoMatch extends React.Component<Props,State> {

	render(): Node {
		return (
			<React.Fragment>
				<h2>404</h2>
			</React.Fragment>
		);
	}
}

export {NoMatch};