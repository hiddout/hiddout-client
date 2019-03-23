// @flow
import { LOGIN, LOGOUT, SIGNUP } from '../actions/actionType';

type State = { token: string, isAuth: boolean, user: string };

const auth = (state: State = { token: '',isAuth: false, user: '' }, action: Action) =>
	immer.produce(state, draft => {

		const payload = action.payload;

		switch (action.type) {
			case SIGNUP :
			case LOGIN:
				draft.token = `bearer ${payload.token}`;
				draft.user = payload.user;
				draft.isAuth = true;
				break;
			case LOGOUT:
				draft.token = '';
				draft.user = '';
				draft.isAuth = false;
				break;
		}
	});

export { auth };