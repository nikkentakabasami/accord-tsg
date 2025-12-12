

export { AccPopup };


import { accordUtils } from './accord-utils.js';
import { AccDrag } from './accord-drag.js';



const accPopupDefaultOptions = {

	panelSelector: null,	//содержимое,которое нужно показывать в диалоге
	contentSelector: null,	//содержимое,которое нужно показывать в диалоге
	contentText: null,		//содержимое в виде текста
	panelUrl: null,		//путь к содержимому
	draggable: true,	//позволяет перетаскивать диалог за заголовок
	id: null,			//id диалога. по умолчанию генерируется автоматом, но можно задать своё. Будет назначен на dom элемент: $dialog.attr("id");
	fragmentLoadMode: 1,
	centered: false,		//центрирует его по центру браузера
	immediateInit: true,
	width: null,
	height: null,
	
	
}


class AccPopup {
	
	static LoadModes = Object.freeze({
		XHR: 1,
		FETCH: 2
	});
	
	

	static counter = 0;

	id;

	//dom элементы
	$dialog;

	//поддержка перетаскивания
	isDragging = false;
	startX;
	startY;
	initialLeft;
	initialTop;

	options;

	accDrag;
	

	constructor(options) {

		this.options = $.extend({}, accPopupDefaultOptions, options);

		if (this.options.id) {
			this.id = this.options.id;
		} else {
			AccPopup.counter++;
			this.id = "accpop" + AccPopup.counter;
		}

		window[this.id] = this;

		if (this.options.immediateInit) {
			this.init();
		}


	}


	init() {

		//находим базовый элемент $dialog
		
		//задана своя панель
		if (this.options.panelSelector) {
			this.$dialog = $(this.options.panelSelector);

			//если диалог находится в <template>
			let templateContent = this.$dialog.prop('content');
			if (templateContent) {
				this.$dialog = $(templateContent);
//				this.$dialog = this.$dialog.find(".acc-popup");
			}
			
		} else {
			//создаём панель по умолчанию: не выделяемую, с рамкой и белым задником
			this.$dialog = $('<div class="no-select acc-popup-default"></div>');
		}
		
		
		this.$dialog.remove().appendTo(document.body);
		this.$dialog.addClass("acc-popup");

		if (this.options.width) {
			this.$dialog.css("width", this.options.width);
		}
		if (this.options.height) {
			this.$dialog.css("height", this.options.height);
		}		
		
		this.$dialog.attr("id", this.id);


		//загружаем содержимое, если оно задано в виде url
		if (this.options.contentUrl) {
			
			accordUtils.loadHtmlFragmentXHR(this.options.contentUrl, this.$dialog, true);		
			
		//загружаем содержимое, если оно задано в виде текста
		} else if (this.options.contentText) {
			this.$dialog.html(this.options.contentText);
			
		//загружаем содержимое, если оно задано в виде элемента на странице или шаблона
		} else if (this.options.contentSelector) {
			let $cont = $(this.options.contentSelector);
			if ($cont.length > 0) {
				//Если задан <template>
				let templateContent = $cont.prop('content');
				if (templateContent) {
					$cont = $(templateContent);
				}
				$cont.remove().appendTo(this.$dialog);
			} else {
				console.log('not found element ' + this.options.contentSelector);
			}

		}

		//делаем панель перетаскиваемой
		if (this.options.draggable) {
			
			let options = {
				panelSelector: this.$dialog,
				handleElementSelector: this.$dialog
			}
			
			this.accDrag = new AccDrag(options);
		}

	}


	show(x,y) {

		if (x){
			if (typeof x =='number'){
				x = x+"px";
			}
			this.$dialog.css("left", x);
		}
		
		if (y){
			if (typeof y =='number'){
				y = y+"px";
			}
			this.$dialog.css("top", y);
		}
		
		this.$dialog.css("display", "flex");

		if (this.options.centered) {
			accordUtils.alignToCenter(this.$dialog);
		}

	}

	hide() {
		this.$dialog.fadeOut();
	}





}









