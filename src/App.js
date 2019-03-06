import React from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import { Image, Menu } from 'semantic-ui-react';
import './App.css';

import { Home } from './container/homePage/Home';
import { About } from './container/aboutPage/About';
import { Login } from './container/loginPage/Login';
import { Message } from './container/messagePage/Message';
import { Friend } from './container/friendPage/Friend';

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {

		const Nav = props => (
			<NavLink
				exact
				{...props}
				activeClassName="active"
			/>
		);

		return (
			<BrowserRouter>
				<div className="App">
					<Menu pointing secondary>
						<Menu.Item>
							<Image src="./public/static/Hiddout.png" avatar />
						</Menu.Item>

						<Menu.Item
							name="home"
							as={Nav}
							to="/"
						/>
						<Menu.Item
							name="messages"
							as={Nav}
							to="/message"
						/>
						<Menu.Item
							name="friends"
							as={Nav}
							to="/friend"
						/>
						<Menu.Menu position="right">
							<Menu.Item
								name="LOG IN"
								as={Nav}
								to="/login"
							/>
						</Menu.Menu>
					</Menu>

					<Route exact path="/" component={Home} />
					<Route path="/message" component={Message} />
					<Route path="/friend" component={Friend} />
					<Route path="/login" component={Login} />
					<Route path="/about" component={About} />
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
