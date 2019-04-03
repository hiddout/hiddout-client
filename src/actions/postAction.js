import { GET_POST, REQUEST_GET_POST } from './actionType';
import { config } from '../config';
import { checkAuth } from './loginAction';

export const getPosts = () => {
	return (dispatch) => {

		dispatch({type: REQUEST_GET_POST});

		hiddoutViewer.request(`${config.baseURL}${config.apiV1}posts`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
		}).then(res => {
			checkAuth(res.status, dispatch);
			dispatch({ type: GET_POST, payload: { posts: res.posts }  });
		}).catch(e => {
			console.error(e);
		});
	};
};