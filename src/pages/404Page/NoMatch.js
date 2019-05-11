// @flow
import React from 'react';

import type { Node } from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Header, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { PAGE_404 } from '../../actions/actionType';

type Props = {};

type State = {};

class NoMatch extends React.Component<Props, State> {
	state = {};

	static getDerivedStateFromProps(props) {
		props.page404();
		return null;
	}

	render(): Node {
		return (
			<React.Fragment>
				<Container className={'pageContent'} textAlign={'left'}>
					<Segment>
						<Header as="h3">
							{' '}
							Nothing to see here 页面已经失效
						</Header>
						<p>
							The link is out of date, try to go back to home page
							to refresh again. We are refreshing url regularly in
							order to keep some necessary privacy.
						</p>
						<p>
							这个链接已经过期失效了，我们会定期更换链接路由来保证一定的用户隐私。
						</p>
						<p>
							If someone or some website is sharing this link to
							you, please do not support this action.
						</p>
						<p>
							如果你是从其他人或者网站上查找到该链接，请不要再继续使用和支持这种行为。
						</p>
					</Segment>
				</Container>
			</React.Fragment>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		page404: () => {
			dispatch({ type: PAGE_404 });
		},
	};
};

export default withRouter(
	connect(
		null,
		mapDispatchToProps,
	)(NoMatch),
);
