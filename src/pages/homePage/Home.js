import React from 'react';
import './Home.css';
import { NavigationBar } from '../../containers/navigationBar/NavigationBar';

class Home extends React.Component {
	constructor(props) {
		super(props);
	}

	render(){
		return (
			<React.Fragment>
				<NavigationBar/>
				<h2>Home</h2>
			</React.Fragment>
		);
	}
}

export {Home};