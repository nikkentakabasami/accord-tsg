var filesAdded = '';


function loadJS(scriptSrc) {

	if (filesAdded.indexOf(scriptSrc) !== -1)
		return;

	var head = document.getElementsByTagName('head')[0];

	var script = document.createElement('script');
	//	script.src = 'demos/js/script-to-load.js'
	script.src = scriptSrc;
	script.type = 'text/javascript';

	head.append(script);

	filesAdded += ' '+scriptSrc;
}

function loadCSS(cssSrc) {

	if (filesAdded.indexOf(cssSrc) !== -1)
		return;

	var head = document.getElementsByTagName('head')[0];

	var style = document.createElement('link');
	style.href = cssSrc;
	style.type = 'text/css';
	style.rel = 'stylesheet';
	head.append(style);;

	filesAdded += ' '+cssSrc;
}

