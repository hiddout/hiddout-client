import {
	CLOSE_LOGIN_MODAL,
	CLOSE_SIGN_UP_MODAL,
	LOGIN, LOGOUT,
	OPEN_LOGIN_MODAL,
	OPEN_SIGN_UP_MODAL, REQUEST_LOGIN,
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
			dispatch({ type: LOGIN, payload: { token: res.token, user: userData.user }  });
		}).catch(e => {
			console.error(e);
		});
	};
};

export const userSignUp = (userData) => {
	return (dispatch) => {
		hiddoutViewer.request(`${config.baseURL}${config.apiV1}signup`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
			body: JSON.stringify({ ...userData }),
		}).then(res => {
			checkAuth(res.status);
			if(res.isUsed){
				console.log('isUsed');
				return;
			}

			dispatch({type: CLOSE_SIGN_UP_MODAL});
			dispatch({ type: SIGNUP, payload: { token: res.token, user: userData.user } });
		}).catch(e => console.error(e));
	};
};