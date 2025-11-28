
import { AccModalDialog, AccModalDialogEvents,LoadModes } from '../../js/modal-dialog.js';



let dialog1;


function logMessage(mess) {
	$('#log1').val(function(i, oldVal) {
		return oldVal + "\n" + mess;
	});

}


$(document).ready(function() {

	
	
	
	dialog1 = new AccModalDialog({
		title: "Диалог по умолчанию",
		contentUrl: accordUtils.accordPath+"demos/contentFragment.html",
		autosize: true,
		onOk: ()=>{
			logMessage("dialog1 сохранён.");
		},
		onCancel: ()=>{
			logMessage("dialog1 закрытие без сохранения.");
		},
		onInitiated: ()=>{
			dialog1.show();
		},
		fragmentLoadMode: LoadModes.FETCH
	});

	dialog1.addEventListener(AccModalDialogEvents.onClose, e => {
		console.log("dialog1 закрыт.");
	});
	
		
	
	$("#b1").click(e => {
		dialog1.show();
	});


});





