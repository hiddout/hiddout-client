import {
	GET_COMMENTS,
	GET_POST,
	GET_POSTS,
	GET_REACTIONS,
	REPLY_TO,
	REQUEST_GET_COMMENTS,
	REQUEST_GET_POST,
	REQUEST_GET_POSTS,
	REQUEST_GET_REACTIONS,
} from './actionType';
import { config } from '../config';
import { checkAuth } from './loginAction';

const PAGE_NUMBER_INDEX = 1;

export const getPosts = (boardId) => {
	return (dispatch, getState) => {

		dispatch({ type: REQUEST_GET_POSTS });

		const { router } = getState();

		const { location } = router;

		const page = location.search.length ? location.search.split('=')[PAGE_NUMBER_INDEX] : 0;
		const board = boardId ? `&board=${boardId}` : '';

		const query = `?page=${page}${board}`;

		return hiddoutViewer
			.request(`${config.baseURL}${config.apiV1}posts${query}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
				},
			})
			.then((res) => {
				return dispatch(
					checkAuth(res.status, {
						type: GET_POSTS,
						payload: { posts: res.posts, isLatest: res.isLatest },
					}),
				);
			})
			.catch((e) => {
				console.error(e);
			});
	};
};

export const getPost = (id) => {
	return (dispatch) => {
		dispatch({ type: REQUEST_GET_POST });

		return hiddoutViewer
			.request(`${config.baseURL}${config.apiV1}post/${id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
				},
			})
			.then((res) => {
				return dispatch(
					checkAuth(res.status, {
						type: GET_POST,
						payload: { post: res.post },
					}),
				);
			})
			.catch((e) => {
				console.error(e);
			});
	};
};

export const getReactions = (id) => {
	return (dispatch) => {
		dispatch({ type: REQUEST_GET_REACTIONS });

		return hiddoutViewer
			.request(`${config.baseURL}${config.apiV1}post/${id}/reactions`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
				},
			})
			.then((res) => {
				return dispatch(
					checkAuth(res.status, {
						type: GET_REACTIONS,
						payload: { reactions: res.reactions },
					}),
				);
			})
			.catch((e) => {
				console.error(e);
			});
	};
};

export const getComments = (id) => {
	return (dispatch) => {
		dispatch({ type: REQUEST_GET_COMMENTS });

		const page = 0;

		const query = `?page=${page}`;

		return hiddoutViewer
			.request(`${config.baseURL}${config.apiV1}post/${id}/comments${query}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
				},
			})
			.then((res) => {
				return dispatch(
					checkAuth(res.status, {
						type: GET_COMMENTS,
						payload: { comments: res.comments },
					}),
				);
			})
			.catch((e) => {
				console.error(e);
			});
	};
};

export const replyTo = (number) => {
	return { type: REPLY_TO, payload: { level: number } };
};
