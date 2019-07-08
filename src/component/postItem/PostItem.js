// @flow
import React from 'react';
import { t } from 'i18next';
import { List, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

type Props = {
	title: string,
	author: string,
	postId: string,
	boardImgSrc: string,
	createdAt: string,
};

type State = {};

class PostItem extends React.Component<Props, State> {
	render() {
		const { title, author, boardImgSrc, createdAt, postId } = this.props;

		return (
			<List.Item>
				<List.Content>
					<List.Header style={{fontSize: '1.2em'}}>
						<Image avatar src={boardImgSrc} />
						<Link to={`/p/${postId}`}>{title}</Link>
					</List.Header>
					<List.Description>
						{t('postBy')}
						<a>
							<b>{author}</b>
						</a>
						{createdAt}
					</List.Description>
				</List.Content>
			</List.Item>
		);
	}
}

export default PostItem;
