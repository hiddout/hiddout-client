// @flow
import React from 'react';
import { List, Segment, Divider, Placeholder } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/postAction';
import PostItem from '../../component/postItem/PostItem';

import {getHiddoutTime} from '../../utils/dataUtil';

import type { PostState } from '../../reducers/post';

type Props = {
	post: PostState;
	getPosts: () => void;
};

type State = {};

class PostList extends React.Component<Props, State> {

	componentDidMount = () => {
		this.props.getPosts();
	};

	render() {

		const { posts } = this.props.post;

		if (!posts || !posts.length) {
			return (
				<Segment>
					<Placeholder>
						<Placeholder.Header image>
							<Placeholder.Line length='medium' />
							<Placeholder.Line length='full' />
						</Placeholder.Header>
					</Placeholder>
				</Segment>);
		}

		return (
			<Segment>
				<List>
					{posts.map(p => (<React.Fragment key={p._id}>
						<PostItem
							title={p.title}
							author={p.userId}
							boardImgSrc={
								'https://react.semantic-ui.com/images/wireframe/image.png'
							}
							createdAt={getHiddoutTime(p.createTime)}
							postId={hiddoutViewer.encodeId(p._id)}
						/>
						<Divider/>
					</React.Fragment>))}
				</List>
			</Segment>
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
		getPosts: () => {
			dispatch(getPosts());
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(PostList);
