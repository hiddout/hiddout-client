// @flow
import {
	CORRECT_REDUCERS_VERSION,
	GET_COMMENTS,
	GET_POST,
	GET_POST_SUBSCRIPTION,
	GET_POSTS,
	GET_REACTIONS, HIDE_POST,
	REPLY_TO,
	REQUEST_GET_POST,
	REQUEST_GET_POSTS,
	SUBSCRIBED_POST, UNHIDE_POST,
} from '../actions/actionType';

export type PostState = {
	currentPostSubscribed: boolean,
	isLoading: boolean,
	posts: Array<Object>,
	reactions: null | Array<Object>,
	comments: Array<Object>,
	currentPost: Object | null,
	hiddenPosts: Array<Object>,
	replyTo: number,
};

const initState = {
	currentPostSubscribed: false,
	isLoading: false,
	posts: [],
	reactions: null,
	comments: [],
	hiddenPosts: [],
	currentPost: null,
	replyTo: 0,
};

const post = (
	state: PostState = initState,
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
			case HIDE_POST:
				draft.hiddenPosts.push(payload.id);
				break;
			case UNHIDE_POST:
				draft.hiddenPosts = draft.hiddenPosts.filter(id =>  id !== payload.id);
				break;
			case CORRECT_REDUCERS_VERSION:
				return initState;
		}
	});

export { post };
