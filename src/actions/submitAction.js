import {
	COMMENT_SUBMITTED,
	POST_CREATED,
	REACTION_REACTED,
	SUBMIT_COMMENT,
	SUBMIT_POST,
	SUBMIT_REACTION,
} from './actionType';
import { config } from '../config';
import { checkAuth } from './loginAction';

export const submitPost = (postData) => {
	return (dispatch, getState) => {
		const { auth } = getState();

		dispatch({ type: SUBMIT_POST });

		return hiddoutViewer
			.request(`${config.baseURL}${config.apiV1}posts`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
					authorization: auth.token,
				},
				body: JSON.stringify(postData),
			})
			.then((res) => {
				return dispatch(
					checkAuth(
						res.status,
						{
							type: POST_CREATED,
							payload: { cratedPostId: res.insertedId },
						},
						submitPost,
						postData,
					),
				);
			})
			.catch((e) => {
				console.error(e);
			});
	};
};

export const submitComment = (commentData) => {
	return (dispatch, getState) => {
		const { auth } = getState();
		dispatch({ type: SUBMIT_COMMENT });

		return hiddoutViewer
			.request(
				`${config.baseURL}${config.apiV1}post/${
					commentData.postId
				}/comments`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json; charset=utf-8',
						authorization: auth.token,
					},
					body: JSON.stringify(commentData),
				},
			)
			.then((res) => {
				return dispatch(
					checkAuth(
						res.status,
						{ type: COMMENT_SUBMITTED },
						submitComment,
						commentData,
					),
				);
			})
			.catch((e) => {
				console.error(e);
			});
	};
};

export const submitReaction = (reactionData) => {
	return (dispatch, getState) => {
		const { auth } = getState();
		dispatch({ type: SUBMIT_REACTION });

		return hiddoutViewer
			.request(
				`${config.baseURL}${config.apiV1}post/${
					reactionData.postId
				}/reactions`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json; charset=utf-8',
						authorization: auth.token,
					},
					body: JSON.stringify(reactionData),
				},
			)
			.then((res) => {
				return dispatch(
					checkAuth(
						res.status,
						{ type: REACTION_REACTED },
						submitReaction,
						reactionData,
					),
				);
			})
			.catch((e) => {
				console.error(e);
			});
	};
};
