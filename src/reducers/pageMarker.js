// @flow
import { CORRECT_REDUCERS_VERSION, GET_COMMENTS, GET_POSTS } from '../actions/actionType';

export type PageMarkerState = { isLatest: boolean };

const initState = { isLatest: true };

const pageMarker = (state: PageMarkerState = initState, action: Action) =>
	immer.produce(state, (draft) => {
		switch (action.type) {
			case GET_POSTS:
				draft.isLatest = action.payload.isLatest;
				break;
			case GET_COMMENTS:
				draft.isLatest = action.payload.isLatest;
				break;
			case CORRECT_REDUCERS_VERSION:
				return initState;
		}
	});

export { pageMarker };