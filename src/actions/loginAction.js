import {
	CLOSE_LOGIN_MODAL,
	CLOSE_SIGN_UP_MODAL,
	LOGIN, LOGOUT,
	OPEN_LOGIN_MODAL,
	OPEN_SIGN_UP_MODAL, TO_PAGE_404, REQUEST_LOGIN,
	SIGNUP,
} from './actionType';
import { config } from '../config';

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

export const checkAuth = (status, dispatch) => {
	if (!status) {
		return null;
	}

	switch (status) {
		case 401:
			dispatch({ type: LOGOUT });
			dispatch({ type: OPEN_LOGIN_MODAL });
			throw new Error('token invalid');
		case 404:
			dispatch({type: TO_PAGE_404});
			throw new Error('page not found');
		case 200:
		default:
			break;
	}
};

export const userLogin = (userData) => {

	return (dispatch) => {

		dispatch({type: REQUEST_LOGIN});

		return hiddoutViewer.request(`${config.baseURL}${config.apiV1}login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
			body: JSON.stringify({ ...userData }),
		}).then(res => {
			checkAuth(res.status, dispatch);
			return dispatch({ type: LOGIN, payload: { token: res.token, user: userData.user, isAdmin:res.isAdmin }  });
		}).catch(e => {
			console.error(e);
		});
	};
};

export const userSignUp = (userData) => {
	return (dispatch) => {
		return hiddoutViewer.request(`${config.baseURL}${config.apiV1}signup`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
			body: JSON.stringify({ ...userData }),
		}).then(res => {
			checkAuth(res.status);
			dispatch({type: CLOSE_SIGN_UP_MODAL});
			return dispatch({ type: SIGNUP, payload: { token: res.token, user: userData.user } });
		}).catch(e => console.error(e));
	};
};