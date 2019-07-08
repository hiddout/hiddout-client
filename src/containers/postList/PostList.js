// @flow
import React from 'react';
import { withRouter } from 'react-router-dom';
import { List, Segment, Divider, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/postAction';
import PostItem from '../../component/postItem/PostItem';

import { getHiddoutTime } from '../../utils/commonUtil';

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

type State = {
	width: number,
};

class PostList extends React.Component<Props, State> {
	state = {
		width: window.innerWidth,
	};

	componentDidMount() {
		this.props.getPosts(this.props.boardId);
		window.addEventListener('resize', this.updateDimensions.bind(this));
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateDimensions.bind(this));
	}

	componentDidUpdate(prevProps) {
		const { boardId, location } = this.props;
		if (
			boardId !== prevProps.boardId ||
			location.search !== prevProps.location.search
		) {
			this.props.getPosts(boardId);
		}
	}

	updateDimensions() {
		this.setState({ width: window.innerWidth });
	}

	render() {
		const { posts, isLoading } = this.props.post;

		if (isLoading && (!posts || !posts.length)) {
			return (
				<Segment>
					<Loader active inline="centered"/>
				</Segment>
			);
		}

		if (!isLoading && (!posts || !posts.length)) {
			return (
				<Segment>
					<h3> No post found or change your language filter </h3>
				</Segment>
			);
		}

		return (
			<React.Fragment>
				<Segment>
					{isLoading && <Loader active inline="centered"/>}
					{isLoading && <Divider/>}
					<List>
						{posts.map((p) => {
							const titleLength = p.title.length;
							let shouldReduceTitl = false;
							const maxCharacterNumber = this.state.width / 12;
							if (titleLength > maxCharacterNumber) {
								shouldReduceTitl = true;
							}
							return (
								<React.Fragment key={p._id}>
									<PostItem
										history={history}
										title={
											shouldReduceTitl
												? `${p.title.substring(
												0,
												maxCharacterNumber,
												)}...`
												: p.title
										}
										author={p.userId}
										boardImgSrc={`/public/static/images/avatar/board/${
											p.board
											}.jpg`}
										createdAt={getHiddoutTime(p.createTime)}
										postId={hiddoutViewer.encodeId(p._id)}
									/>
									<Divider/>
								</React.Fragment>
							);
						})}
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

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps,
	)(PostList),
);
