// @flow
import { t } from 'i18next';

export const getHiddoutTime = (time:number) => {
	const timeOffset = Date.now() - time;
	if(Math.floor(timeOffset / 10000000000)){
		return t('longTimeAgo');
	}

	if(Math.floor(timeOffset / 1000000000)){
		return t('weeksAgo');
	}

	return t('recentAgo');
};