import { CHANGE_LANGUAGE } from './actionType';

export const changeLanguage = (language) => {
	return {
		type: CHANGE_LANGUAGE,
		payload: {
			language,
		},
	};
};
