// @flow
import { LOGIN, LOGOUT, TO_PAGE_404, SIGN_UP, PAGE_404, RENEW_TOKEN } from '../actions/actionType';

export type AuthState = { token: string, tokenKey: string, isAuth: boolean, show404: boolean, isAdmin: boolean, isModerator:boolean };

const auth = (state: AuthState = { token: '', tokenKey: '',isAuth: false, show404: false, isAdmin: false, isModerator: false }, action: Action) =>
	immer.produce(state, draft => {

		const payload = action.payload;

		switch (action.type) {
			case TO_PAGE_404:
				draft.show404 = true;
				break;
			case PAGE_404:
				draft.show404 = false;
				break;
			case SIGN_UP:
				draft.token = `bearer ${payload.token}`;
				draft.tokenKey = payload.tokenKey;
				draft.isAuth = true;
				break;
			case LOGIN:
				draft.token = `bearer ${payload.token}`;
				draft.tokenKey = payload.tokenKey;
				draft.isAdmin = payload.isAdmin;
				draft.isAuth = true;
				break;
			case RENEW_TOKEN:
				draft.token = `bearer ${payload.token}`;
				break;
			case LOGOUT:
				draft.token = '';
				draft.tokenKey = '';
				draft.isAuth = false;
				draft.isAdmin = false;
				break;
		}
	});

export { auth };