/**
 * Агрегатор и публикатор всех функций библиотеки.
 * 
 */



import { accordUtils } from './accord-utils.js';
export {accordUtils};

import {AccModalDialogEvents,AccModalDialog} from './modal-dialog.js';
export {AccModalDialogEvents,AccModalDialog};

//import {WaitPanel,waitPanel} from './wait-panel.js';
//export {WaitPanel,waitPanel};
import {showWaitPanel,hideWaitPanel} from './wait-panel.js';


import {TabbedPanel} from './tabbed-panel.js';
export {TabbedPanel};


window.TabbedPanel = TabbedPanel;


window.accordUtils = accordUtils;

window.AccModalDialog = AccModalDialog;
window.AccModalDialogEvents = AccModalDialogEvents;

window.showWaitPanel = showWaitPanel;
window.hideWaitPanel = hideWaitPanel;




