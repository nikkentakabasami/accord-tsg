

export { AccModalDialog };


import { accordUtils } from './accord-utils.js';
import { AccDrag } from './accord-drag.js';





const accModelDialogDefaultOptions = {

	dialogSelector: null,	//можно задать, если нужен кастомный диалог
	contentSelector: null,	//содержимое,которое нужно показывать в диалоге
	contentText: null,		//содержимое в виде текста
	contentUrl: null,		//путь к содержимому
	dialogWidth: "600px",
	dialogHeight: "300px",
	autosize: false,	//автоматический подбор высоты
	onOk: null,			//обработчик: нажатие кнопки ok (вызывать hide() не нужно)
	onCancel: null,		//обработчик: закрытие диалога без сохранения (вызывать hide() не нужно)
	onInitiated: null,  //обработчик завершения иницииации
	title: null,		//заголовок диалога
	centered: true,		//центрирует его по центру браузера
	draggable: true,	//позволяет перетаскивать диалог за заголовок
	id: null,			//id диалога. по умолчанию генерируется автоматом, но можно задать своё. Будет назначен на dom элемент: $dialog.attr("id");
	fragmentLoadMode: 1,
	immediateInit: true


	
}



/*
const LoadModes = Object.freeze({
	XHR: 1,
	FETCH: 2
});

const AccModalDialogEvents = {
	onInitiated: "onInitiated",
	onClose: "onClose",
};

*/


/**
 * Пример использования:
 * 
	dialog2 = new AccModalDialog({
		id: "customContentDialog",
		contentSelector: "#myTestFormPanel"
	});
	dialog1.addOnInitiatedHandler(() => {
		//		dialog1.show();
	});
	...
	dialog1.show();
 * 
 * демо: accModalDialogDemo.jsp
 * 
 */
class AccModalDialog extends EventTarget {

	static AccModalDialogEvents	 = {
		onInitiated: "onInitiated",
		onClose: "onClose",
	};
	
	static LoadModes = Object.freeze({
		XHR: 1,
		FETCH: 2
	});
	
	

	static counter = 0;

	//id диалога. генерируется автоматом, но можно задать своё.
	//будет назначен на элемент: $dialog.attr("id");
	id;

	//dom элементы
	$dialog;
	$header;
	$body;
	$okButton;
	$cancelButton;
	$closeButton;

	accDrag;

	options;

	#calced_body_height = null;

	dispatch(eventName, detail) {
		this.dispatchEvent(new CustomEvent(eventName, { detail: detail }));
	}



	constructor(options) {
		super();

		this.options = $.extend({}, accModelDialogDefaultOptions, options);

		if (this.options.id) {
			this.id = this.options.id;
		} else {
			AccModalDialog.counter++;
			this.id = "accd" + AccModalDialog.counter;
		}

		window[this.id] = this;

		if (this.options.immediateInit) {
			this.init();
		}


	}


	async init() {

		if (this.options.dialogSelector) {
			this.$dialog = $(this.options.dialogSelector);

			//если диалог находится в <template>
			let templateContent = this.$dialog.prop('content');
			if (templateContent) {
				this.$dialog = $(templateContent);
				this.$dialog = this.$dialog.find(".acc-dialog");
			}
			this.$dialog.remove().appendTo(document.body);
			
		} else {
			
			if (this.options.fragmentLoadMode == AccModalDialog.LoadModes.XHR) {
				this.loadHtmlFragmentXHR();
//				this.#initAfterLoad();
			} else {
				await this.loadHtmlFragmentFetch();
			}
		}
		
		this.#initAfterLoad();

		if (this.options.onInitiated) {
			this.options.onInitiated();
		}
		this.dispatch(AccModalDialog.AccModalDialogEvents.onInitiated);

	}


	#initAfterLoad() {
		this.$dialog.attr("id", this.id);

		this.$header = this.$dialog.find(".acc-dialog-dtop");
		this.$body = this.$dialog.find(".acc-dialog-dbody");

		this.$okButton = this.$dialog.find(".acc-ok");
		this.$cancelButton = this.$dialog.find(".acc-cancel");

		this.$closeButton = this.$header.find(".acc-close-btn");


		let closeHandler = e => {
			this.hide();
			if (this.options.onCancel) {
				this.options.onCancel();
			}
		}

		this.$cancelButton.click(closeHandler);
		this.$closeButton.click(closeHandler);

		this.$okButton.click(e => {
			this.hide();
			if (this.options.onOk) {
				this.options.onOk();
			}
		});



		if (this.options.dialogWidth) {
			this.$dialog.css("width", this.options.dialogWidth);
		}
		if (this.options.dialogHeight) {
			this.$dialog.css("height", this.options.dialogHeight);
		}

		if (this.options.title) {
			this.$dialog.find(".acc-dialog-title").text(this.options.title);
		}

		
		if (this.options.contentUrl) {
			
			let $cont = accordUtils.loadHtmlFragmentXHR(this.options.contentUrl, this.$body, true);		
			
			
		} else if (this.options.contentText) {
			this.$body.html(this.options.contentText);
		} else if (this.options.contentSelector) {
			let $cont = $(this.options.contentSelector);

			if ($cont.length > 0) {

				//Если задан <template>
				let templateContent = $cont.prop('content');
				if (templateContent) {
					$cont = $(templateContent);
				}


				$cont.remove().appendTo(this.$body);

			} else {
				console.log('not found element ' + this.options.contentSelector);
			}

		}

		if (this.options.draggable) {
			
			let options = {
				panelSelector: this.$dialog,
				handleElementSelector: this.$header
			}
			this.accDrag = new AccDrag(options);
		}


	}

	loadHtmlFragmentJQLoad() {
			let $td = $("<div></div>");
			$td.appendTo(document.body);
			$td.load(accordUtils.accordPath + "fragments/modalDialog.html", () => {
				this.$dialog = $("#accd0");
				console.log("modalDialog.html loaded.");
			});		
		
	}
	
	
	async loadHtmlFragmentFetch() {
		this.$dialog = await accordUtils.loadHtmlFragmentFetch("fragments/modalDialog.html", null, true);		
	}



	loadHtmlFragmentXHR() {
		this.$dialog = accordUtils.loadHtmlFragmentXHR("fragments/modalDialog.html", null, true);		
	}


	show() {

		this.$dialog.css("display", "flex");


		if (this.options.autosize && !this.#calced_body_height) {
			this.#calced_body_height = this.$body.height();;
			this.$dialog.height(this.#calced_body_height + 100);
		}

		if (this.options.centered) {
			accordUtils.alignToCenter(this.$dialog);
		}


	}

	hide() {
		this.$dialog.fadeOut();
		this.dispatch(AccModalDialog.AccModalDialogEvents.onClose);
	}


}









