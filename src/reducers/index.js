import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { auth } from './auth';
import { account } from './account';
import { modal } from './modal';
import { i18n } from './i18n';
import { post } from './post';
import { admin } from './admin';
import { submit } from './submit';
import { visitUser } from './visitUser';
import { pageMarker } from './pageMarker';

export default (history) =>
	combineReducers({
		router: connectRouter(history),
		auth,
		account,
		modal,
		i18n,
		post,
		admin,
		submit,
		visitUser,
		pageMarker,
	});
