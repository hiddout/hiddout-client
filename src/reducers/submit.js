// @flow
import { POST_CREATED } from '../actions/actionType';

export type SubmitState = { cratedPostId: string };

const submit = (state: SubmitState = { cratedPostId:'' }, action: Action) =>
	immer.produce(state, draft => {

		const payload = action.payload || {};

		switch (action.type) {
			case POST_CREATED:
				draft.cratedPostId = payload.cratedPostId;
				break;
		}
	});

export { submit };