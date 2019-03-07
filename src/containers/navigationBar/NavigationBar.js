import React from 'react';
import './NavigationBar.css';
import { Image, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

class NavigationBar extends React.Component {

	render() {
		const Nav = (props) => (
			<NavLink exact {...props} activeClassName="active"/>
		);
		return (
			<Menu pointing secondary>
				<Menu.Item>
					<Image src="./public/static/Hiddout.png" avatar/>
				</Menu.Item>

				<Menu.Item name="home" as={Nav} to="/"/>
				<Menu.Item name="messages" as={Nav} to="/message"/>
				<Menu.Item name="friends" as={Nav} to="/friend"/>
				<Menu.Menu position="right">
					<Menu.Item name="LOG IN" as={Nav} to="/login"/>
				</Menu.Menu>
			</Menu>
		);
	}
}

export { NavigationBar };