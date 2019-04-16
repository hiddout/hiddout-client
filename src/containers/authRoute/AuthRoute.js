import React from 'react';
import {connect} from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { openLoginModal } from '../../actions/loginAction';

class AuthRoute extends React.Component {
	redirectToLogin() {
		this.props.openLoginMdoal();
		return (
			<Redirect
				to={{
					pathname: '/',
					state: { from: this.props.location },
				}}
			/>
		);
	}

	render() {
		const { component: Component, auth, ...rest } = this.props;

		return (
			<Route
				{...rest}
				render={(props) =>
					auth.isAuth ? (
						<Component {...props} />
					) : (
						this.redirectToLogin()
					)
				}
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
		openLoginMdoal: () => {
			dispatch(openLoginModal());
		},
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps,
	)(AuthRoute),
);