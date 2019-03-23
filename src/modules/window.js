import { EXECUTE_IN_CLIENT, EXECUTE_WITHOUT_CLIENT } from '../utils/envUtil';

export default class Window {
	
	static enterFullscreen() {
		EXECUTE_IN_CLIENT(()=>{
			nwWinGUI.maximize();
		});
	}

	static reload(){
		EXECUTE_WITHOUT_CLIENT(()=>{
			window.location.reload();
		});
		EXECUTE_IN_CLIENT(()=>{
			chrome.runtime.reload();
		});
	}
	
	static close() {
		EXECUTE_IN_CLIENT(()=>{
			nwWinGUI.close();
		});
	}
}