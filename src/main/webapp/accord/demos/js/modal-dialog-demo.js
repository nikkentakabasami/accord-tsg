
import { AccModalDialog } from '../../js/modal-dialog.js';



let dialog1;
let dialog2;
let dialog3;
let dialog4;


function logMessage(mess) {
	$('#log1').val(function(i, oldVal) {
		return oldVal + "\n" + mess;
	});

}


$(document).ready(function() {

	dialog1 = new AccModalDialog({
		title: "Диалог по умолчанию",
		contentText: "Этот диалог показывается после инициализации.<br>Содержит заданный текст. <br> Диалог можно перетаскивать за заголовок",
		onOk: ()=>{
			logMessage("dialog1 сохранён.");
		},
		onCancel: ()=>{
			logMessage("dialog1 закрытие без сохранения.");
		},
		onInitiated: ()=>{
//			dialog1.show();
		},
		fragmentLoadMode: AccModalDialog.LoadModes.FETCH
	});

	dialog1.addEventListener(AccModalDialog.AccModalDialogEvents.onClose, e => {
		console.log("dialog1 закрыт.");
	});
	
		
	/*
	dialog1.addEventListener(AccModalDialogEvents.onInitiated, e => {
		logMessage("dialog1 initiated.");



	});
	*/

	dialog2 = new AccModalDialog({
		dialogHeight: "150px",
		contentSelector: "#dialogContent1",
		title: "Диалог 2",
		onOk: ()=>{
			logMessage("dialog2 сохранён.");
		},
		onCancel: ()=>{
			logMessage("dialog2 закрытие без сохранения.");
		},
//		autosize: true,
		
	});
//	dialog2.show();

	
	
	dialog3 = new AccModalDialog({
		autosize: true,
		contentSelector: "#dialogContent2",
		immediateInit: false
	});
	dialog3.init();


	dialog4 = new AccModalDialog({
		dialogSelector: "#myCustomDialog"
	});

	/*
*/
	
	//	dialog.makeDraggable();



	$("#b1").click(e => {
		dialog1.show();
	});
	$("#b2").click(e => {
		dialog2.show();
	});
	$("#b3").click(e => {
		dialog3.show();
	});
	$("#b4").click(e => {
		dialog4.show();
	});



	$("#b5").click(function() {
		dialog1.hide();
		dialog2.hide();
		dialog3.hide();
	});



});





