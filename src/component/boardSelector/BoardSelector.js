// @flow
import { Dropdown, Header } from 'semantic-ui-react';
import { t } from 'i18next';
import React from 'react';

type Props = {
	onSelectChange: (string) => any,
};

type State = {};

class BoardSelector extends React.Component<Props, State> {
	onDropdownClick(e: Object, { value }: Object) {
		this.props.onSelectChange(value);
	}

	render() {
		const friendOptions = [
			{
				key: 'lifeBoard',
				text: t('lifeBoard'),
				value: 'life',
				image: { avatar: true, src: '/images/avatar/board/life.jpg' },
			},
			{
				key: 'gameBoard',
				text: t('gameBoard'),
				value: 'game',
				image: { avatar: true, src: '/images/avatar/board/game.jpg' },
			},
			{
				key: 'workBoard',
				text: t('workBoard'),
				value: 'work',
				image: { avatar: true, src: '/images/avatar/board/work.jpg' },
			},
			{
				key: 'spamBoard',
				text: t('spamBoard'),
				value: 'spam',
				image: {
					avatar: true,
					src: '/images/avatar/board/spam.jpg',
				},
			},
		];

		return (
			<span>
				<Header>
					Put post in{' '}
					<Dropdown
						inline
						options={friendOptions}
						defaultValue={friendOptions[0].value}
						onChange={this.onDropdownClick.bind(this)}
					/>
				</Header>
			</span>
		);
	}
}

export default BoardSelector;
