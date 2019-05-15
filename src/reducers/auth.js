// @flow
import { LOGIN, LOGOUT, TO_PAGE_404, SIGNUP, PAGE_404 } from '../actions/actionType';

export type AuthState = { token: string, isAuth: boolean, show404: boolean, isAdmin: boolean, isModerator:boolean };

const auth = (state: AuthState = { token: '',isAuth: false, show404: false, isAdmin: false, isModerator: false }, action: Action) =>
	immer.produce(state, draft => {

		const payload = action.payload;

		switch (action.type) {
			case TO_PAGE_404:
				draft.show404 = true;
				break;
			case PAGE_404:
				draft.show404 = false;
				break;
			case SIGNUP:
				draft.token = `bearer ${payload.token}`;
				draft.isAuth = true;
				break;
			case LOGIN:
				draft.token = `bearer ${payload.token}`;
				draft.isAdmin = payload.isAdmin;
				draft.isAuth = true;
				break;
			case LOGOUT:
				draft.token = '';
				draft.isAuth = false;
				draft.isAdmin = false;
				break;
		}
	});

export { auth };