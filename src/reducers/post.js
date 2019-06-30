// @flow
import {
	GET_COMMENTS,
	GET_POST,
	GET_POST_SUBSCRIPTION,
	GET_POSTS,
	GET_REACTIONS,
	REPLY_TO,
	REQUEST_GET_POST,
	REQUEST_GET_POSTS,
	SUBSCRIBED_POST,
} from '../actions/actionType';

export type PostState = {
	currentPostSubscribed: boolean,
	isLoading: boolean,
	posts: Array<Object>,
	reactions: null | Array<Object>,
	comments: Array<Object>,
	currentPost: Object | null,
	replyTo: number,
};

const post = (
	state: PostState = {
		currentPostSubscribed: false,
		isLoading: false,
		posts: [],
		reactions: null,
		comments: [],
		currentPost: null,
		replyTo: 0,
	},
	action: Action,
) =>
	immer.produce(state, (draft) => {
		const payload = action.payload || {};

		switch (action.type) {
			case SUBSCRIBED_POST:
			case GET_POST_SUBSCRIPTION:
				draft.currentPostSubscribed = payload.subscribed;
				break;
			case REQUEST_GET_POST:
				draft.currentPost = null;
				draft.comments = [];
				draft.reactions = null;
				draft.isLoading = true;
				break;
			case REQUEST_GET_POSTS:
				draft.isLoading = true;
				break;
			case GET_POSTS:
				draft.posts = payload.posts;
				draft.isLoading = false;
				break;
			case GET_COMMENTS:
				draft.comments = payload.comments;
				draft.isLoading = false;
				draft.replyTo = 0;
				break;
			case GET_POST:
				draft.currentPost = payload.post;
				draft.replyTo = 0;
				break;
			case GET_REACTIONS:
				draft.reactions = payload.reactions;
				break;
			case REPLY_TO:
				if (state.replyTo === payload.level) {
					draft.replyTo = 0;
				} else {
					draft.replyTo = payload.level;
				}
				break;
		}
	});

export { post };
