// @flow
import React from 'react';

const  NavigationBar = React.lazy( () => import( '../../containers/navigationBar/NavigationBar'));

import type { Node } from 'react';
const  PostList = React.lazy( () => import( '../../containers/postList/PostList'));
import { Container } from 'semantic-ui-react';


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