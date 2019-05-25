// @flow
import { REQUEST_DELETE_POST, REQUEST_LOCK_POST, REQUEST_MOVE_POST } from '../actions/actionType';

export type AccountState = { currentAction: string };

const admin = (state: AccountState = { currentAction: '' }, action: Action) =>
	immer.produce(state, draft => {

		//const payload = action.payload || {};

		switch (action.type) {
			case REQUEST_LOCK_POST :
				draft.currentAction = REQUEST_LOCK_POST;
				break;
			case REQUEST_DELETE_POST:
				draft.currentAction = REQUEST_DELETE_POST;
				break;
			case REQUEST_MOVE_POST:
				draft.currentAction = REQUEST_MOVE_POST;
				break;
		}
	});

export { admin };