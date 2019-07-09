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
	RENEW_TOKEN, REQUEST_CHANGE_PASSWORD, PASSWORD_CHANGED,
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
			case 500:
				throw new Error('server error');
			case 429:
				throw new Error('too many requests');
			case 400:
				throw new Error('bad request');
			case 401:
				if (!callback) {
					dispatch({ type: LOGOUT });
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

const checkTokenRenewStatus = (res, defaultAction) => {
	return (dispatch) => {
		if (!res.status) {
			return dispatch(defaultAction);
		}

		switch (res.status) {
			case 500:
				throw new Error('server error');
			case 429:
				throw new Error('too many requests');
			case 400:
				throw new Error('bad request');
			case 401:
				dispatch({ type: LOGOUT });
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
					checkTokenRenewStatus(res, {
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

export const changePassword = (pwhData) => {
	return (dispatch, getState) => {
		const { auth } = getState();
		dispatch({type: REQUEST_CHANGE_PASSWORD});

		return hiddoutViewer
			.request(`${config.baseURL}${config.apiV1}changePassWord`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
					authorization: auth.token,
				},
				body: JSON.stringify({ ...pwhData }),
			})
			.then((res) => {
				return dispatch(
					checkAuth(res.status, (dispatch) => {
						if(!res.changed){
							throw Error('password not changed');
						}

						return dispatch({
							type: PASSWORD_CHANGED,
							payload: {
								token: res.token,
								tokenKey: res.tokenKey,
								isAdmin: res.isAdmin,
							},
						});
					},changePassword,pwhData),
				);
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
