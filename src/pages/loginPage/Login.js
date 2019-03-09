// @flow
import React from 'react';
import './Login.css';
import { NavigationBar } from '../../containers/navigationBar/NavigationBar';
import type {Node} from 'react';
type Props = {};

type State = {};

class Login extends React.Component<Props,State> {

	render(): Node {
		return (
			<React.Fragment>
				<NavigationBar/>
				<h2>LOG IN</h2>
			</React.Fragment>
		);
	}
}

export {Login};