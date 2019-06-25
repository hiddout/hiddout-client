// @flow
import { GET_SUBSCRIPTION, LOGIN, LOGOUT, SIGN_UP } from '../actions/actionType';

export type AccountState = { user: string, subscriptionMessages: Array<Object> };

const account = (state: AccountState = {user: '', subscriptionMessages:[] }, action: Action) =>
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
				draft.subscriptionMessages = payload.subscriptionMessages;
				break;
		}
	});

export { account };