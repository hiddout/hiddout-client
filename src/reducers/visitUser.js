// @flow
import { GET_USER, REQUEST_GET_USER } from '../actions/actionType';

export type UserState = { visitingUser: null|Object };

const visitUser = (state: UserState = {visitingUser: null }, action: Action) =>
	immer.produce(state, draft => {

		const payload = action.payload;

		switch (action.type) {
			case GET_USER:
				draft.visitingUser = payload.user;
				break;
			case REQUEST_GET_USER:
				draft.visitingUser = null;
				break;
		}
	});

export { visitUser };