
//import { AccModalDialog } from '../../js/accord-bundle.js';



let dialog1;
let dialog2;
let dialog3;
let dialog4;





let bh1 = {
	
	showDialog1(){
		dialog1.show();
	},
	showDialog2(){
		dialog2.show();
	},
	showDialog3(){
		dialog3.show();
	},
	showDialog4(){
		dialog4.show();
	},
	hideAll(){
		dialog1.hide();
		dialog2.hide();
		dialog3.hide();
	},
	
}
bh1.showDialog1.init = createDialog1;
bh1.showDialog2.init = createDialog2;
bh1.showDialog3.init = createDialog3;
bh1.showDialog4.init = createDialog4;


function createDialog1(){
	dialog1 = new AccModalDialog({
		title: "Диалог по умолчанию",
		contentText: "Этот диалог показывается после инициализации.<br>Содержит заданный текст. <br> Диалог можно перетаскивать за заголовок",
		immediateInit: false,
		closeOnEsc: true,
		onOk: ()=>{
			log("dialog1 сохранён.");
		},
		onCancel: ()=>{
			log("dialog1 закрытие без сохранения.");
		},
		onInitiated: ()=>{
//			dialog1.show();
		},
		fragmentLoadMode: AccModalDialog.LoadModes.FETCH
	});

	dialog1.addEventListener(AccModalDialog.AccModalDialogEvents.onClose, e => {
		console.log("dialog1 закрыт.");
	});
	
	
	dialog1.init().then(()=>{
		console.log("dialog1 инициализирован.");
	});	
}


function createDialog2(){
	dialog2 = new AccModalDialog({
		dialogHeight: "150px",
		contentSelector: "#dialogContent1",
		title: "Диалог 2",
		onOk: ()=>{
			log("dialog2 сохранён.");
		},
		onCancel: ()=>{
			log("dialog2 закрытие без сохранения.");
		},
//		autosize: true,
		
	});
	
}
function createDialog3(){
	
	dialog3 = new AccModalDialog({
		autosize: true,
		contentSelector: "#dialogContent2",
		immediateInit: false
	});
	dialog3.init();	
	
}

function createDialog4(){
	
	dialog4 = new AccModalDialog({
		dialogSelector: "#myCustomDialog"
	});
	
}

$(document).ready(function() {

	addDemoButtons(bh1)

	
		
	createDialog1();
	createDialog2();
	createDialog3();
	createDialog4();
		

});





