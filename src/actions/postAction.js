import {
	GET_COMMENTS,
	GET_POST,
	GET_POSTS,
	GET_REACTIONS,
	SUBSCRIBED_POST,
	REPLY_TO,
	REQUEST_GET_COMMENTS,
	REQUEST_GET_POST,
	REQUEST_GET_POSTS,
	REQUEST_GET_REACTIONS,
	REQUEST_SUBSCRIBE,
	REQUEST_CHECK_IS_POST_SUBSCRIBED,
	GET_POST_SUBSCRIPTION,
	HIDE_POST, UNHIDE_POST,
} from './actionType';
import { config } from '../config';
import { checkAuth } from './loginAction';

const PAGE_NUMBER_INDEX = 1;

export const getPosts = (boardId) => {
	return (dispatch, getState) => {
		dispatch({ type: REQUEST_GET_POSTS });

		const { router, i18n } = getState();

		const { prefer } = i18n;
		const { location } = router;

		const page = location.search.length
			? location.search.split('=')[PAGE_NUMBER_INDEX]
			: 0;

		const board = boardId ? `&board=${boardId}` : '';

		const preferLanguage =
			prefer && prefer.length ? `&prefer=${prefer.join()}` : '';

		const query = `?page=${page}${board}${preferLanguage}`;

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

export const subscribePost = (subscriptionData) => {
	return (dispatch, getState) => {
		const { auth } = getState();
		dispatch({ type: REQUEST_SUBSCRIBE });

		return hiddoutViewer
			.request(
				`${config.baseURL}${config.apiV1}user/subscribe/${
					subscriptionData.id
				}`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json; charset=utf-8',
						authorization: auth.token,
					},
					body: JSON.stringify(subscriptionData),
				},
			)
			.then((res) => {
				return dispatch(
					checkAuth(
						res.status,
						{
							type: SUBSCRIBED_POST,
							payload: { subscribed: res.subscribed },
						},
						subscribePost,
						subscriptionData,
					),
				);
			})
			.catch((e) => {
				console.error(e);
			});
	};
};

export const getPostSubscription = (id) => {
	return (dispatch, getState) => {
		const { auth } = getState();

		dispatch({ type: REQUEST_CHECK_IS_POST_SUBSCRIBED });

		return hiddoutViewer
			.request(`${config.baseURL}${config.apiV1}user/subscribe/${id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
					authorization: auth.token,
				},
			})
			.then((res) => {
				return dispatch(
					checkAuth(
						res.status,
						{
							type: GET_POST_SUBSCRIPTION,
							payload: { subscribed: res.subscribed },
						},
						getPostSubscription,
						id,
					),
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
	return (dispatch, getState) => {
		const { auth } = getState();
		dispatch({ type: REQUEST_GET_REACTIONS });

		return hiddoutViewer
			.request(`${config.baseURL}${config.apiV1}post/${id}/reactions`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
					authorization: auth.token,
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
	return (dispatch, getState) => {
		dispatch({ type: REQUEST_GET_COMMENTS });

		const { router } = getState();

		const { location } = router;

		const page = location.search.length
			? location.search.split('=')[PAGE_NUMBER_INDEX]
			: 0;

		const query = `?page=${page}`;

		return hiddoutViewer
			.request(
				`${config.baseURL}${config.apiV1}post/${id}/comments${query}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json; charset=utf-8',
					},
				},
			)
			.then((res) => {
				return dispatch(
					checkAuth(res.status, {
						type: GET_COMMENTS,
						payload: { comments: res.comments, isLatest: res.isLatest },
					}),
				);
			})
			.catch((e) => {
				console.error(e);
			});
	};
};

export const hidePost = (id) => {
	return { type: HIDE_POST, payload: { id } };
};

export const unhidePost = (id) => {
	return { type: UNHIDE_POST, payload: { id } };
};

export const replyTo = (number) => {
	return { type: REPLY_TO, payload: { level: number } };
};
