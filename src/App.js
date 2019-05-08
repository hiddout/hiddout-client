// @flow
import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore, { history } from './configureStore';
import { Loader } from 'semantic-ui-react';

import type { Node } from 'react';

const { store, persistor } = configureStore();

const MainPage = React.lazy(() => import('./pages/mainPage'));

import './App.css';

type Props = {};

type State = {};

class App extends React.Component<Props, State> {
	render(): Node {
		return (
			<Provider store={store}>
				<PersistGate loading={<Loader />} persistor={persistor}>
					<ConnectedRouter history={history}>
						<div className="App">
							<Suspense fallback={<Loader />}>
								<MainPage />
							</Suspense>
						</div>
					</ConnectedRouter>
				</PersistGate>
			</Provider>
		);
	}
}

export default App;
