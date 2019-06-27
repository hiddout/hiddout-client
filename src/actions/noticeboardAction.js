import { GET_SUBSCRIPTION, REQUEST_GET_SUBSCRIPTION } from './actionType';
import { config } from '../config';
import { checkAuth } from './loginAction';

export const getSubscriptio = () => {
	return (dispatch, getState) => {
		const { auth } = getState();
		dispatch({ type: REQUEST_GET_SUBSCRIPTION });

		return hiddoutViewer
			.request(`${config.baseURL}${config.apiV1}user/subscription`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
					authorization: auth.token,
				},
			})
			.then((res) => {
				return dispatch(
					checkAuth(
						res.status,
						{
							type: GET_SUBSCRIPTION,
							payload: {
								subscriptionMessages: res.subscriptionMessages,
							},
						},
						getSubscriptio,
					),
				);
			})
			.catch((e) => {
				console.error(e);
			});
	};
};
