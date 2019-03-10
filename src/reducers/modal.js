// @flow
import { CLOSE_LOGIN_MODAL, CLOSE_SIGN_UP_MODAL, OPEN_LOGIN_MODAL, OPEN_SIGN_UP_MODAL } from '../actions/actionType';

type State = {
	loginModalShowed: boolean,
	signUpModalShowed: boolean,
};

type Action = {
	type: string,
	payload: {
		[key: any]: any,
	},
};

const initState = {
	loginModalShowed: false,
	signUpModalShowed: false,
};

const modal = (state: State = initState, action: Action) =>
	immer.produce(state, (draft) => {
		switch (action.type) {
			case OPEN_LOGIN_MODAL:
			case CLOSE_SIGN_UP_MODAL:
				draft.loginModalShowed = true;
				draft.signUpModalShowed = false;
				break;
			case CLOSE_LOGIN_MODAL:
			case OPEN_SIGN_UP_MODAL:
				draft.loginModalShowed = false;
				draft.signUpModalShowed = true;
				break;
		}
	});

export { modal };
