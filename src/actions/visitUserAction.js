import { GET_USER, REQUEST_GET_USER } from './actionType';
import { config } from '../config';
import { checkAuth } from './loginAction';

export const getUser = (id) => {
	return (dispatch) => {
		dispatch({type: REQUEST_GET_USER});

		return hiddoutViewer.request(`${config.baseURL}${config.apiV1}user/${id}`,{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
		}).then(res => {
			checkAuth(res.status, dispatch);
			return dispatch({ type: GET_USER, payload: { user: res.user }  });
		}).catch(e => {
			console.error(e);
		});
	};
};