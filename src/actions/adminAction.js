import {
	CLOSE_ADMIN_MODAL,
	LOCK_POST,
	DELETE_POST,
	OPEN_ADMIN_MODAL,
	REQUEST_LOCK_POST,
	REQUEST_DELETE_POST,
	REQUEST_MOVE_POST, MOVE_POST,
} from './actionType';
import { config } from '../config';
import { checkAuth } from './loginAction';

export const openAdminModal = () => {
	return { type: OPEN_ADMIN_MODAL };
};

export const closeAdminModal = () => {
	return { type: CLOSE_ADMIN_MODAL };
};

export const requestLockPost = () => {
	return { type: REQUEST_LOCK_POST };
};

export const requestDeletePost = () => {
	return { type: REQUEST_DELETE_POST };
};

export const requestMovePost = () => {
	return { type: REQUEST_MOVE_POST };
};

export const deletePost = (postData) => {
	return (dispatch, getState) => {
		const { auth } = getState();

		return hiddoutViewer
			.request(
				`${config.baseURL}${config.apiV1}post/${postData.postId}/delete`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json; charset=utf-8',
						authorization: auth.token,
					},
					body: JSON.stringify(postData),
				},
			)
			.then((res) => {
				return dispatch(
					checkAuth(
						res.status,
						{ type: DELETE_POST, deleted: res.deleted },
						deletePost,
						postData,
					),
				);
			})
			.catch((e) => {
				console.error(e);
			});
	};
};

export const movePost = (postData) => {
	return (dispatch, getState) => {
		const { auth } = getState();

		return hiddoutViewer
			.request(
				`${config.baseURL}${config.apiV1}post/${postData.postId}/move`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json; charset=utf-8',
						authorization: auth.token,
					},
					body: JSON.stringify(postData),
				},
			)
			.then((res) => {
				return dispatch(
					checkAuth(
						res.status,
						{ type: MOVE_POST, moved: res.moved },
						movePost,
						postData,
					),
				);
			})
			.catch((e) => {
				console.error(e);
			});
	};
};

export const lockPost = (postData) => {
	return (dispatch, getState) => {
		const { auth } = getState();

		return hiddoutViewer
			.request(
				`${config.baseURL}${config.apiV1}post/${postData.postId}/lock`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json; charset=utf-8',
						authorization: auth.token,
					},
					body: JSON.stringify(postData),
				},
			)
			.then((res) => {
				return dispatch(
					checkAuth(
						res.status,
						{ type: LOCK_POST, locked: res.locked },
						lockPost,
						postData,
					),
				);
			})
			.catch((e) => {
				console.error(e);
			});
	};
};
