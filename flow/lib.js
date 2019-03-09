import type {Node} from 'react';

declare var immer: any;

declare module 'semantic-ui-react' {
	declare export default any;
}

declare module 'redux' {
	declare export default any;
	declare export function combineReducers(...args:any) : any;
}

declare module 'react-redux' {
	declare export default any;
	declare export var Provider: any;
}

declare module 'connected-react-router' {
	declare export default any;
	declare export var ConnectedRouter: Node;
}

declare module 'redux-persist/integration/react' {
	declare export default any;
	declare export var PersistGate: Node;
}

declare module 'react-router-dom' {
	declare export default any;
	declare export var Route: Node;
	declare export var Redirect : Node;
	declare export var Switch: Node;
}
