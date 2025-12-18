
import {showWaitPanel,hideWaitPanel} from '../../../accord/js/accord-bundle.js';




$(document).ready(function() {


	$("#b1").click(function() {
		showWaitPanel("test1");
//		waitPanel.show();
	});
	
	$("#b2").click(function() {
		hideWaitPanel();
//		waitPanel.hide();
	});
	
	//эти методы публикуются через accord-publish.js
	$("#b3").click(function() {
		window.showWaitPanel("test2");
	});

	$("#b4").click(function() {
		window.hideWaitPanel();
	});

	
});







