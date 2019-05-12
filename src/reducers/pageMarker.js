// @flow
import { CHANGE_PAGE, GET_POSTS } from '../actions/actionType';

export type PageMarkerState = { currentPage: number, isLatest: boolean };

const initState = { currentPage: 0, isLatest: true };

const pageMarker = (state: PageMarkerState = initState, action: Action) =>
	immer.produce(state, (draft) => {
		switch (action.type) {
			case CHANGE_PAGE:
				draft.currentPage = action.payload.pageNumber;
				break;
			case GET_POSTS:
				draft.isLatest = action.payload.isLatest;
				break;
		}
	});

export { pageMarker };