

import {tableEvents} from './tet.slick.grid.events.js';
import {AbstractModule} from './tet.slick.grid.misc.js';


export class NoSelectModel  extends AbstractModule {
	
	constructor(grid){
		super(grid);
		
	}
	
	init(){
		if (this._initiated){
			return;
		}
		this._initiated = true;
		
		this.grid.addEventListener(tableEvents.gridClick, this._onGridClick);
	}


	clear(){
		if (!this._initiated){
			return;
		}
		
		this.grid.removeEventListener(tableEvents.gridClick, this._onGridClick);
		this._initiated = false;
	}


	_onGridClick = event => {
			let detail = event.detail;
			
			if (detail.row==null){
				this.deselectAll();
				return;
			}
			this._doHandleGridClick(detail);
		};

	getSelectedRowIndex(){
		return null;
	}
	getSelectedRow(){
		return null;
	}
	
	selectRow(rowIndex, dispatchEvent = true){
	}
	deselectRow(rowIndex, dispatchEvent = true){
	}
	
	deselectAll(dispatchEvent = true){
	}

	isHighlightedCell(rowNo, colNo){
		return false;
	}
	
	_dispatchChangeEvent(dispatchEvent = true){
		if (dispatchEvent){
			this.grid.dispatch(tableEvents.selectionChanged);
		}
	}
	
	_changeRowSelectionClass(rowIndex, addSelectedClass, onlyMergedCells = false){
		if (rowIndex==null){
			return;
		}

		let $selRow = this.grid.view.$rows[rowIndex];
		if (!$selRow){
			return;
		}
		
		
		let $cells
		if (onlyMergedCells){
			$cells = $selRow.find("div.merged-cell")
		} else {
			$cells = $selRow.find("div.def-cell")
		}
		
		if (addSelectedClass){
			$cells.addClass(this.grid.model.options.selectedCellCssClass);
		} else {
			$cells.removeClass(this.grid.model.options.selectedCellCssClass);
		}
	}
	
	_doHandleGridClick(detail){
	}
	
	
}

export class SingleRowSelectModel extends NoSelectModel {

	//индекс выбранной строки	
	_selRowIndex = null;
	
	
	getSelectedRowIndex(){
		return this._selRowIndex;
	}

	getSelectedRow(){
		return this.grid.dataLoader.data[this._selRowIndex];
	}

	isHighlightedCell(rowNo, colNo){
		return (this._selRowIndex==rowNo); 
	}

	clear(){
		super.clear();
		this._selRowIndex = null;
	}
	
	deselectAll(dispatchEvent = true){
		if (this._selRowIndex==null){
			return;
		}
		this._changeRowSelectionClass(this._selRowIndex, false);
		this._selRowIndex = null;
		
		this._dispatchChangeEvent(dispatchEvent);
	}
	
	
	deselectRow(rowIndex, dispatchEvent = true){
		if (rowIndex!=this._selRowIndex){
			return;
		}
		this.deselectAll(dispatchEvent);
	}	
	
	selectRow(rowIndex, dispatchEvent = true){
		//выделение не изменилось
		if (rowIndex==this._selRowIndex){
			return;
		}
		this.deselectAll();
		
		this._selRowIndex = rowIndex;
		this._changeRowSelectionClass(this._selRowIndex, true);
		this._dispatchChangeEvent(dispatchEvent);
	}

	
	_doHandleGridClick(detail){
		this.selectRow(detail.row.index);
	}
	

	
}


export class GroupExcelSelectModel extends SingleRowSelectModel {

	_selParentRowIndex = null;


	isHighlightedCell(rowNo, colNo){
		if (this._selRowIndex==null){
			return false;
		}
		
		if (this._selRowIndex==rowNo){
			return true;
		}
		
		let parentRowIndex = this.getSelectedRow().geParent;
		return (parentRowIndex==rowNo && this.grid.groupModule.groupColumnsIndexes.indexOf(colNo)>=0); 
	}

	
	deselectAll(dispatchEvent = true){
		if (this._selRowIndex==null){
			return;
		}
		this._changeRowSelectionClass(this._selRowIndex, false, false);
		this._changeRowSelectionClass(this._selRowIndex, false, true);
		
		this._changeRowSelectionClass(this._selParentRowIndex, false, true);
		this._selRowIndex = null;
		this._selParentRowIndex = null;
		
		this._dispatchChangeEvent(dispatchEvent);
	}
	
