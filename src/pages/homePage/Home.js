// @flow
import React from 'react';
import './Home.css';
import { NavigationBar } from '../../containers/navigationBar/NavigationBar';
import type {Node} from 'react';
type Props = {};

type State = {};

class Home extends React.Component<Props, State> {

	render(): Node {
		return (
			<React.Fragment>
				<NavigationBar/>
				<h2>Home</h2>
			</React.Fragment>
		);
	}
}

export { Home };