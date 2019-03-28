import React from 'react';
import { List, Image, Placeholder, Segment, Divider } from 'semantic-ui-react';

const PostList = () => (
	<Segment>
	<List>
		<List.Item>
			<Image avatar src='https://react.semantic-ui.com/images/avatar/small/rachel.png' />
			<List.Content>
				<List.Header as='a'>Rachel</List.Header>
				<List.Description>
					Last seen watching{' '}
					<a>
						<b>Arrested Development</b>
					</a>{' '}
					just now.
				</List.Description>
			</List.Content>
		</List.Item>
		<Divider/>
		<List.Item>
			<Image avatar src='https://react.semantic-ui.com/images/avatar/small/lindsay.png' />
			<List.Content>
				<List.Header as='a'>Lindsay</List.Header>
				<List.Description>
					Last seen watching{' '}
					<a>
						<b>Bob's Burgers</b>
					</a>{' '}
					10 hours ago.
				</List.Description>
			</List.Content>
		</List.Item>
		<Divider/>
		<List.Item>
			<Image avatar src='https://react.semantic-ui.com/images/avatar/small/matthew.png' />
			<List.Content>
				<List.Header as='a'>Matthew</List.Header>
				<List.Description>
					Last seen watching{' '}
					<a>
						<b>The Godfather Part 2</b>
					</a>{' '}
					yesterday.
				</List.Description>
			</List.Content>
		</List.Item>
		<Divider/>
		<List.Item>
			<Image avatar src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' />
			<List.Content>
				<List.Header as='a'>Jenny Hess</List.Header>
				<List.Description>
					Last seen watching{' '}
					<a>
						<b>Twin Peaks</b>
					</a>{' '}
					3 days ago.
				</List.Description>
			</List.Content>
		</List.Item>
		<Divider/>
		<List.Item>
			<Image avatar src='https://react.semantic-ui.com/images/avatar/small/veronika.jpg' />
			<List.Content>
				<List.Header as='a'>Veronika Ossi</List.Header>
				<List.Description>Has not watched anything recently</List.Description>
			</List.Content>
		</List.Item>
		<Divider/>
		<Placeholder>
			<Placeholder.Header image>
				<Placeholder.Line />
				<Placeholder.Line />
			</Placeholder.Header>
		</Placeholder>
		<Divider/>
		<Placeholder>
			<Placeholder.Header image>
				<Placeholder.Line />
				<Placeholder.Line />
			</Placeholder.Header>
		</Placeholder>
		<Divider/><Placeholder>
		<Placeholder.Header image>
			<Placeholder.Line />
			<Placeholder.Line />
		</Placeholder.Header>
	</Placeholder>
		<Divider/><Placeholder>
		<Placeholder.Header image>
			<Placeholder.Line />
			<Placeholder.Line />
		</Placeholder.Header>
	</Placeholder>
		<Divider/><Placeholder>
		<Placeholder.Header image>
			<Placeholder.Line />
			<Placeholder.Line />
		</Placeholder.Header>
	</Placeholder>
		<Divider/><Placeholder>
		<Placeholder.Header image>
			<Placeholder.Line />
			<Placeholder.Line />
		</Placeholder.Header>
	</Placeholder>
		<Divider/><Placeholder>
		<Placeholder.Header image>
			<Placeholder.Line />
			<Placeholder.Line />
		</Placeholder.Header>
	</Placeholder>
		<Divider/><Placeholder>
		<Placeholder.Header image>
			<Placeholder.Line />
			<Placeholder.Line />
		</Placeholder.Header>
	</Placeholder>
		<Divider/><Placeholder>
		<Placeholder.Header image>
			<Placeholder.Line />
			<Placeholder.Line />
		</Placeholder.Header>
	</Placeholder>
		<Divider/><Placeholder>
		<Placeholder.Header image>
			<Placeholder.Line />
			<Placeholder.Line />
		</Placeholder.Header>
	</Placeholder>
		<Divider/><Placeholder>
		<Placeholder.Header image>
			<Placeholder.Line />
			<Placeholder.Line />
		</Placeholder.Header>
	</Placeholder>
		<Divider/><Placeholder>
		<Placeholder.Header image>
			<Placeholder.Line />
			<Placeholder.Line />
		</Placeholder.Header>
	</Placeholder>
		<Divider/><Placeholder>
		<Placeholder.Header image>
			<Placeholder.Line />
			<Placeholder.Line />
		</Placeholder.Header>
	</Placeholder>
		<Divider/>
	</List>
	</Segment>
);

export default PostList;