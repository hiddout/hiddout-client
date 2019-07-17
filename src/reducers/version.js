// @flow
type State = { version: number };

const initState = { version: 0 };

const version = (state: State = initState, action: Action) =>
	immer.produce(state, (draft) => {
		// switch (action.type) {
		// 	case CHANGE_LANGUAGE:
		// 		draft.language = action.payload.language;
		// 		break;
		// 	case CHANGE_PREFER:
		// 		if(action.payload.prefer.length === 4){
		// 			draft.prefer = [];
		// 		}
		// 		else {
		// 			draft.prefer = action.payload.prefer;
		// 		}
		// 		break;
		// }
	});

export { version };