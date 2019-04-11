// @flow
import React from 'react';
import type {Node} from 'react';

type Props = {};

type State = {};

class About extends React.Component<Props,State> {

	render(): Node {
		return (
			<React.Fragment>
				<h2>About</h2>
			</React.Fragment>
		);
	}
}

export {About};