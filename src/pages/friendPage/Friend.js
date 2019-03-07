import React from 'react';
import './Friend.css';
import { NavigationBar } from '../../containers/navigationBar/NavigationBar';

class Friend extends React.Component {
	constructor(props) {
		super(props);
	}

	render(){
		return (
			<React.Fragment>
				<NavigationBar/>
				<h2>Friends</h2>
			</React.Fragment>
		);
	}
}

export {Friend};