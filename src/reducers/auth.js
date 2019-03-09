// @flow
import { LOGIN } from '../actions/actionType';

type State = { token: string };

type Action = {
	type: string;
	payload: {
		[key: any]: any
	};
}

const auth = (state: State = { token: '' }, action: Action) =>
	immer.produce(state, draft => {
		switch (action.type) {
			case LOGIN :
				draft.token = `bearer ${action.payload.token}`;
				break;
		}
	});

export { auth };