	selectRow(rowIndex, dispatchEvent = true){
		//выделение не изменилось
		if (rowIndex==this._selRowIndex){
			return;
		}
		this.deselectAll();
		
		this._selRowIndex = rowIndex;
		this._selParentRowIndex = this.getSelectedRow().geParent;
		
		this._changeRowSelectionClass(this._selRowIndex, true, false);
		this._changeRowSelectionClass(this._selRowIndex, true, true);
		
		this._changeRowSelectionClass(this._selParentRowIndex, true, true);
		this._dispatchChangeEvent(dispatchEvent);
	}

	
	_doHandleGridClick(detail){
		this.selectRow(detail.row.index);
	}
	

	
}










export class MultiRowSelectModel extends NoSelectModel {
	
	_selRowIndexes = [];
	
	getSelectedRowIndex(){
		return this._selRowIndexes.length>0?this._selRowIndexes[0]:null;
	}

	getSelectedRow(){
		let ind = this.getSelectedRowIndex();
		return ind!=null?this.grid.dataLoader.data[ind]:null;
	}
	
	getSelectedRowIndexes(){
		return this._selRowIndexes;
	}
	
	getSelectedRows(){
		let result = this._selRowIndexes.map(ind => {
			return this.grid.dataLoader.data[ind];
		});
		return result;		
	}
	
	isHighlightedCell(rowNo, colNo){
		return this._selRowIndexes.indexOf(rowNo)>=0; 
	}
	
	
	
	clear(){
		super.clear();
		this._selRowIndexes.length=0;
	}
	
	deselectAll(dispatchEvent = true){
		if (this._selRowIndexes.length==0){
			return;
		}
		
		this._selRowIndexes.forEach(item => {
			this._changeRowSelectionClass(item, false);
		});
		
		this._selRowIndexes.length=0;
		this._dispatchChangeEvent(dispatchEvent);
	}

	addToSelection(rowIndex, dispatchEvent = true){
		
		let ind = this._selRowIndexes.indexOf(rowIndex);
		if (ind>=0){
			return;
		}
		
		this._selRowIndexes.push(rowIndex);
		this.#sortRowIndexes();
		
		this._changeRowSelectionClass(rowIndex, true);
		this._dispatchChangeEvent(dispatchEvent);
	}

	removeFromSelection(rowIndex, dispatchEvent = true){

		let ind = this._selRowIndexes.indexOf(rowIndex);
		if (ind<0){
			return;
		}

		this._selRowIndexes.splice(ind,1);
		this._changeRowSelectionClass(rowIndex, false);
		this._dispatchChangeEvent(dispatchEvent);
	}

	
	selectRow(rowIndex, dispatchEvent = true){
		this.deselectAll(false);
		this.addToSelection(rowIndex, dispatchEvent);
	}
	
	deselectRow(rowIndex, dispatchEvent = true){
		this.removeFromSelection(rowIndex, dispatchEvent);
	}	
	
	selectRows(rowIndexes, dispatchEvent = true){
		this.deselectAll();
		
		if (rowIndexes.length==0){
			return;
		}
		
		this._selRowIndexes = rowIndexes.slice();
		this.#sortRowIndexes();
		this._selRowIndexes.forEach(item => {
			this._changeRowSelectionClass(item, true);
		});
		
		this._dispatchChangeEvent(dispatchEvent);
	}
	

	#sortRowIndexes(){
		this._selRowIndexes.sort((a, b)=> {return a-b;})
	}
	
	_doHandleGridClick(detail){
		
		let rowNo = detail.row.index;
		
		if (this._selRowIndexes.length==0){
			this.selectRow(rowNo);
			return;			
		}
		
		let ind = this._selRowIndexes.indexOf(rowNo);


		if (detail.ctrlKey){
			
			if (ind<0){
				this.addToSelection(rowNo, true);
			} else {
				this.removeFromSelection(rowNo, true);
			}
			
			
		} else if (detail.shiftKey){

			let sri = this._selRowIndexes.slice();
			
			let fs = sri[0];
			let ls = sri[sri.length-1];
			
			if (rowNo<fs){
				for(let i=rowNo;i<fs;i++){
					sri.push(i);
				}				
			} else if (rowNo>ls){
				for(let i=ls+1;i<=rowNo;i++){
					sri.push(i);
				}				
			}
			this.selectRows(sri,true);
			
		} else {
			this.selectRow(rowNo);
		}
	}

	
	
	
}	














