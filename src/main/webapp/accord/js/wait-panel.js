
/**
 * Позволяет показывать панель ожидания.
 * 
 * waitPanel.show();
 * ...
 * waitPanel.hide();
 * 
 * Либо:
 * showWaitPanel("test");
 * hideWaitPanel();
 * 
 * 
 */

import { accordUtils } from './accord-utils.js';

//export {WaitPanel,waitPanel};
export {showWaitPanel,hideWaitPanel};

class WaitPanel {

	$waitPanel;
	$waitContent;

	constructor() {
		this.$waitPanel = $("<span class='loading-indicator'><label>Подождите</label></span>")
			.appendTo(document.body);

		this.$waitContent = $('.loading-indicator label')
		this.$waitPanel.bind("click", () => this.hide());
	}

	show(mess) {

		if (mess) {
			this.$waitContent.text(mess);
		}
		accordUtils.alignToCenter(this.$waitPanel);

		this.$waitPanel.show();
	}

	hide() {
		this.$waitPanel.fadeOut();
	}

}


let waitPanel = null;


function showWaitPanel(mess) {
	if (!waitPanel){
		waitPanel = new WaitPanel();
	}
	waitPanel.show(mess);
}

function hideWaitPanel(mess) {
	if (waitPanel){
		waitPanel.hide();
	}
}



$(document).ready(function() {
});


