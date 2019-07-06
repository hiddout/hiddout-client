// @flow
import {
	REQUEST_CHANGE_POST_LANGUAGE,
	REQUEST_DELETE_POST,
	REQUEST_LOCK_POST,
	REQUEST_MOVE_POST,
} from '../actions/actionType';

export type AdminState = { currentAction: string };

const admin = (state: AdminState = { currentAction: '' }, action: Action) =>
	immer.produce(state, draft => {

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
			case REQUEST_CHANGE_POST_LANGUAGE:
				draft.currentAction = REQUEST_CHANGE_POST_LANGUAGE;
		}
	});

export { admin };