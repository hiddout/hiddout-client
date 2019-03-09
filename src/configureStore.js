import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';

import storage from 'redux-persist/lib/storage';
import createRootReducer from './reducers';

export const history = createBrowserHistory();

const persistConfig = {
	key: 'root',
	storage,
	blacklist: ['router'],
};

const persistedReducer = persistReducer(persistConfig, createRootReducer(history));

const composeEnhancers = process.env.NODE_ENV !== 'production' ? composeWithDevTools({
	// Specify name here, actionsBlacklist, actionsCreators and other options if needed
}) : compose;

export default function configureStore(preloadedState) {
	const store = createStore(
		persistedReducer, // root reducer with router state
		preloadedState,
		composeEnhancers(
			applyMiddleware(
				routerMiddleware(history), // for dispatching history actions
				// ... other middlewares ...
			),
		),
	);

	const persistor = persistStore(store);

	return { store, persistor };
}
