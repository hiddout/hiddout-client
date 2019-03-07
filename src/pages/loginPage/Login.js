import React from 'react';
import './Login.css';
import { NavigationBar } from '../../containers/navigationBar/NavigationBar';

class Login extends React.Component {
	constructor(props) {
		super(props);
	}

	render(){
		return (
			<React.Fragment>
				<NavigationBar/>
				<h2>LOG IN</h2>
			</React.Fragment>
		);
	}
}

export {Login};