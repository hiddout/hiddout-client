// @flow
import { t } from 'i18next';

export const getHiddoutTime = (time:number) => {
	const timeOffset = Date.now() - time;
	if(Math.floor(timeOffset / 10000000000)){
		return ` ${t('longTimeAgo')}`;
	}

	if(Math.floor(timeOffset / 1000000000)){
		return ` ${t('weeksAgo')}`;
	}

	return ` ${t('recentAgo')}`;
};

export const getUserColor = (name:string) => {
	let userNameCode = name.charCodeAt(0);
	userNameCode = (userNameCode * 9301 + 49297) % 233280;
	const r = userNameCode / 233280.0 * 255;
	userNameCode = (userNameCode * 9301 + 49297) % 233280;
	const g = userNameCode / 233280.0 * 255;
	userNameCode = (userNameCode * 9301 + 49297) % 233280;
	const b = userNameCode / 233280.0 * 255;

	return `rgb(${r},${g},${b})`;
};