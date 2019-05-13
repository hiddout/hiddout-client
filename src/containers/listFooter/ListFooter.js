// @flow
import React from 'react';
import { t } from 'i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Button } from 'semantic-ui-react';
import type { PageMarkerState } from '../../reducers/pageMarker';
import { goPage } from '../../actions/postAction';

type Props = {
	goPage: (number) => any,
	pageMarker: PageMarkerState,
};

type State = {
	navigating: boolean,
};

class ListFooter extends React.Component<Props, State> {

	state = {navigating: false};

	render() {
		const { goPage } = this.props;

		const { currentPage, isLatest } = this.props.pageMarker;

		return (
			<React.Fragment>
				{!!currentPage && (
					<Button
						disabled={this.state.navigating}
						secondary
						floated="left"
						onClick={() => {
							goPage(currentPage - 1);
						}}
					>
						{t('previousPage')}
					</Button>
				)}
				{!isLatest && (
					<Button
						disabled={this.state.navigating}
						color="green"
						floated="right"
						onClick={() => {
							goPage(currentPage + 1);
						}}
					>
						{t('nextPage')}
					</Button>
				)}
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		pageMarker: state.pageMarker,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		goPage: (number) => dispatch(goPage(number)),
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps,
	)(ListFooter),
);
