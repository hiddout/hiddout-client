// @flow
import { CHANGE_LANGUAGE } from '../actions/actionType';

type State = { language: string };

const initState = { language: 'en' };

const i18n = (state: State = initState, action: Action) =>
	immer.produce(state, (draft) => {
		switch (action.type) {
			case CHANGE_LANGUAGE:
				draft.language = action.payload.language;
				break;
		}
	});

export { i18n };