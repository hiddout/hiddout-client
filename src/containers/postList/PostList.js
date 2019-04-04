// @flow
import React from 'react';
import { List, Placeholder, Segment, Divider } from 'semantic-ui-react';
import { PostItem } from '../../component/postItem/PostItem';
import {connect} from 'react-redux';
import { getPosts } from '../../actions/postAction';

type Props = {
	post: Array<Object>;
	getPosts: () => void;
};

type State = {
};

class PostList extends React.Component<Props, State> {

	componentDidMount = () => {
		this.props.getPosts();
	};

	render() {

		const {post} = this.props;

		return (
			<Segment>
				<List>

					{post.posts.map(p => (<React.Fragment key={p._id}>
						<PostItem
							title={p.title}
							author={p.userId}
							boardImgSrc={
								'https://react.semantic-ui.com/images/wireframe/image.png'
							}
							createdAt={p.createTime}
							postId={hiddoutViewer.encodeId(p._id)}
						/>
						<Divider />
					</React.Fragment>))}

					{/*<Placeholder>*/}
						{/*<Placeholder.Header image>*/}
							{/*<Placeholder.Line />*/}
							{/*<Placeholder.Line />*/}
						{/*</Placeholder.Header>*/}
					{/*</Placeholder>*/}
					{/*<Divider />*/}
				</List>
			</Segment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		i18n: state.i18n,
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

const postList = connect(
	mapStateToProps,
	mapDispatchToProps,
)(PostList);

export { postList as PostList };
