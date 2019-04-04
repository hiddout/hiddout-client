// @flow
import { GET_POST } from '../actions/actionType';

export type PostState = { posts: Array<any> };

const post = (state: PostState = { posts: [] }, action: Action) =>
	immer.produce(state, draft => {

		const payload = action.payload;

		switch (action.type) {
			case GET_POST:
				draft.posts = payload.posts;
				break;
		}
	});

export { post };