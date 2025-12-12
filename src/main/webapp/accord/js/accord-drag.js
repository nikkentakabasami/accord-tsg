

export { AccDrag };

const accDragOptions = {
	panelSelector: null,			//панель с абсолютным позиционированием, которую нужно перетаскивать
	handleElementSelector: null,	//за какой элемент перетаскивать эту панель
}


class AccDrag {
	
	//dom элементы
	$panel;
	$handleElement;

	//поддержка перетаскивания
	isDragging = false;
	startX;
	startY;
	initialLeft;
	initialTop;

	options;


	constructor(options) {

		this.options = $.extend({}, accDragOptions, options);

		if (this.options.handleElementSelector){
			this.$handleElement = $(this.options.handleElementSelector);
			
			if (this.options.panelSelector){
				this.$panel = $(this.options.panelSelector);
			} else {
				
				let $p = this.$handleElement;
				
				while ($p.css("position")!='absolute'){
					$p = $p.parent();
					if ($p.length==0){
						throw new Error('panel not found');
					}
				}
				this.$panel = $p;
			}
			
			
			
		} else if (this.options.panelSelector){
			this.$panel = $(this.options.panelSelector);
			this.$handleElement = this.$panel;
			if (this.options.handleElementSelector){
				this.$handleElement = $(this.options.handleElementSelector);
			}
		}
		
		
		this.#makeDraggable();


	}

	#makeDraggable() {

		this.$handleElement.on('mousedown', e => {
			e.preventDefault();

			this.isDragging = true;
			this.startX = e.pageX;
			this.startY = e.pageY;
			this.initialLeft = parseInt(this.$panel.css('left'), 10) || 0;
			this.initialTop = parseInt(this.$panel.css('top'), 10) || 0;
		});


		$(document).on('mouseup', e => {
			this.isDragging = false;
		});

		$(document).on('mousemove', e => {
			if (this.isDragging) {
				var dx = e.pageX - this.startX;
				var dy = e.pageY - this.startY;

				let pos = {
					left: this.initialLeft + dx,
					top: this.initialTop + dy
				};

				if (pos.left > 0 && pos.top > 0) {
					this.$panel.css(pos);
				}
			}
		});


	}




}









