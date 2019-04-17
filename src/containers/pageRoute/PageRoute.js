import React from 'react';
import {connect} from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

class PageRoute extends React.Component {

	componentDidUpdate(prevProps) {
		if (this.props.location !== prevProps.location && this.props.location.pathname !== '/') {
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
	};
};

export default withRouter(
	connect(
		mapStateToProps,
	)(PageRoute),
);
