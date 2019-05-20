import {
	CLOSE_ADMIN_MODAL,
	LOCK_POST,
	OPEN_ADMIN_MODAL,
	REQUEST_LOCK_POST,
} from './actionType';
import { config } from '../config';
import { checkAuth } from './loginAction';

export const openAdminModal = () => {
	return { type: OPEN_ADMIN_MODAL };
};

export const closeAdminModal = () => {
	return { type: CLOSE_ADMIN_MODAL };
};

export const lockPost = (postData) => {
	return (dispatch, getState) => {
		const { auth } = getState();
		dispatch({ type: REQUEST_LOCK_POST });

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
