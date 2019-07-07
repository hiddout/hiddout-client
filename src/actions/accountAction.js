import { ACCOUNT_DELETED, CLOSE_ACCOUNT_MODAL, OPEN_ACCOUNT_MODAL } from './actionType';
import { config } from '../config';

export const openAccountModal = () => {
	return {type: OPEN_ACCOUNT_MODAL};
};

export const closeAccountModal = () => {
	return {type: CLOSE_ACCOUNT_MODAL};
};

export const deleteAccount = (account) => {
	return (dispatch) => {
		return hiddoutViewer
			.request(`${config.baseURL}${config.apiV1}account/delete`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
				},
				body:JSON.stringify(account),
			})
			.then((res) => {
				if(res.isDone){
					return dispatch({ type: ACCOUNT_DELETED, payload: {isDone: res.isDone} });
				}

				throw Error('Account deleted failed');
			})
			.catch((e) => {
				console.error(e);
			});
	};
};