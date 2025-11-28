
import { waitPanel } from '../../accord/wait-panel.js';


let $myModal2;

$(document).ready(function() {

	$myModal2 = $("#myModal2");
	
	//инициализация с заданием опций: не затенять задний план, не показывать прямо сейчас
	$myModal2.modal({ backdrop: false, show: false });
	
	
	//обработка событий
	$myModal2.on('hidden.bs.modal', function() {
		$("#result").text("myModal2 is hidden!");
	});
	//  Доступны события:
	//	show.bs.modal		Occurs when the modal is about to be shown
	//	shown.bs.modal		Occurs when the modal is fully shown
	//	hide.bs.modal		Occurs when the modal is about to be hidden
	//	hidden.bs.modal		Occurs when the modal is fully hidden

		
	//показ
	$("#b3").click(function() {
		$myModal2.modal();
	});
	
	


	$("#b4").click(function() {
		waitPanel.show();
	});

	

	
	
});









