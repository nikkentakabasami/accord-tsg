
let counter = 0;

$(document).ready(function() {


	$(".btn1").click(e => {

		let tbody = document.querySelector("tbody");
		let template = document.querySelector("#template1");

		// Клонируем новую строку и вставляем её в таблицу
		let clone = template.content.cloneNode(true);
		let td = clone.querySelectorAll("td");
		td[0].textContent = "1235646565";
		td[1].textContent = "Stuff";

		tbody.appendChild(clone);

		// Клонируем новую строку ещё раз и вставляем её в таблицу
		let clone2 = template.content.cloneNode(true);
		td = clone2.querySelectorAll("td");
		td[0].textContent = "0384928528";
		td[1].textContent = "Acme Kidney Beans 2";

		tbody.appendChild(clone2);


	});

	$(".btn2").click(e => {

		let $template = $('#template2');
		let node = $template.prop('content');

		$(node).appendTo($("tbody"));


		//		$("#myrows").contents().appendTo($("tbody"));
		//		$("#mytemplate").contents().appendTo($("tbody"));
	});



	$(".btn3").click(e => {

		counter++;
		
		let $template = $('#template1');
		let $node = $($template.prop('content'));

		let $clone = $node.clone();

		$clone.find("td:eq(0)").text(counter+" saa");
		$clone.find("td:eq(1)").text("tobira");

		/*
		//альтернативные способы
		let tds = $clone.find("td").get();
		$(tds[0]).text("saa");
		$(tds[1]).text("tobira");

		$clone.find("td").each(function(index) {
		  $(this).text(index === 0 ? "saa" : "tobira");
		});			
		*/
		
		
		
		
		

		$clone.appendTo($("tbody"));


		//		$("#myrows").contents().appendTo($("tbody"));
		//		$("#mytemplate").contents().appendTo($("tbody"));
	});







});



