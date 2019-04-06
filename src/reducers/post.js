// @flow
import { GET_POST, GET_POSTS, REQUEST_GET_POST } from '../actions/actionType';

export type PostState = { posts: Array<any>, currentPost: Object};

const post = (state: PostState = { posts: [], currentPost:null }, action: Action) =>
	immer.produce(state, draft => {

		const payload = action.payload || {};

		switch (action.type) {
			case REQUEST_GET_POST:
				draft.currentPost = null;
				break;
			case GET_POSTS:
				draft.posts = payload.posts;
				break;
			case GET_POST:
				draft.currentPost = payload.post;
				break;
		}
	});

export { post };