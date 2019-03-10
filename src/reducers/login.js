// @flow
import { CLOSE_LOGIN_MODAL, OPEN_LOGIN_MODAL } from '../actions/actionType';

type State = { modalVisibility: boolean };

type Action = {
	type: string,
	payload: {
		[key: any]: any,
	},
};

const initState = { modalVisibility: false };

const login = (state: State = initState, action: Action) =>
	immer.produce(state, (draft) => {
		switch (action.type) {
			case OPEN_LOGIN_MODAL:
				draft.modalVisibility = true;
				break;
			case CLOSE_LOGIN_MODAL:
				draft.modalVisibility = false;
				break;
		}
	});

export { login };
