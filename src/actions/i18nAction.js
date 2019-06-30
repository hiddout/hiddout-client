import { CHANGE_LANGUAGE,CHANGE_PREFER } from './actionType';

export const changeLanguage = (language) => {
	return {
		type: CHANGE_LANGUAGE,
		payload: {
			language,
		},
	};
};

export const changePrefer = (prefer) => {
	return {
		type: CHANGE_PREFER,
		payload: {
			prefer,
		},
	};
};