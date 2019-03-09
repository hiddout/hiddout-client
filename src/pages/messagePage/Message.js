// @flow
import React from 'react';
import './Message.css';
import { NavigationBar } from '../../containers/navigationBar/NavigationBar';
import type {Node} from 'react';
type Props = {};

type State = {};

class Message extends React.Component<Props, State> {

	render(): Node {
		return (
			<React.Fragment>
				<NavigationBar/>
				<h2>Messages</h2>
			</React.Fragment>
		);
	}
}

export {Message};