// @flow
import React from 'react';
import { Container, Header, Segment, List, Grid } from 'semantic-ui-react';
import type { Node } from 'react';

type Props = {};

type State = {};

class FooterPage extends React.Component<Props, State> {
	render(): Node {
		return (
			<Segment inverted vertical style={{ padding: '5em 0em' }}>
				<Container>
					<Grid divided inverted stackable>
						<Grid.Row>
							<Grid.Column width={3}>
								<Header inverted as="h4" content="About" />
								<List link inverted>
									<List.Item
										as="a"
										target="_blank"
										href="https://github.com/hiddout/hiddout-policies/blob/master/UserAgreement.md"
									>
										What is Hiddout
									</List.Item>
									<List.Item
										as="a"
										target="_blank"
										rel="noopener noreferrer"
										href="https://github.com/hiddout/hiddout-policies/issues"
									>Contact Us</List.Item>
								</List>
							</Grid.Column>
							<Grid.Column width={3}>
								<Header inverted as="h4" content="Services" />
								<List link inverted>
									<List.Item
										as="a"
										target="_blank"
										rel="noopener noreferrer"
										href="https://github.com/hiddout/hiddout-policies/blob/master/PrivacyPolicy.md"
									>GDPR</List.Item>
									<List.Item
										as="a"
										target="_blank"
										rel="noopener noreferrer"
										href="https://github.com/hiddout/hiddout-policies/blob/master/ContentPolicy.md"
									>Content Policy</List.Item>
								</List>
							</Grid.Column>
							<Grid.Column width={7}>
								<Header as="h4" inverted>
									Hiddout for a hideout
								</Header>
								<p>
									We shall meet in the place where there is no
									darkness.
								</p>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Container>
			</Segment>
		);
	}
}

export default FooterPage;
