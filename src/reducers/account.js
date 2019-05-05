// @flow
import { LOGIN, LOGOUT, SIGNUP } from '../actions/actionType';

export type AccountState = { user: string };

const account = (state: AccountState = {user: '' }, action: Action) =>
	immer.produce(state, draft => {

		const payload = action.payload;

		switch (action.type) {
			case SIGNUP :
			case LOGIN:
				draft.user = payload.user;
				break;
			case LOGOUT:
				draft.user = '';
				break;
		}
	});

export { account };