// @flow
import React from 'react';
const ReactMarkdown = React.lazy(() => import('react-markdown'));

type Props = {
	source: string,
};

type State = {
};

class MarkdownViewer extends React.Component<Props, State> {
	render(){

		const MarkdownComponent: any = ReactMarkdown;

		return (<MarkdownComponent
			source={this.props.source}
			renderers={{
				image: (props) => {
					return (
						<img
							{...props}
							style={{ maxWidth: '100%' }}
						/>
					);
				},
				link: (props) => {
					return (
						<a
							href={props.href}
							rel={'noopener noreferrer'}
							target={'_blank'}
						>
							{props.children}
						</a>
					);
				},
			}}
		/>);
	}
}

export default MarkdownViewer;