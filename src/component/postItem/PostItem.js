// @flow
import React from 'react';
import { t } from 'i18next';
import { List, Image, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

type Props = {
	title: string,
	author: string,
	postId: string,
	boardImgSrc: string,
	createdAt: string,
	reply: number,
};

type State = {};

class PostItem extends React.Component<Props, State> {
	render() {
		const { title, author, boardImgSrc, createdAt, postId, reply } = this.props;

		return (
			<List.Item style={{overflow:'hidden'}}>
				<List.Content>
					<List.Header style={{fontSize: '1.2em'}}>
						<Image avatar src={boardImgSrc} />
						<Link to={`/p/${postId}`}>{title}</Link>
						<Label size={'mini'} color={'black'} style={{float:'right'}}>
							{reply? reply : 0}
						</Label>
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
