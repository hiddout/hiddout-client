// @flow
import {
	CLOSE_ADMIN_MODAL,
	CLOSE_LOGIN_MODAL,
	CLOSE_SIGN_UP_MODAL,
	OPEN_ADMIN_MODAL,
	OPEN_LOGIN_MODAL,
	OPEN_SIGN_UP_MODAL,
} from '../actions/actionType';

export type ModalState = {
	loginModalShowed: boolean,
	signUpModalShowed: boolean,
	adminModalShowed: boolean,
};

const initState = {
	loginModalShowed: false,
	signUpModalShowed: false,
	adminModalShowed: false,
};

const modal = (state: ModalState = initState, action: Action) =>
	immer.produce(state, (draft) => {
		switch (action.type) {
			case OPEN_LOGIN_MODAL:
				draft.loginModalShowed = true;
				draft.signUpModalShowed = false;
				break;
			case OPEN_SIGN_UP_MODAL:
				draft.loginModalShowed = false;
				draft.signUpModalShowed = true;
				break;
			case CLOSE_SIGN_UP_MODAL:
				draft.signUpModalShowed = false;
				break;
			case CLOSE_LOGIN_MODAL:
				draft.loginModalShowed = false;
				break;
			case OPEN_ADMIN_MODAL:
				draft.adminModalShowed = true;
				break;
			case CLOSE_ADMIN_MODAL:
				draft.adminModalShowed = false;
				break;
		}
	});

export { modal };
