import { config } from '../config';
import { checkAuth } from './loginAction';
import { SUB_EXIST } from './actionType';

export const getBoard = (Id) => {
	return (dispatch) => {
		return hiddoutViewer
			.request(`${config.baseURL}${config.apiV1}boards?name=${Id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
				},
			})
			.then((res) => {
				return dispatch(checkAuth(res.status, { type: SUB_EXIST }));
			})
			.catch((e) => {
				console.error(e);
			});
	};
};
