// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore, { history } from './configureStore';
import { MainPage } from './pages/mainPage';
import { Loader } from 'semantic-ui-react';

import type { Node } from 'react';

const { store, persistor } = configureStore();

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
							<MainPage />
						</div>
					</ConnectedRouter>
				</PersistGate>
			</Provider>
		);
	}
}

export default App;
