import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const template = `<script type="text/javascript" src="nwSystem/nodeSystemModule.js" charset="UTF-8"></script>
<script type="text/javascript" src="nwSystem/nwSystemModule.js" charset="UTF-8"></script>
<script type="text/javascript" src="nwSystem/hiddoutModule.js" charset="UTF-8"></script>`;
const frag = document.createRange().createContextualFragment(template);
const head = document.getElementsByTagName('head').item(0);
head.appendChild(frag);

const interval = setInterval(() => {
	if (hiddoutViewer) {
		clearInterval(interval);

		ReactDOM.render(<App />, document.getElementById('root'));
	}
}, 500);
