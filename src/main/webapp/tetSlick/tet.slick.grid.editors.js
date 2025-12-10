
import {AbstractModule} from './tet.slick.grid.misc.js';
import {initDateEditor} from './mtp/tet.slick.grid.dateRange.js';
import {tsgUtils} from './tet.slick.grid.utils.js';



/**
 * Позволяет редактировать таблицу.
 * Для использования - задать опцию таблицы "editMode", и задать editor в оции столбцов
 * 
 */
export class EditorsModule  extends AbstractModule {
	
	//мап с редакторами. Ключ - id столбца
	editors = {};
	
	standartEditors = {}
	
	editMode;
	
	currentEditor = null;
	
	constructor(grid){
		super(grid);
	}
	
	
	init(){
		
		this.editMode = this.grid.model.options.editMode;
		
		if (this.editMode==null){
			return;
		}

		tsgUtils.loadFragment("editors.html", () =>{
			
//			textEditPopup = new TextEditPopup();
//			booleanEdit = new BooleanEditor();		
			
			this.standartEditors.boolean = new BooleanEditor(this.grid);
			this.standartEditors.text = new TextEditPopup(this.grid);
			this.standartEditors.date = new DateEditPopup(this.grid);
			
			this._doInit();
		});		
		
		
		
		
		
	}
	
	_doInit(){

		//Заполняем мап editors
		this.grid.model.columns.forEach(column => {
			let editor = column.editor;

			if (typeof editor == 'string'){
				editor = this.standartEditors[editor];
			}
			
			if (!editor){
				return;
			}
		
			this.editors[column.id] = editor;
		});

		//при щелчке на таблице - прячем текущий редактор
		this.grid.addEventListener(tsgUtils.tableEvents.gridClick, () => {
			if (this.currentEditor!=null && this.currentEditor.visible){
				this.currentEditor.hide();
			}
		});			

		//обработчики для показа диалога редактирования
		if (this.editMode=='clickSelected'){
			this.grid.addEventListener(tsgUtils.tableEvents.gridClickSelectedRow, this.clickHandler);			
		} else if (this.editMode=='dblClick'){
			this.grid.addEventListener(tsgUtils.tableEvents.gridDblClick, this.clickHandler);			
		}		
		
	}
	
	clickHandler = e=>{
		let detail = e.detail;
		let editor = this.editors[detail.column.id];
		if (!editor){
			return;
		}
		
		if (editor==this.currentEditor && this.currentEditor.visible){
			return;
		}

		this.currentEditor = editor;
		editor.editValue(detail.row, detail.column, e.detail.rootEvent);
	}
	
}




//Основа для редакторов значения ячейки
class AbstractEdit {
	
	row;
	column;
	grid;
	lastValue;
	
	visible = false;
	
	constructor(grid){
		this.grid = grid;
	}
	
	editValue(row, column, rootEvent){
		this.row = row;
		this.column = column;
		this.lastValue = this.row[this.column.id];
	}
	
}

//Редактор булевых значений - просто меняет значение на противоположное
class BooleanEditor extends AbstractEdit {
	
	constructor(grid){
		super(grid);
	}
	
	editValue(row, column, rootEvent){
		super.editValue(row, column, rootEvent);
		
		row[column.id] = !this.lastValue; 
		this.grid.updateRow(row);
		this.grid.dispatch(tsgUtils.tableEvents.rowEdited, row);
	}
	
	
}

//Основа для редакторов с всплывающей панелью
class AbstractEditPopup extends AbstractEdit {
	
	$popup;
	$input;
	$button;

	constructor(grid){
		super(grid);
	}
	
	
	editValue(row, column, rootEvent){
		super.editValue(row, column, rootEvent);
		
		let val = row[column.id];
		this.val(val);
		
		let top = Math.max(10,rootEvent.pageY-45);
		let left = Math.max(10,rootEvent.pageX-60);
		
		this.$popup.css("top",top+"px");
		this.$popup.css("left",left+"px");
		
		this.$popup.show();
		this.visible = true;
		
		this.$input.focus()
		
	}


	hide(){
		if (this.visible){
			this.$popup.hide();
			this.visible = false;
		}
	}

	/**
	 * Задание и получение значений из диалога 
	 **/	
	val(value){
		if (value==null){
			return this.$input.val();
		} else {
			this.$input.val(value);
		}
	}
	
	onOk(){
	
		let value = this.val();
		this.row[this.column.id] = value; 
		this.grid.updateRow(this.row);
		this.$popup.hide();
		this.grid.dispatch(tsgUtils.tableEvents.rowEdited, this.row);
		
	}
	
}

//редактор текстовых значений
class TextEditPopup extends AbstractEditPopup {

	constructor(grid){
		super(grid);
		this.$popup = $('#tsgTextEditPopup');
		this.$input = this.$popup.find("input");
		this.$button = this.$popup.find("span.edit-popup-button");
		
		
		this.$button.click(e => {
			this.onOk();
		});
		
		this.$input.change(e => {
			this.onOk();
		});
	}
}


//редактор даты
class DateEditPopup extends AbstractEditPopup {

	$data;

	constructor(grid){
		super(grid);
		this.$popup = $('#tsgDateEditPopup');
		this.$input = this.$popup.find("input");
		this.$button = this.$popup.find("span.edit-popup-button");
		
		initDateEditor(this.$input, () => {
//			alert('ok');
//			this.onOk();
		})
		
		this.$input.keydown(e => {
			if (e.keyCode==13){
				this.onOk();
			}
		});
		
		
		this.$data = this.$input.data('daterangepicker');
		
		this.$button.click(e => {
			this.onOk();
		});
		
		
	}
	
	val(value){
		if (value==null){
			return this.$input.val();
		} else {
			this.$input.val(value);
			this.$data.setStartDate(value);
			this.$data.setEndDate(value);
		}
	}	
	

	
	
}







