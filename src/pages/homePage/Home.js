// @flow
import React from 'react';

const  NavigationBar = React.lazy( () => import( '../../containers/navigationBar/NavigationBar'));

import type { Node } from 'react';
const  PostList = React.lazy( () => import( '../../containers/postList/PostList'));
import { Container } from 'semantic-ui-react';
import ListFooter from '../../containers/listFooter/ListFooter';


type Props = {};

type State = {};

class Home extends React.Component<Props, State> {



	render(): Node {
		return (
			<React.Fragment>
				<NavigationBar board={'life'}/>
				<Container className={'pageContent'} textAlign={'left'}>
					<PostList/>
					<ListFooter/>
				</Container>
			</React.Fragment>
		);
	}
}

export default  Home ;