// @flow
import { Dropdown, Image } from 'semantic-ui-react';
import { t } from 'i18next';
import React from 'react';

type Props = {
	exclude?: string,
	onSelectChange: (string) => any,
};

type State = {
	value: string,
};


class BoardSelector extends React.Component<Props, State> {
	constructor(props: Props){
		super(props);
		this.state = {
			value: props.exclude === 'home' ? 'life' : 'home',
		};
	}

	onDropdownClick(e: Object, { value }: Object) {
		this.setState({ value }, () => this.props.onSelectChange(value));
	}

	render() {

		const allOptions = [
			{
				key: 'allPost',
				text: t('allPost'),
				value: 'home',
				image: {
					avatar: true,
					src: '/public/static/images/avatar/board/home.jpg',
				},
			},
			{
				key: 'lifeBoard',
				text: t('lifeBoard'),
				value: 'life',
				image: {
					avatar: true,
					src: '/public/static/images/avatar/board/life.jpg',
				},
			},
			{
				key: 'gameBoard',
				text: t('gameBoard'),
				value: 'game',
				image: {
					avatar: true,
					src: '/public/static/images/avatar/board/game.jpg',
				},
			},
			{
				key: 'workBoard',
				text: t('workBoard'),
				value: 'work',
				image: {
					avatar: true,
					src: '/public/static/images/avatar/board/work.jpg',
				},
			},
			{
				key: 'spamBoard',
				text: t('spamBoard'),
				value: 'spam',
				image: {
					avatar: true,
					src: '/public/static/images/avatar/board/spam.jpg',
				},
			},
		];

		let filterOptions = allOptions;

		if(this.props.exclude){
			filterOptions = allOptions.filter(option => option.value !== this.props.exclude );
		}

		return (
			<span>
				<Image
					src={`/public/static/images/avatar/board/${
						this.state.value
					}.jpg`}
					avatar
				/>
				<Dropdown
					inline
					options={filterOptions}
					defaultValue={filterOptions[0].value}
					onChange={this.onDropdownClick.bind(this)}
				/>
			</span>
		);
	}
}

export default BoardSelector;
