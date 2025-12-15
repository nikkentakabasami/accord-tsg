

import { AccPopup, accordUtils } from '../../js/accord-publish.js';


let p1;




$(function() {


  $("div.acc-desc-panel").click(e => {
	p1.showForClickEvent(e);
  });

  $("#fname1").click(e => {
	p1.showForElement(e.target, AccPopup.Layouts.BOTTOM_RIGHT);

	//		p1.showForElement(e.target);


	//		let pos = accordUtils.calcElementPosition(e.target);
	//		console.log(pos);
	//		p1.show(pos.x, pos.y);

  })

  $("#sname1").click(e => {
	p1.showForElement(e.target, AccPopup.Layouts.BOTTOM);
  });





  //показ текстового содержимого
  let options = {
	contentText: "p1 - Тестовая панель.",
	draggable: true,	//позволяет перетаскивать диалог за заголовок
	width: "300px",
	hideOnOutsideClick: true
  }
  let p1 = new AccPopup(options);





  $("#b1").click(e => {
	p1.show();
  });

  $("#b2").click(e => {
	p1.hide();
  });


});





