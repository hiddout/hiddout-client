export default class Window {
	
	static enterFullscreen() {
		nwWinGUI.maximize();
	}
	
	static getDimension() {
		
		try {
			return {
					width: parseInt(nwWinGUI.width),
					height: parseInt(nwWinGUI.height),
				};
		} catch (e) {
			console.error(e);
			return {
				width: 800,
				height: 600,
			};
		}
	}
	
	static close() {
		nwWinGUI.close();
	}
}