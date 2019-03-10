import { CLOSE_LOGIN_MODAL, OPEN_LOGIN_MODAL } from './actionType';

export const closeLoginModal = ()=> {
	return {type: CLOSE_LOGIN_MODAL};
};

export const openLoginModal = () => {
	return {type: OPEN_LOGIN_MODAL}
};