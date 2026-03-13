
//создание таблицы
function createTable(){

	columns = [
		{
			id: "title",
			name: "Заголовок",
			width: 150
		}, {
			id: "customer",
			valueField: "customer.id",
			name: "Заказчик",
			width: 150
		}, {
			id: "section",
			valueField: "section.name",
			name: "Раздел",
			width: 150
		}, {
			id: "duration",
			name: "Длительность",
			width: 150
		}, {
			id: "percentComplete",
			name: "% Завершения",
			width: 150
		}, {
			id: "startStr",
			valueField: "start",
			name: "Начало",
			width: 150
		}, {
			id: "finishStr",
			valueField: "finish",
			name: "Окончание",
			width: 150
		}, {
			id: "effortDriven",
			name: "Выполнено",
			width: 150
		}
	];

	options = {
		singleRowSelectionModel: true
	};	
	
	let ds = new TsgDataSource1(100);
	myGrid = new TetSlickGrid("#myGrid", ds.rows, columns, options);
	
}


bh1 = {
	
	basicFields: `
		//Основные поля и методы таблицы:
	
		//получение строк таблицы
		grid1.dataLoader.data[5];	~
	
		//текущая модель столбцов
		grid1.model.columns; ~
		
		//ширина первого столбца:
		grid1.model.columns[0].width; ~

		//поиск модели столбца по имени
		grid1.model.columnsById.section; ~		
				
		//текущая сортировка
		grid1.getSortColumns();
		
		
	`,
	
	hideColumn(){
		//скрыть столбец
		grid1.hideColumn("section");
	},
	resetColumns(){
		//сбросить все изменения столбцов
		grid1.model.resetColumns();
		grid1.reload();
		
	},
	test3(){
	},
	
}



$(document).ready(function() {
	
	
});


















