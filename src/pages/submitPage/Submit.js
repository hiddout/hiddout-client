// @flow
import React from 'react';
const NavigationBar = React.lazy(() =>
	import('../../containers/navigationBar/NavigationBar'),
);
import type { Node } from 'react';
import {
	Container,
	Segment,
	Header,
	Divider,
	Input,
} from 'semantic-ui-react';
import SubmitForm from '../../component/submitForm/SubmitForm';
import BoardSelector from '../../component/boardSelector/BoardSelector';

type Props = {};

type State = {};

class Submit extends React.Component<Props, State> {

	render(): Node {
		return (
			<React.Fragment>
				<NavigationBar />
				<Container textAlign={'left'} style={{ marginTop: '7em' }}>
					<Segment>
						<BoardSelector/>
						<Header floated={'right'}>
							Submit a post
						</Header>
						<Divider clearing />
						<Input placeholder='Title' size={'large'}/>
						<Divider hidden />
						<SubmitForm ButtonText={'Submit'}/>
					</Segment>
				</Container>
			</React.Fragment>
		);
	}
}

export default Submit;
