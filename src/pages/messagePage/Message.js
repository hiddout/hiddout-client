import React from 'react';
import './Message.css';
import { NavigationBar } from '../../containers/navigationBar/NavigationBar';

class Message extends React.Component {
	constructor(props) {
		super(props);
	}

	render(){
		return (
			<React.Fragment>
				<NavigationBar/>
				<h2>Messages</h2>
			</React.Fragment>
		);
	}
}

export {Message};