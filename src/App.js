import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from './configureStore';
import { MainPage } from './pages/mainPage';

const store = configureStore();

import './App.css';
class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {

		return (
			<Provider store={store}>
			<ConnectedRouter history={history}>
				<div className="App">
					<MainPage/>
				</div>
			</ConnectedRouter>
			</Provider>
		);
	}
}

export default App;
