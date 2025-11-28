
import { waitPanel } from '../../../accord/js/wait-panel.js';



$(document).ready(function() {


	$("#b1").click(function() {
		waitPanel.show();
	});
	
	$("#b2").click(function() {
		waitPanel.hide();
	});
	
	//эти методы публикуются через accord-publish.js
	$("#b3").click(function() {
		window.showWaitPanel();
	});

	$("#b4").click(function() {
		window.hideWaitPanel();
	});

	
});







