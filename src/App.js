import React from 'react';
import { BrowserRouter} from 'react-router-dom';
import { Image, Menu } from 'semantic-ui-react';
import './App.css';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { activeItem: 'home' };
		this.handleItemClick = this.handleItemClick.bind(this);
	}

	handleItemClick(e, { name }) {
		return this.setState({ activeItem: name });
	}

	render() {
		const { activeItem } = this.state;
		return (
			<BrowserRouter>
				<div className="App">
					<Menu pointing secondary>
						<Menu.Item>
							<Image src='./public/static/Hiddout.png' avatar />
						</Menu.Item>

						<Menu.Item
							name="home"
							active={activeItem === 'home'}
							onClick={this.handleItemClick}
						/>
						<Menu.Item
							name="messages"
							active={activeItem === 'messages'}
							onClick={this.handleItemClick}
						/>
						<Menu.Item
							name="friends"
							active={activeItem === 'friends'}
							onClick={this.handleItemClick}
						/>
						<Menu.Menu position="right">
							<Menu.Item
								name="login"
								active={activeItem === 'login'}
								onClick={this.handleItemClick}
							/>
						</Menu.Menu>
					</Menu>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
