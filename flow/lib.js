type Action = {
	type: string,
	payload: {
		[key: any]: any,
	},
};

declare var forge: any;

declare var immer: any;

declare var hiddoutViewer: any;

declare module 'i18next' {
	declare export default any;
	declare export var t:any;
}

declare module 'semantic-ui-react' {
	declare export default any;
	declare export var Button: any;
	declare export var Modal: any;
	declare export var Form: any;
	declare export var Icon: any;
	declare export var Loader: any;
	declare export var Container: any;
	declare export var List: any;
	declare export var Image: any;
	declare export var laceholder: any;
	declare export var Segment: any;
	declare export var Divider: any;
	declare export var Placeholder: any;
	declare export var Comment: any;
	declare export var Header: any;
	declare export var Popup: any;
}

declare module 'redux' {
	declare export default any;
	declare export function combineReducers(...args:any) : any;
}

declare module 'react-redux' {
	declare export default any;
	declare export var Provider: any;
	declare export var connect:any;
}

declare module 'connected-react-router' {
	declare export default any;
	declare export var ConnectedRouter: any;
}

declare module 'redux-persist/integration/react' {
	declare export default any;
	declare export var PersistGate: any;
}

declare module 'react-router-dom' {
	declare export default any;
	declare export var Route: any;
	declare export var Redirect : any;
	declare export var Switch: any;
	declare export var withRouter: any;
	declare export var Link: any;
}

declare module 'react-markdown' {
	declare export default any;
}