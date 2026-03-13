

export { AccSplitter };


import { accordUtils } from './accord-utils.js';


const accSplitterDefaultOptions = {

	panelSelector: null,	//панель, на которую нужно добавить splitter
	id: null,				//id, которое будет задано на родительскую панель. По умолчанию генерируется: accsp1, accsp2..
	immediateInit: true,
	panelExtraClasses: "",	//дополнительные классы, которые будут заданы на панель
	startLeftPanelWidth: null	//начальная ширина левой панели
	
}


/**
 * Добавляет на заданную div-панель splitter, который позволяет менять размеры подпанелей.
 * Всё что надо - передать в конструктор селектор родительской панели, содержащей 2 дочерние div-панели.
 *
 * Пример: 
  splitterPanel1 = new AccSplitter(	{
		panelSelector: "#mySplitPanel1",
		startLeftPanelWidth: 300
	});	
 * 
 */
class AccSplitter {

    static counter = 0;

    id;

	    //dom элементы
	    $panel;
		$resizer;
		$leftPanel;
		$rightPanel;
		
	
		startX;
		startWidth;
		isResizing = false;	
		
	
    options;

    constructor(options) {

        this.options = $.extend({}, accSplitterDefaultOptions, options);

        if (this.options.id) {
            this.id = this.options.id;
        } else {
            AccSplitter.counter++;
            this.id = "accsp" + AccSplitter.counter;
        }

        window[this.id] = this;

        if (this.options.immediateInit) {
            this.init();
        }

    }
	
	
    init() {

		
        //задана своя панель
		this.$panel = $(this.options.panelSelector);
		this.$panel.addClass("acc-splitter-panel");
		this.$panel.attr("id", this.id);
		
        if (this.options.panelExtraClasses) {
            var classList = this.options.panelExtraClasses.split(/\s+/);
            classList.forEach(cl => {
                this.$panel.addClass(cl);
            });
        }

		this.$leftPanel = this.$panel.children("div.acc-sp-left");
		if (!this.$leftPanel.length){
			this.$leftPanel = this.$panel.children("div:first")
		}
		if (!this.$leftPanel.length){
		    throw new Error("Не найдена левая панель!");
		}
		this.$leftPanel.addClass("acc-sp-left");

		
		if (this.options.startLeftPanelWidth) {
			this.$leftPanel.width(this.options.startLeftPanelWidth);
			this.$leftPanel.css("min-width", this.options.startLeftPanelWidth+"px");
		}
		
		this.$rightPanel = this.$panel.children("div.acc-sp-right");
		if (!this.$rightPanel.length){
			this.$rightPanel = this.$panel.children("div:eq(1)")
		}
		if (!this.$rightPanel.length){
		    throw new Error("Не найдена правая панель!");
		}
		this.$rightPanel.addClass("acc-sp-right");
		
		this.$resizer = this.$panel.find("div.acc-sp-resizer");
		if (!this.$resizer.length){
			this.$resizer = $('<div class="acc-sp-resizer"></div>');
			this.$resizer.insertAfter(this.$leftPanel);
		}
		
		let self = this;
		this.$resizer.mousedown(e=>{
			this.isResizing = true;
			this.startX = e.pageX;
			this.startWidth = this.$leftPanel.width();
			document.addEventListener("mousemove", this.mousemove);
		    document.addEventListener("mouseup", this.mouseup);
		});

		this.mousemove = e=>{
			if (this.isResizing) {
				let diff = e.pageX-this.startX;
			    let newWidth = Math.max(100, this.startWidth+diff);
			    this.$leftPanel.width(newWidth);
				this.$leftPanel.css("min-width", newWidth+"px");
			}
		}			
		this.mouseup = e=>{
		    this.isResizing = false;
		    document.removeEventListener("mousemove", this.mousemove);
		    document.removeEventListener("mouseup",this.mouseup);
		}
		

    }


}
