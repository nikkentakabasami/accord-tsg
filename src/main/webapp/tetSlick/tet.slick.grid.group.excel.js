


import {AbstractModule} from './tet.slick.grid.misc.js';
import {tableEvents} from './tet.slick.grid.events.js';


/**
 * Модуль, группирующий строки в excel-стиле
 */
export class GroupExcelModule  extends AbstractModule {
	
	subgroupColumnsIndexes = [];
	groupColumnsIndexes = [];
	
	constructor(grid){
		super(grid);
		
		this.grid.addEventListener(tableEvents.afterDataLoad, event => {
			this.recalcData();
		});
		
		this.grid.addEventListener(tableEvents.afterRowsRendered, event => {
			this.mergeViewCells();
		});
		
		//при задании нового порядка столбцов
		this.grid.addEventListener(tableEvents.afterColumnsChanged, event => {
			this.calcSubgroupColumns();
		});
	}
	
	init(){
		super.init();
		
		this.calcSubgroupColumns();	
	}

	calcSubgroupColumns(){

		let subgroupColumns = this.grid.model.options.subgroupColumns;
		let groupColumns = this.grid.model.options.groupColumns;
		
		let columnsById = this.grid.model.columnsById;
		
		this.subgroupColumnsIndexes.length = 0;
		
		if (subgroupColumns){
			subgroupColumns.forEach(sgc => {
				
				let col = columnsById[sgc];
				if (!col){
					console.error('Column not found: "'+sgc+'"');
				} else {
					this.subgroupColumnsIndexes.push(col.index);
				}
			});		
		} else if (groupColumns){
			this.grid.model.columns.forEach(col => {
				if (groupColumns.indexOf(col.id)<0){
					this.subgroupColumnsIndexes.push(col.index);
				}
			});
		}
		
		this.groupColumnsIndexes.length = 0;
		this.grid.model.columns.forEach(col => {
			if (this.subgroupColumnsIndexes.indexOf(col.index)<0){
				this.groupColumnsIndexes.push(col.index);
			}
		});

		
		
	}

	mergeViewCells(){
		
		let $rows = this.grid.view.$rows;
		let data = this.grid.dataLoader.data;
		
		let rowHeight = this.grid.model.options.rowHeight;
		
		
		
		for(let i=0; i<data.length;i++){
			let row = data[i];
			if (row==null){
				continue;
			}
			let $row = $rows[i];
			if ($row==null){
				continue;
			}
		
			//сносим лишние ячейки (они будут объединены)
			if (row.isMerged){
				this.groupColumnsIndexes.forEach(colInd => {
					$row.children('.tc'+colInd).remove();		
//					$row.children('.tc'+colInd).removeClass('def-cell').addClass('hidden-cell').empty();
				});
				continue;
			}
			
			if (row.rowspan>1){
				
				let height = rowHeight*row.rowspan;
				
				this.groupColumnsIndexes.forEach(colInd => {
					$row.children('.tc'+colInd).css('height',height+'px').removeClass('def-cell').addClass('merged-cell');
				});
			}
			
		}
		
	}



	/**
	 * Находит строки, которые нужно объединить.
	 * Прописывает в первой строке группы атрибут rowspan (количество объединённых строк)
	 * А в других строках группы прописывает признак isMerged
	 */
	recalcData(){
		
		let groupFieldId = this.grid.model.options.groupFieldId;
		let data = this.grid.dataLoader.data;
		
		let firstGroupRow = null;
		
		let lgf = null;
		for(let i=0; i<data.length;i++){
			let row = data[i];
			
			if (row==null){
				let rowsInGroup = firstGroupRow?(i-firstGroupRow.index):0;
				if (firstGroupRow && rowsInGroup>1){
					firstGroupRow.rowspan = rowsInGroup;
				}
				
				firstGroupRow = null;
				lgf = null;
				continue;
			}
			
			row.rowspan = 0;
			row.isMerged = false;
			row.geParent = null;
			
//			let gf = row[groupFieldId];
			let gf = this.grid.model.extractRowCellValue(row, groupFieldId);
			
			if (gf!=lgf){
				
				let rowsInGroup = firstGroupRow?(i-firstGroupRow.index):0;
				
				if (firstGroupRow && rowsInGroup>1){
					firstGroupRow.rowspan = rowsInGroup;
				}
				
				firstGroupRow = row;
				lgf = gf;
			} else {
				row.isMerged = true;
				row.geParent = firstGroupRow.index;
				
			}
			
		}//for

		let rowsInGroup = firstGroupRow?(data.length-firstGroupRow.index):0;
		
		if (firstGroupRow && rowsInGroup>1){
			firstGroupRow.rowspan = rowsInGroup;
		}
	}
	
	calcActualRow(row, columnIndex){
		if (row.geParent!=null && this.groupColumnsIndexes.indexOf(columnIndex)>=0){
			return this.grid.dataLoader.data[row.geParent];
		}
		return row;
		
	}
	
	
	getSortColumns(){
		let sortColumns = this.grid.sortModel.sortColumns;
		
		let col = {
			columnId: this.grid.model.options.groupFieldId,
			sortAsc: true
		};
		
		if (sortColumns.length==0){
			return [col];
		}
		
		let result;		
		if (this.subgroupColumnsIndexes.indexOf(sortColumns[0].index)>=0){
			result = [col,sortColumns[0]];
		} else {
			result = [sortColumns[0],col];
		}
		
		return result;
	}
	
    getSortString() {
		
		
		let sortString = this.grid.sortModel.getSortString();
		
		let options = this.grid.model.options;

		let sortColumns = this.grid.sortModel.sortColumns;

		if (sortColumns.length==0){
			return options.groupSort;
		}
		
//		let sortColIndex = this.grid.model.columnsById[sortColumns[0]].index;
		let sortColIndex = sortColumns[0].index;
		
		if (this.subgroupColumnsIndexes.indexOf(sortColIndex)>=0){
			return options.groupSort+"_"+sortString;
		} else {
			return sortString+"_"+options.groupSort;
		}

	}
	
	/*
		let sortString = "";

		for (let i = 0; i < this.sortColumns.length; i++) {
			let col = this.sortColumns[i];

			if (i > 0) {
				sortString += "_";
			}
			sortString += col.columnId + (col.sortAsc ? "+" : "-");
		}
			
	
	
    String contractSortField = "cr.id+";
    
    String sortFields = filter.getSortField();
    if (sortFields != null && (sortFields.contains("+") || sortFields.contains("-"))) {
      
      String col = sortFields.substring(0, sortFields.length()-1);
      if (converter.meterCols.contains(col)) {
        sortFields = contractSortField+"_"+sortFields;
      } else {
        sortFields = sortFields+"_"+contractSortField;
      }
	*/
	
	
	
	
	
}
