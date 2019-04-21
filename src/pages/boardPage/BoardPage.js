// @flow
import React from 'react';
import { withRouter } from 'react-router-dom';

const  NavigationBar = React.lazy( () => import( '../../containers/navigationBar/NavigationBar'));

import type { Node } from 'react';
const  PostList = React.lazy( () => import( '../../containers/postList/PostList'));
import { Container, Segment, Image } from 'semantic-ui-react';
import { getBoard } from '../../actions/boardAction';
import {connect} from 'react-redux';
import { SUB_EXIST } from '../../actions/actionType';


type Props = {
	match: Object,
	getBoard: (string) => any,
};

type State = {
	showPage: boolean,
};

class BoardPage extends React.Component<Props, State> {

	state = {showPage: false};

	componentDidMount() {
		this.props.getBoard(this.props.match.params.id).then((response :Object) => {
			if(response.type === SUB_EXIST){
				this.setState({showPage: true});
			}
		});
	}

	render(): Node {
		return (
			<React.Fragment>
				<NavigationBar boardValue={this.props.match.params.id}/>
				{this.state.showPage && <Container textAlign={'left'} style={{ marginTop: '7em' }}>
					<Segment inverted><Image src={`/public/static/images/avatar/board/${this.props.match.params.id}.jpg`} circular /></Segment>
					<PostList/>
				</Container>}
			</React.Fragment>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getBoard: (Id) => dispatch(getBoard(Id)),
	};
};

export default withRouter(
	connect(
		null,
		mapDispatchToProps,
	)(BoardPage),
);
