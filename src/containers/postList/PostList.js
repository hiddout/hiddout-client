// @flow
import React from 'react';
import { List, Placeholder, Segment, Divider } from 'semantic-ui-react';
import { Post } from '../../component/post/Post';
import {connect} from 'react-redux';
import { getPosts } from '../../actions/postAction';

type Props = {
	getPosts: () => void;
};

type State = {};

class PostList extends React.Component<Props, State> {

	componentDidMount = () => {
		this.props.getPosts();
	};

	render() {
		return (
			<Segment>
				<List>
					<Post
						title={'titleOne'}
						author={'Rachel'}
						boardImgSrc={
							'https://react.semantic-ui.com/images/wireframe/image.png'
						}
						createdAt={12}
					/>
					<Divider />
					<Placeholder>
						<Placeholder.Header image>
							<Placeholder.Line />
							<Placeholder.Line />
						</Placeholder.Header>
					</Placeholder>
					<Divider />
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
