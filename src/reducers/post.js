// @flow
import { GET_COMMENTS, GET_POST, GET_POSTS, REQUEST_GET_POST } from '../actions/actionType';

export type PostState = { posts: Array<Object>, comments: Array<Object>, currentPost: Object|null };

const post = (state: PostState = { posts: [], comments:[], currentPost: null }, action: Action) =>
	immer.produce(state, draft => {

		const payload = action.payload || {};

		switch (action.type) {
			case REQUEST_GET_POST:
				draft.currentPost = null;
				draft.comments = [];
				break;
			case GET_POSTS:
				draft.posts = payload.posts;
				break;
			case GET_COMMENTS:
				draft.comments = payload.comments;
				break;
			case GET_POST:
				draft.currentPost = payload.post;
				break;
		}
	});

export { post };