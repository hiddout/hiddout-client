// @flow
import { CHANGE_PAGE } from '../actions/actionType';

type State = { currentPage: number };

const initState = { currentPage: 0 };

const pageMarker = (state: State = initState, action: Action) =>
	immer.produce(state, (draft) => {
		switch (action.type) {
			case CHANGE_PAGE:
				draft.currentPage = action.payload.pageNumber;
				break;
		}
	});

export { pageMarker };