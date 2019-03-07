import React from 'react';
import './NoMatch.css';

class NoMatch extends React.Component {
	constructor(props) {
		super(props);
	}

	render(){
		return (
			<React.Fragment>
				<h2>404</h2>
			</React.Fragment>
		);
	}
}

export {NoMatch};