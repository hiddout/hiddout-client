// @flow
import { Dropdown, Header } from 'semantic-ui-react';
import { t } from 'i18next';
import React from 'react';

type Props = {};

type State = {};

class BoardSelector extends React.Component<Props,State>{
	render(){
		const friendOptions = [
			{
				key: 'lifeBoard',
				text: t('lifeBoard'),
				value: 'life',
				image: { avatar: true, src: '/images/avatar/small/jenny.jpg' },
			},
			{
				key: 'gameBoard',
				text: t('gameBoard'),
				value: 'game',
				image: { avatar: true, src: '/images/avatar/small/elliot.jpg' },
			},
			{
				key: 'workBoard',
				text: t('workBoard'),
				value: 'work',
				image: { avatar: true, src: '/images/avatar/small/stevie.jpg' },
			},
			{
				key: 'spamBoard',
				text: t('spamBoard'),
				value: 'spam',
				image: {
					avatar: true,
					src: '/images/avatar/small/christian.jpg',
				},
			},
		];

		return (
			<span>
				<Header>Put post in {' '}
					<Dropdown
						inline
						options={friendOptions}
						defaultValue={friendOptions[0].value}
					/>
			</Header>
			</span>
		);
	}
}

export default BoardSelector;