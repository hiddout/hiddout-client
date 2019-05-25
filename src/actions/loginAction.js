import {
	CLOSE_LOGIN_MODAL,
	CLOSE_SIGN_UP_MODAL,
	LOGIN,
	LOGOUT,
	OPEN_LOGIN_MODAL,
	OPEN_SIGN_UP_MODAL,
	TO_PAGE_404,
	REQUEST_LOGIN,
	SIGN_UP,
	RENEW_TOKEN,
} from './actionType';
import { config } from '../config';

const TOKEN_PREFIX_NUMBER = 7;

export const logout = () => {
	return { type: LOGOUT };
};

export const closeLoginModal = () => {
	return { type: CLOSE_LOGIN_MODAL };
};

export const openLoginModal = () => {
	return { type: OPEN_LOGIN_MODAL };
};

export const openSignUpModal = () => {
	return { type: OPEN_SIGN_UP_MODAL };
};

export const closeSignUpModal = () => {
	return { type: CLOSE_SIGN_UP_MODAL };
};

export const checkAuth = (status, defaultAction, callback, callbackData) => {
	return (dispatch) => {
		if (!status) {
			return dispatch(defaultAction);
		}

		switch (status) {
			case 401:
				if (!callback) {
					dispatch({ type: LOGOUT });
					dispatch({ type: OPEN_LOGIN_MODAL });
					throw new Error('token invalid');
				}
				return dispatch(renewToken(callback, callbackData));
			case 404:
				dispatch({ type: TO_PAGE_404 });
				throw new Error('page not found');
			case 200:
			default:
				return dispatch(defaultAction);
		}
	};
};

const checkTokenRenewStatus = (status, defaultAction) => {
	return (dispatch) => {
		if (!status) {
			return dispatch(defaultAction);
		}

		switch (status) {
			case 400:
			case 401:
				dispatch({ type: LOGOUT });
				dispatch({ type: OPEN_LOGIN_MODAL });
				throw new Error('token invalid');
			case 404:
				dispatch({ type: TO_PAGE_404 });
				throw new Error('page not found');
			case 200:
			default:
				return dispatch(defaultAction);
		}
	};
};

export const renewToken = (callback, callbackData) => {
	return (dispatch, getState) => {
		const { auth } = getState();
		return hiddoutViewer
			.request(`${config.baseURL}${config.apiV1}renewToken`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
				},
				body: JSON.stringify({
					token: auth.token.slice(TOKEN_PREFIX_NUMBER),
					tokenKey: auth.tokenKey,
				}),
			})
			.then((res) => {
				dispatch(
					checkTokenRenewStatus(res.status, {
						type: RENEW_TOKEN,
						payload: { token: res.token },
					}),
				);
				return dispatch(callback(callbackData));
			})
			.catch((e) => {
				console.error(e);
			});
	};
};

export const userLogin = (userData) => {
	return (dispatch) => {
		dispatch({ type: REQUEST_LOGIN });

		return hiddoutViewer
			.request(`${config.baseURL}${config.apiV1}login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
				},
				body: JSON.stringify({ ...userData }),
			})
			.then((res) => {
				return dispatch(
					checkAuth(res.status, {
						type: LOGIN,
						payload: {
							token: res.token,
							tokenKey: res.tokenKey,
							user: userData.user,
							isAdmin: res.isAdmin,
						},
					}),
				);
			})
			.catch((e) => {
				console.error(e);
			});
	};
};

export const userSignUp = (userData) => {
	return (dispatch) => {
		return hiddoutViewer
			.request(`${config.baseURL}${config.apiV1}signup`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
				},
				body: JSON.stringify({ ...userData }),
			})
			.then((res) => {
				return dispatch(
					checkAuth(res.status, {
						type: SIGN_UP,
						payload: {
							token: res.token,
							tokenKey: res.tokenKey,
							user: userData.user,
						},
					}),
				);
			})
			.catch((e) => console.error(e));
	};
};
