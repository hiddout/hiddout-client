// @flow
import {
	CORRECT_REDUCERS_VERSION,
	REQUEST_CHANGE_POST_LANGUAGE,
	REQUEST_DELETE_POST,
	REQUEST_LOCK_POST,
	REQUEST_MOVE_POST,
} from '../actions/actionType';

export type AdminState = { currentAction: string };

const initState =  { currentAction: '' };

const admin = (state: AdminState = initState, action: Action) =>
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
				break;
			case CORRECT_REDUCERS_VERSION:
				return initState;
		}
	});

export { admin };