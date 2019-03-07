import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import createRootReducer from './reducers';

export const history = createBrowserHistory();

const composeEnhancers = composeWithDevTools({
	// Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

export default function configureStore(preloadedState) {
	const store = createStore(
		createRootReducer(history), // root reducer with router state
		preloadedState,
		composeEnhancers(
			applyMiddleware(
				routerMiddleware(history), // for dispatching history actions
				// ... other middlewares ...
			),
		),
	);

	return store;
}
