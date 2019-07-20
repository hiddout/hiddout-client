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
	let md = forge.md.md5.create();
	md.update(name);

	return `#${md.digest().toHex().slice(0, 6)}`;
};