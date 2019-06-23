// @flow
import React from 'react';
import { Container } from 'semantic-ui-react';

const  NavigationBar = React.lazy( () => import( '../../containers/navigationBar/NavigationBar'));
const  PostList = React.lazy( () => import( '../../containers/postList/PostList'));

import type { Node } from 'react';

type Props = {};

type State = {};

class Home extends React.Component<Props, State> {

	render(): Node {
		return (
			<React.Fragment>
				<NavigationBar board={'life'}/>
				<Container className={'PageContent'} textAlign={'left'}>
					<PostList/>
				</Container>
			</React.Fragment>
		);
	}
}

export default  Home ;