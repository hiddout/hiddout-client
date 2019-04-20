// @flow
import React from 'react';
import { withRouter } from 'react-router-dom';

const  NavigationBar = React.lazy( () => import( '../../containers/navigationBar/NavigationBar'));

import type { Node } from 'react';
const  PostList = React.lazy( () => import( '../../containers/postList/PostList'));
import { Container, Segment, Image } from 'semantic-ui-react';


type Props = {
	match: Object,
};

type State = {};

class BoardPage extends React.Component<Props, State> {

	render(): Node {
		return (
			<React.Fragment>
				<NavigationBar/>
				<Container textAlign={'left'} style={{ marginTop: '7em' }}>
					<Segment inverted><Image src={`/public/static/images/avatar/board/${this.props.match.params.id}.jpg`} circular /></Segment>
					<PostList/>
				</Container>
			</React.Fragment>
		);
	}
}

export default withRouter(BoardPage);