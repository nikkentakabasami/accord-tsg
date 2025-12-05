/**
 * Агрегатор и публикатор всех функций библиотеки.
 * 
 */



import { accordUtils } from './accord-utils.js';
export {accordUtils};

import {AccModalDialogEvents,AccModalDialog} from './modal-dialog.js';
export {AccModalDialogEvents,AccModalDialog};

import {WaitPanel,waitPanel} from './wait-panel.js';
export {WaitPanel,waitPanel};

window.accordUtils = accordUtils;

window.AccModalDialog = AccModalDialog;
window.AccModalDialogEvents = AccModalDialogEvents;

window.showWaitPanel = function(mess) {
	waitPanel.show(mess);
}


window.hideWaitPanel = function() {
	waitPanel.hide();
}



