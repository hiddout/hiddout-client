// @flow
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
	Container,
	Segment,
	Header,
	Divider,
	Input,
	Label,
} from 'semantic-ui-react';
import { t } from 'i18next';
import SubmitForm from '../../component/submitForm/SubmitForm';
import BoardSelector from '../../component/boardSelector/BoardSelector';

const ReactMarkdown = React.lazy(() => import('react-markdown'));
const NavigationBar = React.lazy(() =>
	import('../../containers/navigationBar/NavigationBar'),
);

import type { Node } from 'react';
import { submitPost } from '../../actions/submitAction';
import type { AuthState } from '../../reducers/auth';
import type { SubmitState } from '../../reducers/submit';
import { POST_CREATED } from '../../actions/actionType';
import type { AccountState } from '../../reducers/account';

type Props = {
	auth: AuthState,
	account: AccountState,
	submit: SubmitState,
	i18n: Object,
	history: Object,
	submitPost: (Object) => any,
};

type State = {
	submitting: boolean,
	titleTooLong: boolean,
	title: string,
	content: string,
	boardSelected: string,
};

class Submit extends React.Component<Props, State> {
	state = {
		submitting: false,
		titleTooLong: false,
		title: '',
		content: '',
		boardSelected: 'life',
	};

	onBoardSelect(value) {
		this.setState({ boardSelected: value });
	}

	onSubmitPost() {
		if (!this.state.title.length || this.state.title.length > 120) {
			return;
		}

		this.setState({ submitting: true });

		const postData = {
			title: this.state.title,
			content: this.state.content,
			board: this.state.boardSelected,
			language: this.props.i18n.language,
		};

		this.props.submitPost(postData).then((response: Object) => {
			if (response.type === POST_CREATED) {
				this.props.history.replace(
					`/p/${hiddoutViewer.encodeId(
						response.payload.cratedPostId,
					)}`,
				);
			}
		});
	}

	render(): Node {
		//TODO: warp a component for render markdown elements
		const MarkdownComponent: any = ReactMarkdown;
		return (
			<React.Fragment>
				<NavigationBar showBackBtn={true} />
				<Container className={'PageContent'} textAlign={'left'}>
					<Segment>
						<Header>
							{`${t('putPostIn')} `}
							<BoardSelector
								exclude={['home', 'spam']}
								onSelectChange={this.onBoardSelect.bind(this)}
							/>
						</Header>
						<Header floated={'right'}>{t('submitAPost')}</Header>
						<Label basic color="blue" style={{ cursor: 'default' }}>
							{t(this.props.i18n.language)}
						</Label>
						<Divider clearing />
						<Input
							error={this.state.titleTooLong}
							placeholder={t('title')}
							size={'large'}
							onChange={(e, data) =>
								this.setState({
									title: data.value,
									titleTooLong: data.value.length > 120,
								})
							}
						/>
						<Divider hidden />
						<SubmitForm
							disabled={this.state.submitting}
							ButtonText={t('submit')}
							onClick={this.onSubmitPost.bind(this)}
							onChange={(e, data) =>
								this.setState({ content: data.value })
							}
						/>

						<Divider />

						<Container
							textAlign="justified"
							style={{ overflowX: 'auto' }}
						>
							<MarkdownComponent
								source={this.state.content}
								renderers={{
									image: (props) => {
										return (
											<img
												{...props}
												style={{ maxWidth: '100%' }}
											/>
										);
									},
									link: (props) => {
										return (
											<a
												href={props.href}
												rel={'noopener noreferrer'}
												target={'_blank'}
											>
												{props.children}
											</a>
										);
									},
								}}
							/>
						</Container>
					</Segment>
				</Container>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		account: state.account,
		submit: state.submit,
		i18n: state.i18n,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		submitPost: (post) => dispatch(submitPost(post)),
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps,
	)(Submit),
);
