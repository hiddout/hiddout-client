// @flow
import { GET_SUBSCRIPTION, LOGIN, LOGOUT, SIGN_UP } from '../actions/actionType';

export type AccountState = { user: string, subscriptions: Array<Object> };

const account = (state: AccountState = {user: '', subscriptions:[] }, action: Action) =>
	immer.produce(state, draft => {

		const payload = action.payload || {};

		switch (action.type) {
			case SIGN_UP :
			case LOGIN:
				draft.user = payload.user;
				break;
			case LOGOUT:
				draft.user = '';
				break;
			case GET_SUBSCRIPTION:
				draft.subscriptions = payload.subscriptions;
				break;
		}
	});

export { account };