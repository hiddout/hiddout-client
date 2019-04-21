import { COMMENT_SUBMITTED, POST_CREATED, REQUEST_SUBMIT_COMMENT, SUBMIT_POST } from './actionType';
import { config } from '../config';
import { checkAuth } from './loginAction';

export const submitPost = (postData) => {
	return (dispatch, getState) => {

		const {auth} = getState();

		dispatch({type: SUBMIT_POST});

		return hiddoutViewer.request(`${config.baseURL}${config.apiV1}posts`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				'authorization': auth.token,
			},
			body: JSON.stringify(postData),
		}).then(res => {
			checkAuth(res.status, dispatch);
			return dispatch({ type: POST_CREATED, payload: { cratedPostId: res.insertedId }  });
		}).catch(e => {
			console.error(e);
		});
	};
};

export const submitComment = (commentData) => {
	return (dispatch, getState) => {

		const {auth} = getState();
		dispatch({type: REQUEST_SUBMIT_COMMENT});

		hiddoutViewer.request(`${config.baseURL}${config.apiV1}post/${commentData.postId}/comments`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				'authorization': auth.token,
			},
			body: JSON.stringify(commentData),
		}).then(res => {
			checkAuth(res.status, dispatch);
			dispatch({ type: COMMENT_SUBMITTED  });
		}).catch(e => {
			console.error(e);
		});
	};
};