// @flow
import { LOGIN, LOGOUT, SIGN_UP } from '../actions/actionType';

export type AccountState = { user: string };

const account = (state: AccountState = {user: '' }, action: Action) =>
	immer.produce(state, draft => {

		const payload = action.payload;

		switch (action.type) {
			case SIGN_UP :
			case LOGIN:
				draft.user = payload.user;
				break;
			case LOGOUT:
				draft.user = '';
				break;
		}
	});

export { account };