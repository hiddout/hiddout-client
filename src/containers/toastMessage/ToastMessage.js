// @flow
import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Message } from 'semantic-ui-react';


type Props = {
};

type State = {
};

class ToastMessage extends React.Component<Props, State> {
	constructor(props: Props){
		super(props);
	}

	showNextMessage(){

	}

	componentDidMount(){

	}

	render(){
		return (<Message color='yellow'>
			<Message.Header>Message</Message.Header>
			<p>That offer has expired</p>
		</Message>);
	}
}

const mapStateToProps = (state) => {
	return {
		toast: state.toast,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {

	};
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps,
	)(ToastMessage),
);