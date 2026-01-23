

import { TsgDataSource1 } from './tsgDataSource1.js'
import { tsgUtils, TetSlickGrid, accordUtils, DateRangeModule, NumberRangeModule } from '../tet.slick.grid-bundle.js';

import {MultiselectModule} from '../mtp/tet.slick.grid.multiselect.js';

let myGrid;
let dataSource;

var columns = [

	{
	id: "id",
	name: "id",
	width: 150,
	filterData: [5,6,8]
	},
  tsgUtils.mkColDesc("title", "Заголовок", 150),
  {
	id: "customer",
	valueField: "customer.id",
	captionField: "customer.name",
	name: "Заказчик",
	width: 150,
  }, {
	id: "section",
	captionField: "section.name",
	valueField: "section.id",
	sortField: "section.id",
	matchType: tsgUtils.matchTypes.NUMBER,
	name: "Раздел",
	width: 150
  }, {
	id: "durationInt",
	captionField: "duration",
	sortField: "durationInt",
	name: "Длительность",
	width: 150
	},
	tsgUtils.mkColDesc("percentComplete", "% Завершения", 150),
	{
	id: "start",
	captionField: "startStr",
	valueField: "startStr",
	sortField: "start",
	name: "Начало",
	width: 150
	}, {
	id: "finish",
	captionField: "finishStr",
	valueField: "finishStr",
	sortField: "finish",
	name: "Окончание",
	width: 150
	}, {
	id: "fruit",
	name: "Фрукт",
	width: 150,
	captionField: "fruit.name",
	valueField: "fruit.name",
	}, {
	id: "effortDriven",
	name: "Выполнено",
	width: 150,
	filterInput: accordUtils.generateBooleanSelect,
	formatter: tsgUtils.checkmarkFormatter,
  },

];








let options = {

  //метод myGrid.init() теперь нужно вызывать явно
  explicitInitialization: true,

  //Добавит заголовок таблицы
  showTitleHeader: true,

  //Добавит элеметы фильтрации в заголовочную строку.
  enableHeaderRowFilters: true,

  //Возможность выбора нескольких строк
  multiRowSelectionModel: true,

  //Добавляет диалог, позволяющий изменять порядок и видимость столбцов.
  withColumnDialog: true,
  //Добавляет контекстные меню для показа в сетке таблицы и на фильтрах.
  withGridMenu: true,

  //Своя высота строки
  rowHeight: 30



};

$(function() {

  dataSource = new TsgDataSource1(100);
  window.dataSource = dataSource;

  myGrid = new TetSlickGrid("#myGrid", dataSource.rows, columns, options);

  
  
  let customerColumn = myGrid.model.columnsById["customer"];
  customerColumn.filterData = dataSource.customers;
  
  
  //задание данных массивом значений
  let fruitColumn = myGrid.model.columnsById["fruit"];
  fruitColumn.filterData = dataSource.fruitsList;
  fruitColumn.filterClass = tsgUtils.filterClasses.SelectFilter;
  
/*
  //Инициализирует мультиселекты в полях фильтрации.
  //Для использования требуется подключить библиотеки bootstrap 3 и bootstrap-multiselect
  //селекты должны иметь атрибут multiple!
  //Например:
  //<select id="section" name="section" multiple="multiple"></select>
  let mm = new MultiselectModule(myGrid);


  //Инициализирует поля фильтрации для ввода даты.
  //На них должен быть назначен класс .date-input.
  let dm = new DateRangeModule(myGrid);


  //Дополнительный модуль.
  //Инициализирует поля фильтрации для ввода чисел.
  //На них должен быть назначен класс .number-input.
  let nm = new NumberRangeModule(myGrid);
*/



  myGrid.init();

  myGrid.view.titleHeader.setTitle('Тестовая таблица')

})

