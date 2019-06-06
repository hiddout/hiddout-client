// @flow
import React from 'react';
import { t } from 'i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Button } from 'semantic-ui-react';
import type { PageMarkerState } from '../../reducers/pageMarker';

type Props = {
	goPage: (number) => any,
	location: Object,
	history: Object,
	pageMarker: PageMarkerState,
};

type State = {
	navigating: boolean,
};

const PAGE_NUMBER_INDEX = 1;

class ListFooter extends React.Component<Props, State> {
	state = { navigating: false };

	onClickNext() {
		let page = null;

		const { location } = this.props;
		if (!location.search.length) {
			page = 1;
		} else {
			page = this.getCurrentPage() + 1;
		}

		this.props.history.push(`${location.pathname}?page=${page}`);
	}

	onClickPrevious() {
		const { location } = this.props;
		let page = this.getCurrentPage() - 1;
		const qureyString = page ? `?page=${page}` : '';

		this.props.history.push(`${location.pathname}${qureyString}`);
	}

	getCurrentPage() {
		const { location } = this.props;
		return parseInt(location.search.split('=')[PAGE_NUMBER_INDEX]);
	}

	render() {
		const { isLatest } = this.props.pageMarker;

		return (
			<React.Fragment>
				{!!this.getCurrentPage() && (
					<Button
						disabled={this.state.navigating}
						secondary
						floated="left"
						onClick={() => {
							this.onClickPrevious();
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
							this.onClickNext();
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

export default withRouter(connect(mapStateToProps)(ListFooter));
