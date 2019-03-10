import {
	CLOSE_LOGIN_MODAL,
	CLOSE_SIGN_UP_MODAL,
	LOGIN,
	OPEN_LOGIN_MODAL,
	OPEN_SIGN_UP_MODAL,
	SIGNUP,
} from './actionType';
import { config } from '../config';

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
	return {type: CLOSE_SIGN_UP_MODAL};
}

export const userLogin = (userData) => {

	return (dispatch) => {
		dispatch({ type: LOGIN });

		hiddoutViewer.request(`${config.baseURL}${config.apiV1}login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
			body: JSON.stringify({ ...userData }),
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
			console.log(res);
			dispatch({type: SIGNUP, payload:{token: res.token}});
		}).catch(e => console.error(e));
	};
};