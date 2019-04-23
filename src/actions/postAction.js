import {
	GET_COMMENTS,
	GET_POST,
	GET_POSTS, REPLY_TO,
	REQUEST_GET_COMMENTS,
	REQUEST_GET_POST,
	REQUEST_GET_POSTS,
} from './actionType';
import { config } from '../config';
import { checkAuth } from './loginAction';

export const getPosts = (boardId) => {
	return (dispatch) => {

		dispatch({type: REQUEST_GET_POSTS});

		const board = boardId? `?board=${boardId}` : '';

		return hiddoutViewer.request(`${config.baseURL}${config.apiV1}posts${board}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
		}).then(res => {
			checkAuth(res.status, dispatch);
			return dispatch({ type: GET_POSTS, payload: { posts: res.posts }  });
		}).catch(e => {
			console.error(e);
		});
	};
};

export const getPost = (id) => {
	return (dispatch) => {

		dispatch({type: REQUEST_GET_POST});

		hiddoutViewer.request(`${config.baseURL}${config.apiV1}post/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
		}).then(res => {
			checkAuth(res.status, dispatch);
			dispatch({ type: GET_POST, payload: { post: res.post }  });
		}).then(()=>{
			return dispatch(getComments(id));
		}).catch(e => {
			console.error(e);
		});
	};
};

export const getComments= (Id) => {

	return (dispatch) => {

		dispatch({type: REQUEST_GET_COMMENTS});

		return hiddoutViewer.request(`${config.baseURL}${config.apiV1}post/${Id}/comments`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
		}).then(res => {
			checkAuth(res.status, dispatch);
			return dispatch({ type: GET_COMMENTS, payload: { comments: res.comments }  });
		}).catch(e => {
			console.error(e);
		});
	};
};

export const replyTo = (number) => {
	return {type: REPLY_TO, payload:{level: number}};
};