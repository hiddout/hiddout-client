import React from 'react';
import {connect} from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

class PageRoute extends React.Component {

	componentDidUpdate(prevProps) {
		const {location, pageMarker} = this.props;
		if (location !== prevProps.location && location.pathname !== '/' || pageMarker.currentPage !== prevProps.pageMarker.currentPage) {
			window.scrollTo(0, 0);
		}
	}

	render() {

		return (
			<Route
				{...this.props}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		pageMarker: state.pageMarker,
	};
};

export default withRouter(
	connect(
		mapStateToProps,
	)(PageRoute),
);
