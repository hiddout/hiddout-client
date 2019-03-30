// @flow
import { GET_POST } from '../actions/actionType';

type State = { posts: Array<any> };

const post = (state: State = { posts: [] }, action: Action) =>
	immer.produce(state, draft => {

		const payload = action.payload;

		switch (action.type) {
			case GET_POST:
				draft.posts = payload.posts;
				break;
		}
	});

export { post };