import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import {auth} from './auth';
import {login} from './login';
import {i18n} from './i18n';

export default (history) =>
	combineReducers({
		router: connectRouter(history),
		auth,
		login,
		i18n
	});
