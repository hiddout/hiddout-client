// @flow
import React from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Container, Segment, List } from 'semantic-ui-react';

const NavigationBar = React.lazy(() =>
	import('../../containers/navigationBar/NavigationBar'),
);

import type { Node } from 'react';
import type { AccountState } from '../../reducers/account';
import { subscribePost } from '../../actions/postAction';

type Props = {
	history: Object,
	account: AccountState,
	subscribePost: (Object) => any,
};

type State = {};

class Message extends React.Component<Props, State> {
	render(): Node {

		const {subscriptionMessages} = this.props.account;

		return (
			<React.Fragment>
				<NavigationBar showBackBtn={'back'} />
				<Container className={'PageContent'} textAlign={'left'}>
					<Segment>
						{subscriptionMessages && !subscriptionMessages.length && <h3> No new message</h3>}
						{subscriptionMessages && subscriptionMessages.length > 0 && <List selection verticalAlign="middle">
							{subscriptionMessages.map(
								(message, i) => {
									return (
										<List.Item
											key={i}
											onClick={async () => {
												const encodeId = hiddoutViewer.encodeId(
													message.subscriptionId,
												);
												await this.props.subscribePost({
													id: encodeId,
													isSubscribed: true,
													type: 'post',
												});
												this.props.history.push(
													`/p/${encodeId}`,
												);
											}}
										>
											<List.Icon
												name={
													message.type === 'post'
														? 'quote left'
														: 'comment alternate'
												}
											/>
											<List.Content>
												<List.Header>
													{message.content}
												</List.Header>
												<List.Description>
													{' '}
													This post you subscribed
													just got updated{' '}
												</List.Description>
											</List.Content>
										</List.Item>
									);
								},
							)}
						</List>}
					</Segment>
				</Container>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		account: state.account,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		subscribePost: (subscriptionData) => dispatch(subscribePost(subscriptionData)),
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps,
	)(Message),
);
