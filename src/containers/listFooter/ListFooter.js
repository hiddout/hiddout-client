// @flow
import React from 'react';
import { t } from 'i18next';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Button } from 'semantic-ui-react';

type Props = {};

type State = {};

class ListFooter extends React.Component<Props, State> {

	render() {

		return (
			<React.Fragment>
				<Button secondary floated='left'>{t('previousPage')}</Button>
				<Button color='green' floated='right'>{t('nextPage')}</Button>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
	};
};

export default withRouter(
	connect(
		mapStateToProps,
	)(ListFooter),
);
