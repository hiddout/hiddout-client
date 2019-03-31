// @flow
import React from 'react';
import { List, Placeholder, Segment, Divider } from 'semantic-ui-react';
import { Post } from '../../component/post/Post';

type Props = {};

type State = {};

class PostList extends React.Component<Props, State> {



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

export { PostList };
