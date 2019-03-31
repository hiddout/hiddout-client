// @flow
import React from 'react';
import { List, Image } from 'semantic-ui-react';

type Props = {
	title: string,
	author: string,
	boardImgSrc: string,
	createdAt: number,
};

type State = {};

class Post extends React.Component<Props, State> {

	render(){

		const {title, author, boardImgSrc, createdAt} = this.props;

		return (<List.Item>
			<Image
				avatar
				src={boardImgSrc}
			/>
			<List.Content>
				<List.Header as="a">{title}</List.Header>
				<List.Description>
					post by{' '}
					<a>
						<b>{author}</b>
					</a>{' '}
					{createdAt} ago
				</List.Description>
			</List.Content>
		</List.Item>);
	}
}


export {Post};
