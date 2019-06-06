// @flow
import React from 'react';
import { withRouter } from 'react-router-dom';
import { List, Segment, Divider, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/postAction';
import PostItem from '../../component/postItem/PostItem';

import { getHiddoutTime } from '../../utils/dataUtil';

import type { PostState } from '../../reducers/post';
import type { PageMarkerState } from '../../reducers/pageMarker';
import ListFooter from '../listFooter/ListFooter';

type Props = {
	post: PostState,
	pageMarker: PageMarkerState,
	boardId?: string,
	location: Object,
	getPosts: (string | typeof undefined) => any,
};

type State = {};

class PostList extends React.Component<Props, State> {
	componentDidMount() {
		this.props.getPosts(this.props.boardId);
	}

	componentDidUpdate(prevProps) {
		const {boardId, location} = this.props;
		if (boardId !== prevProps.boardId || location.search !== prevProps.location.search) {
			this.props.getPosts(boardId);
		}
	}

	render() {
		const { posts, isLoading } = this.props.post;

		if (!posts || !posts.length) {
			return (
				<Segment>
					<Loader active inline="centered" />
				</Segment>
			);
		}

		return (
			<React.Fragment>
				<Segment>
					{isLoading && <Loader active inline="centered" />}
					{isLoading && <Divider />}
					<List>
						{posts.map((p) => (
							<React.Fragment key={p._id}>
								<PostItem
									history={history}
									title={p.title}
									author={p.userId}
									boardImgSrc={`/public/static/images/avatar/board/${
										p.board
									}.jpg`}
									createdAt={getHiddoutTime(p.createTime)}
									postId={hiddoutViewer.encodeId(p._id)}
								/>
								<Divider />
							</React.Fragment>
						))}
					</List>
				</Segment>

				<ListFooter/>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		post: state.post,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getPosts: (id) => dispatch(getPosts(id)),
	};
};

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps,
)(PostList));
