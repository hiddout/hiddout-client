// @flow
import React from 'react';
import { Container, Segment } from 'semantic-ui-react';

const NavigationBar = React.lazy( () => import( '../../containers/navigationBar/NavigationBar'));

type Props = {};

type State = {};

class Settings extends React.Component<Props, State> {

	render(){
		return (<React.Fragment>
			<NavigationBar/>
			<Container textAlign={'left'} style={{ marginTop: '7em' }}>
				<Segment>Settings</Segment>
			</Container>
		</React.Fragment>);
	}
}



export default Settings;