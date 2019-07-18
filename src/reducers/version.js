// @flow
import { CORRECT_REDUCERS_VERSION } from '../actions/actionType';

type State = { reducer: number };

const initState = { reducer: 0 };

const version = (state: State = initState, action: Action) =>
	immer.produce(state, (draft) => {
		switch (action.type) {
			case CORRECT_REDUCERS_VERSION:
				draft.reducer = action.payload.version;
				break;
		}
	});

export { version };