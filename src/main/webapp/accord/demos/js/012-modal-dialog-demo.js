
import { AccModalDialog } from '../../js/accord-bundle.js';

let dialog1;


let buttonHandlers1 = {
	
	showDialog1(){
		dialog1.show();
	},
	
}

function createDialog1(){
	dialog1 = new AccModalDialog({
	  title: "Диалог по умолчанию",
	  contentUrl: accordUtils.accordPath + "demos/misc/contentFragment.html",
	  fragmentLoadMode: AccModalDialog.LoadModes.FETCH,
	  autosize: true,
	  onOk: () => {
	    log("dialog1 сохранён.");
	  },
	  onCancel: () => {
	    log("dialog1 закрытие без сохранения.");
	  },
	  onInitiated: () => {
//	    dialog1.show();
	  },
	});
	
	dialog1.addEventListener(AccModalDialog.AccModalDialogEvents.onClose, e => {
	  console.log("dialog1 закрыт.");
	});
}


$(document).ready(function() {

	createDialog1();
	
	buttonHandlers1.showDialog1.init = createDialog1;
	
	addDemoButtons(buttonHandlers1)
	
});



