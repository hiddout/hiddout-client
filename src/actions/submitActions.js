import { SUBMIT_POST } from './actionType';
import { config } from '../config';
import { checkAuth } from './loginAction';

export const submitPost = (postData) => {
	return (dispatch, getState) => {

		const {auth} = getState();

		dispatch({type: SUBMIT_POST});

		hiddoutViewer.request(`${config.baseURL}${config.apiV1}posts`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				'authorization': auth.token,
			},
			body: JSON.stringify(postData),
		}).then(res => {
			checkAuth(res.status, dispatch);
			// dispatch({ type: GET_POST, payload: { post: res.post }  });
		}).catch(e => {
			console.error(e);
		});
	};
};