// @flow
import React from 'react';
import { withRouter } from 'react-router-dom';
import { t } from 'i18next';

const NavigationBar = React.lazy(() =>
	import('../../containers/navigationBar/NavigationBar'),
);

import type { Node } from 'react';
const PostList = React.lazy(() => import('../../containers/postList/PostList'));
import { Container, Segment, Image, Header } from 'semantic-ui-react';
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

		const {match} = this.props;

		if (match.params.id !== prevProps.match.params.id) {
			this.props
				.getBoard(match.params.id)
				.then((response: Object) => {
					if (response.type === SUB_EXIST) {
						this.setState({ showPage: true });
					}
				});
		}
	}

	getBoardTitle(boardId) {
		switch(boardId){
			case 'life':
				return t('Topics for Everyday Life Conversations');
			case 'game':
				return t('Topics for Gaming and Grouping');
			case 'work':
				return t('Topics for Work related Networking');
			case 'spam':
				return t('Things that better not showing on front page');
			default:
				return boardId;
		}
	}

	render(): Node {
		const { params } = this.props.match;

		return (
			<React.Fragment>
				<NavigationBar boardValue={params.id} />

					<Container
						className={'PageContent'}
						textAlign={'left'}
					>
						{this.state.showPage && (<Segment inverted secondary>
							<Header as='h2'>
								<Image
									src={`/public/static/images/avatar/board/${
										params.id
										}.jpg`}
									circular
								/>
								<Header.Content>{this.getBoardTitle(params.id)}</Header.Content>
							</Header>
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
