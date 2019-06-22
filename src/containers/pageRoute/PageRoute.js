import React from 'react';
import {connect} from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import { getSubscriptio } from '../../actions/noticeboardAction';

class PageRoute extends React.Component {

	componentDidMount(){
		if(this.props.auth.isAuth) {
			this.props.getSubscriptios();
		}
	}

	componentDidUpdate(prevProps) {
		const {location} = this.props;
		if (location !== prevProps.location && location.pathname !== '/' || location.search !== prevProps.location.search) {
			window.scrollTo(0, 0);

			if(this.props.auth.isAuth) {
				this.props.getSubscriptios();
			}
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

const mapDispatchToProps = (dispatch) => {
	return {
		getSubscriptios: () => dispatch(getSubscriptio()),
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps,
	)(PageRoute),
);
