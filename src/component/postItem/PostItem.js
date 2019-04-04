// @flow
import React from 'react';
import { List, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

type Props = {
	title: string,
	author: string,
	postId: string,
	boardImgSrc: string,
	createdAt: number,
};

type State = {};

class PostItem extends React.Component<Props, State> {
	render() {
		const { title, author, boardImgSrc, createdAt, postId } = this.props;

		return (
			<List.Item>
				<Image avatar src={boardImgSrc} />
				<List.Content>
					<List.Header>
						<Link to={`/p/${postId}`}>{title}</Link>
					</List.Header>
					<List.Description>
						post by{' '}
						<a>
							<b>{author}</b>
						</a>{' '}
						{createdAt} ago
					</List.Description>
				</List.Content>
			</List.Item>
		);
	}
}

export { PostItem };
