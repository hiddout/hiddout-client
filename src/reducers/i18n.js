// @flow
import { CHANGE_LANGUAGE,CHANGE_PREFER } from '../actions/actionType';

type State = { language: string, prefer: Array<string> };

const initState = { language: navigator.language.split('-')[0], prefer: [] };

const i18n = (state: State = initState, action: Action) =>
	immer.produce(state, (draft) => {
		switch (action.type) {
			case CHANGE_LANGUAGE:
				draft.language = action.payload.language;
				break;
			case CHANGE_PREFER:
				if(action.payload.prefer.length === 4){
					draft.prefer = [];
				}
				else {
					draft.prefer = action.payload.prefer;
				}
				break;
		}
	});

export { i18n };