import { CHANG_LANGUAGE } from './actionType';


export const changeLanguage = (language) => {
	return {
		type: CHANG_LANGUAGE, payload: {
			language,
		},
	};
};