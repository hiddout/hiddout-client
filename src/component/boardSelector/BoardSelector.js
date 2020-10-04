// @flow
import { Dropdown, Image } from 'semantic-ui-react';
import { t } from 'i18next';
import React from 'react';

type Props = {
	value?: string,
	exclude?: Array<string>,
	onSelectChange: (string) => any,
};

type State = {
	options: Array<Object>,
	value: string,
};


class BoardSelector extends React.Component<Props, State> {
	constructor(props: Props){
		super(props);

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
				key: 'shareBoard',
				text: t('shareBoard'),
				value: 'share',
				image: {
					avatar: true,
					src: '/public/static/images/avatar/board/share.jpg',
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

		const exclude = this.props.exclude;

		if(exclude){
			filterOptions = allOptions.filter(option => {
				return exclude.indexOf(option.value) < 0;
			});
		}

		this.state = {
			options: filterOptions,
			value: filterOptions[0].value,
		};
	}

	onDropdownClick(e: Object, { value }: Object) {
		this.setState({ value }, () => this.props.onSelectChange(value));
	}

	render() {
		return (
			<span>
				<Image
					src={`/public/static/images/avatar/board/${
						this.props.value? this.props.value : this.state.value
					}.jpg`}
					avatar
				/>
				<Dropdown
					inline
					options={this.state.options}
					value={this.props.value? this.props.value : this.state.value}
					onChange={this.onDropdownClick.bind(this)}
				/>
			</span>
		);
	}
}

export default BoardSelector;
