import { AVATAR_CHANGED, GET_USER, REQUEST_CHANGE_AVATAR, REQUEST_GET_USER } from './actionType';
import { config } from '../config';
import { checkAuth } from './loginAction';

export const getUser = (id) => {
	return (dispatch) => {
		dispatch({ type: REQUEST_GET_USER });

		return hiddoutViewer
			.request(`${config.baseURL}${config.apiV1}user/${id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
				},
			})
			.then((res) => {
				return dispatch(
					checkAuth(res.status, {
						type: GET_USER,
						payload: { user: res.user },
					}),
				);
			})
			.catch((e) => {
				console.error(e);
			});
	};
};

export const changeAvatar = (avatarId) => {
	return (dispatch, getState) => {
		const { auth } = getState();

		dispatch({ type: REQUEST_CHANGE_AVATAR});

		return hiddoutViewer
			.request(
				`${config.baseURL}${config.apiV1}user/avatar`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json; charset=utf-8',
						authorization: auth.token,
					},
					body: JSON.stringify({avatarId}),
				},
			).then((res) => {
				return dispatch(
					checkAuth(res.status, {
						type: AVATAR_CHANGED,
						payload: { changed: res.changed },
						changeAvatar,
						avatarId,
					}),
				);
			})
			.catch((e) => {
				console.error(e);
			});
	};
};
