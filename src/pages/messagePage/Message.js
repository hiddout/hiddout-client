// @flow
import React from 'react';
const NavigationBar = React.lazy(() =>
	import('../../containers/navigationBar/NavigationBar'),
);
import type { Node } from 'react';
type Props = {};

type State = {};

class Message extends React.Component<Props, State> {
	render(): Node {
		return (
			<React.Fragment>
				<NavigationBar showBackBtn={true} />
				<h2>Messages</h2>
			</React.Fragment>
		);
	}
}

export default Message ;
