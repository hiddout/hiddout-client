import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const template = `<script type="text/javascript" id="viewerScriptTag">var hiddoutViewer = window.index.HiddoutViewer;</script>`;
const frag = document.createRange().createContextualFragment(template);
const head = document.getElementsByTagName('head').item(0);
head.appendChild(frag);

const interval = setInterval(() => {
	if (typeof hiddoutViewer !== 'undefined') {
		document.head.removeChild(document.getElementById('viewerScriptTag'));
		clearInterval(interval);

		document.head.removeChild(document.getElementById('loadingStyle'));
		document.body.removeChild(document.getElementById('loading'));

		ReactDOM.render(<App />, document.getElementById('root'));
	}
}, 500);
