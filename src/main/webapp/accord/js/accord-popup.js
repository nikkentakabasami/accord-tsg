

export { AccPopup };


import { accordUtils } from './accord-utils.js';
import { AccDrag } from './accord-drag.js';


let LoadModes = Object.freeze({
    XHR: 1,
    FETCH: 2
});

let Layouts = Object.freeze({
    TOP: 1,
    BOTTOM: 2,
    RIGHT: 3,
    BOTTOM_RIGHT: 4,
});



const accPopupDefaultOptions = {

    panelSelector: null,	//панель, которую нужно сделать всплывающей
    panelUrl: null,		//путь к содержимому
    contentSelector: null,	//содержимое панели (сама панель при этом будет создана автоматом)
    contentText: null,		//содержимое в виде текста
    panelExtraClasses: "no-select acc-popup",	//дополнительные классы, которые будут заданы на панель
    draggable: false,	//позволяет перетаскивать диалог за заголовок
    id: null,			//id диалога. по умолчанию генерируется автоматом, но можно задать своё. Будет назначен на dom элемент: $dialog.attr("id");
    fragmentLoadMode: LoadModes.XHR,
    centered: false,		//центрирует его по центру браузера
    immediateInit: true,
    width: null,
    height: null,
    hideOnOutsideClick: false	//скрывает панель при клике за её пределами


}


/**
 * Класс для создания плавающих панелей с абсолютным позиционированием.
 * При создании объекта - добавляется глобальная переменная вида window.accpop1, window.accpop2...
 * 
 * 
 */
class AccPopup {

    static LoadModes = LoadModes;
    static Layouts = Layouts;



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

	//признак видимости панели
	visible = false;
	showTimerId = null;
	
	

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

    async init() {

		
		if (this.options.hideOnOutsideClick) {
			//скрываем панель при клике за её пределами
			$(document).bind("click", (e) => {
				if (this.visible && !this.$dialog.is(e.target) && this.$dialog.has(e.target).length===0) {
					this.hide();
				}
			});
		}

        //задана своя панель
        if (this.options.panelSelector) {
            this.$dialog = $(this.options.panelSelector);

            //если диалог находится в <template>
            let templateContent = this.$dialog.prop('content');
            if (templateContent) {
                this.$dialog = $(templateContent);
                //				this.$dialog = this.$dialog.find(".acc-popup");
            }

        } else if (this.options.panelUrl) {

            if (this.options.fragmentLoadMode == AccModalDialog.LoadModes.XHR) {
                this.$dialog = accordUtils.loadHtmlFragmentXHR(this.options.panelUrl, null, true);
            } else {
                this.$dialog = await accordUtils.loadHtmlFragmentFetch(this.options.panelUrl, null, true);
            }

        } else {
            //создаём панель по умолчанию: не выделяемую, с рамкой и белым задником
            this.$dialog = $('<div class="acc-popup-default"></div>');
        }

        if (this.options.panelExtraClasses) {

            var classList = this.options.panelExtraClasses.split(/\s+/);
            classList.forEach(cl => {
                this.$dialog.addClass(cl);
            });

        }

        this.$dialog.remove().appendTo(document.body);
        //		this.$dialog.addClass("acc-popup");

        if (this.options.width) {
            this.$dialog.css("width", this.options.width);
        }
        if (this.options.height) {
            this.$dialog.css("height", this.options.height);
        }

        this.$dialog.attr("id", this.id);

        //загружаем содержимое, если оно задано в виде текста
        if (this.options.contentText) {
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


    showForElement($target, layout) {
        if (!$target.jquery) {
            $target = $($target);
        }

        let pos = accordUtils.calcElementPosition($target);

        if (layout == Layouts.BOTTOM_RIGHT) {
            pos.x += $target.outerWidth();
            pos.y += $target.outerHeight();
        } else if (layout == Layouts.BOTTOM) {
            pos.y += $target.outerHeight();
        } else if (layout == Layouts.RIGHT) {
            pos.x += $target.outerWidth();
        }

        this.show(pos.x, pos.y);

    }


    showForClickEvent(e) {
        if (e.pageX) {
            this.show(e.pageX, e.pageY);
        }
    }

    show(x, y) {
		
		if (this.options.hideOnOutsideClick) {
			this.visible = false;
			
			if (this.showTimerId){
				clearTimeout(this.showTimerId);
				this.showTimerId = null;
			}
			
			//добавляем признак видимости с задержкой - ведь на внешние клики может быть назначен и показ этой панели
		    this.showTimerId = setTimeout(() => {
				this.visible = true;
				this.showTimerId = null;
		    }, 300);
		} else {
			this.visible = true;
		}
		
		
		
		
        if (x) {
            if (typeof x == 'number') {
                x = x + "px";
            }
            this.$dialog.css("left", x);
        }

        if (y) {
            if (typeof y == 'number') {
                y = y + "px";
            }
            this.$dialog.css("top", y);
        }

        this.$dialog.css("display", "flex");
		
        if (this.options.centered) {
            accordUtils.alignToCenter(this.$dialog);
        }



    }

    hide() {
        //        this.$dialog.fadeOut();
        this.$dialog.css("display", "none");
		this.visible = false;
		if (this.showTimerId){
			clearTimeout(this.showTimerId);
			this.showTimerId = null;
		}
    }





}









