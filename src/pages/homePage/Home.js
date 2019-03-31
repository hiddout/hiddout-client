// @flow
import React from 'react';
import './Home.css';
import { NavigationBar } from '../../containers/navigationBar/NavigationBar';
import type { Node } from 'react';
import { PostList } from '../../containers/postList/PostList';
import { Container } from 'semantic-ui-react';

type Props = {};

type State = {};

class Home extends React.Component<Props, State> {

	render(): Node {
		return (
			<React.Fragment>
				<NavigationBar/>
				<Container textAlign={'left'} style={{ marginTop: '7em' }}>
					<PostList/>
				</Container>
			</React.Fragment>
		);
	}
}

export { Home };