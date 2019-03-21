import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const viewerWorker = new Worker('/public/js/hiddout-extension.js');

viewerWorker.postMessage('init');

viewerWorker.onmessage = (e) => {
	if (typeof hiddoutViewer !== 'undefined') {
		return;
	}

	const template = `<script type="text/javascript">${e.data}var hiddoutViewer = window.index.HiddoutViewer;</script>`;
	const frag = document.createRange().createContextualFragment(template);
	const head = document.getElementsByTagName('head').item(0);
	head.appendChild(frag);
};

const interval = setInterval(() => {
	if (typeof hiddoutViewer !== 'undefined') {
		clearInterval(interval);

		ReactDOM.render(<App />, document.getElementById('root'));
	}
}, 500);
