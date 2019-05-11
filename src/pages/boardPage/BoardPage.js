// @flow
import React from 'react';
import { withRouter } from 'react-router-dom';

const NavigationBar = React.lazy(() =>
	import('../../containers/navigationBar/NavigationBar'),
);

import type { Node } from 'react';
const PostList = React.lazy(() => import('../../containers/postList/PostList'));
import { Container, Segment, Image } from 'semantic-ui-react';
import { getBoard } from '../../actions/boardAction';
import { connect } from 'react-redux';
import { SUB_EXIST } from '../../actions/actionType';

type Props = {
	match: Object,
	getBoard: (string) => any,
};

type State = {
	showPage: boolean,
};

class BoardPage extends React.Component<Props, State> {
	state = { showPage: false };

	componentDidMount() {
		this.props
			.getBoard(this.props.match.params.id)
			.then((response: Object) => {
				if (response.type === SUB_EXIST) {
					this.setState({ showPage: true });
				}
			});
	}

	componentDidUpdate(prevProps) {
		if (this.props.match.params.id !== prevProps.match.params.id) {
			this.props
				.getBoard(this.props.match.params.id)
				.then((response: Object) => {
					if (response.type === SUB_EXIST) {
						this.setState({ showPage: true });
					}
				});
		}
	}

	render(): Node {
		const { params } = this.props.match;

		return (
			<React.Fragment>
				<NavigationBar boardValue={params.id} />

					<Container
						className={'pageContent'}
						textAlign={'left'}
					>
						{this.state.showPage && (<Segment>
							<Image
								src={`/public/static/images/avatar/board/${
									params.id
								}.jpg`}
								circular
							/>
						</Segment>)}
						<PostList boardId={params.id} />
					</Container>

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
