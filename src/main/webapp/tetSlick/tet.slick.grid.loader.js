
import { tableEvents } from './tet.slick.grid.events.js';
import {filterRows,sortRows} from './tet.slick.grid.misc.js';



/**
 * Загрузчик данных для таблицы.
 * Есть 2 реализации: 
 *   GetRequestPageDataLoader - загружает данные с сервера, используя опции pageUrl,updateFilterUrl,clearFilterUrl
 *   LocalDataLoader - использует данные, заданные при создании таблицы (data).
 *   Либо можно задать в таблицу свою реализацию, задав её в качестве параметра data.
 * 
 */
export class AbstractDataLoader {

	pageSize = 20;
	maxRows = 2000000;
	
	grid;

	//данные, которые прорисовываются в данный момент в таблице (могут быть локально отфильтрованны и отсортированы)
	//data.length == totalRowsCount
	data = [];

	//Общее число строк. 
	//Если null - значит данные пока не были подгружены и оно неизвестно.
	//Иначе - равно data.length
	totalRowsCount = null;


	init(){
		
	}

	//на вход подаётся диапазон записей, которые должны быть загружены на клиент.
	//функция находит записи этого диапазона, которые ещё не были загружены,
	//после чего вычисляет и возвращает параметры страницы, которую нужно подгрузить с сервера.
	//Если все эти записи уже загружены - возвращает null
	_calcRequestParams(start,end){

		//вычисляем - какой диапазон страниц нужно загрузить
		let fromPage = Math.floor(start/this.pageSize);	
		let toPage = Math.floor(end/this.pageSize);	
			
	    while (this.data[fromPage * this.pageSize] !== undefined && fromPage < toPage){
	      fromPage++;
		}
		
	    while (this.data[toPage * this.pageSize] !== undefined && fromPage < toPage){
	      toPage--;
		}

		//все нужные данные уже загружены
	    if (fromPage == toPage && this.data[fromPage * this.pageSize] !== undefined){
			return null;
		}

		
		let startRow = fromPage*this.pageSize;
		let loadPageSize = (toPage-fromPage+1)*this.pageSize;

		return {
			startRow: startRow,
			loadPageSize: loadPageSize,
			fromPage: fromPage,
			toPage: toPage			
		};	
		
	}

	clearData(){
		this.data = [];
		this.totalRowsCount = null;
	}


	/**
	 * Если не загружены строки start..end - загрузит из с сервера, запишет в data  и вызовет ensureDataCallback
	 */
	ensureData(start,end, ensureDataCallback){
		ensureDataCallback(null);
	}

	//очистит текущий фильтр и условия сортировки, вызовет callback
	//Не обновляет данные!
	clearFilters(callback) {
		callback(null);
	}	

	//задаст текущий фильтр и условия сортировки, вызовет callback
	//Не обновляет данные!
	updateFilter(callback){
		callback(null);
	}

	
	//Прописывает в строках вспомогательное поле index
	_writeRowIndex(){
		for(let i=0; i<this.data.length; i++){
			let row = this.data[i];
			if (row){
				row.index = i;
			}
		}
	}

	
}




/**
 * Модуль для постраничной загрузки данных с сервера.
 * Использует опции pageUrl,updateFilterUrl,clearFilterUrl
 * 
 * 
 */
export class GetRequestPageDataLoader extends AbstractDataLoader {
	
	//Очередь запросов на получение данных с сервера
	ensureQueue = [];
	
	//Текущий запрос на получение данных с сервера (ожидается ответ)
	currentEnsureRequest;

	//возвращает url для получения заданной страницы с сервера
	makeUrl(requestParams){
		
		let pageUrl = this.grid.model.options.pageUrl;
		
		if (pageUrl==null){
			throw new Error('Не задана опция pageUrl!');
		}
		
		let result = pageUrl + requestParams.startRow + "/" + requestParams.loadPageSize;
		return result;
	}

	ensureData(start,end, ensureDataCallback){
		
		this.ensureQueue.push({
			start: start,
			end: end,
			ensureDataCallback: ensureDataCallback,
			ajaxRequest: null,
			handled: false
		});
		
		this.handleNextQueueItem();
	}

	//инициирует обработку следующего запроса на получение данных из очереди ensureQueue
	handleNextQueueItem(){
		
		//если текущий запрос ещё не обработан - выходим
		if (this.currentEnsureRequest && !this.currentEnsureRequest.handled){
			return;
		}
		
		//убираем из очереди уже обработанны запросы
		this.ensureQueue = this.ensureQueue.filter(item =>{
			return !item.handled;
		});
		
		//если очередь не пустая - запускаем обработку первого запроса из очереди
		if (this.ensureQueue.length>0){
			this.handleEnsureRequest(this.ensureQueue[0]);
		}
		
	}

	//запускает загрузку данных с сервера в соответствии с заданным запросом
	handleEnsureRequest(ensureRequest){
		
		this.currentEnsureRequest = ensureRequest;
		
		//получаем страницу, которую нужно загрузить
		let requestParams = this._calcRequestParams(ensureRequest.start,ensureRequest.end);
		
		//если данные уже загружены
		if (requestParams==null){
			ensureRequest.handled = true;
			ensureRequest.ensureDataCallback(null);
			this.handleNextQueueItem();
			return;
		}
	
		//запускаем событие beforeDataLoad
		this.grid.dispatch(tableEvents.beforeDataLoad);
		
		showWaitPanel("Загрузка");
		console.log("loading rows: " + ensureRequest.start + " to " + ensureRequest.end);

		//загружаем данные с сервера		
		ensureRequest.ajaxRequest = $.ajax({
			url : this.makeUrl(requestParams),
			success : responsePage => {
				
				hideWaitPanel();
				
				if (!responsePage){
					alert("Текущая сессия завершилась - обновите страницу!");
					return;
				}
				
				console.log("loaded pages " + requestParams.fromPage + " to " + requestParams.toPage);
				
				this.totalRowsCount = responsePage.totalRowsCount;
			    this.data.length = Math.min(parseInt(responsePage.totalRowsCount), this.maxRows); 
			    
		
				for (let i = 0; i < responsePage.rows.length; i++) {
					let row = responsePage.rows[i];
					row.index = responsePage.startRow + i;
					this.data[row.index] = row;
				}
				
		//		_writeRowIndex();
				
				//запускаем событие afterDataLoad
				this.grid.dispatch(tableEvents.afterDataLoad, responsePage);
				
				ensureRequest.ensureDataCallback(responsePage);
				
				ensureRequest.handled = true;
				this.handleNextQueueItem();
			},
			error : (jqXHR, textStatus, errorThrown) => {
				hideWaitPanel();
				if (errorThrown!="abort"){
					console.log("error loading pages " + requestParams.fromPage + " to " + requestParams.toPage+ " ; errorThrown: "+errorThrown);
				}
				ensureRequest.handled = true;
				this.handleNextQueueItem();
				
			}

		});
		
	}

	
	clearFilters(callback) {
		if (!this.grid.filtersModel){
			return;
		}
		
		let clearFilterUrl = this.grid.model.options.clearFilterUrl;
		$.get(clearFilterUrl,callback)
		.fail(function(jqXHR, textStatus, errorThrown) {
			bootbox.alert("Ошибка отправления запроса : " + textStatus);
		});
	}	


	updateFilter(callback){
		if (!this.grid.filtersModel){
			return;
		}
		
		let updateFilterUrl = this.grid.model.options.updateFilterUrl;
		
		if (this.grid.model.options.postFormDataAsJson){
			
			let formData = accordUtils.formToJSON(this.grid.filtersModel.$form);
			$.ajax({
			  url: updateFilterUrl,
			  type: 'POST',
			  data: JSON.stringify(formData),
			  contentType: 'application/json',
			  success: callback,
			  error : (jqXHR, textStatus, errorThrown) => {
				bootbox.alert("Ошибка отправления запроса : " + textStatus);
			  }
			});
						
		} else {
			let serializedForm = this.grid.filtersModel.$form.serialize();

			$.post(updateFilterUrl, serializedForm, callback).fail(function(jqXHR, textStatus, errorThrown) {
				bootbox.alert("Ошибка отправления запроса : " + textStatus);
			});
			
		}
		
		
		
		
//		type: 'POST',
//		  data: JSON.stringify(formData),
//		  contentType: 'application/json',		
		
		
	}

	
	
	
}


/**
 * Загрузчик, содержащий локальные данные.
 * Подгружает данные из заданного массива строк.
 * Выполняет простую локальную фильтрацию и сортировку.
 * 
 */
export class LocalDataLoader extends AbstractDataLoader {
	
	//Исходные заданные данные (без фильтрации и сортировки)
	//Если используется dataLoader, то всегда sourceData===data
	sourceData;


	constructor(sourceData){
		super();
		this.sourceData = sourceData;
	}


	ensureData(start,end, ensureDataCallback){
		
		//Если данные пока не загружены - проводим фильтрацию и сортировку
		if (this.totalRowsCount==null){
			this.#recalcData();
//			this.updateFilter();
		}
		
		ensureDataCallback(null);
		
	}

	setSourceData(sourceData){
		this.sourceData = sourceData;
//		this._setData(this.sourceData.slice());
		this.#recalcData();
		
//		this.grid.dispatch(tableEvents.afterDataLoad, null);
	}


	//пересчитывает данные для показа (фильтруя и сортируя this.sourceData)
	#recalcData(){
	
		let data;
		
		if (this.grid.filtersModel){
			let filter = this.grid.filtersModel.makeFilterObject();
			data = filterRows(this.sourceData, filter);
		} else {
			data = this.sourceData.slice();
		}
		
		let sortColumns = this.grid.getSortColumns();
		sortRows(data, sortColumns);
		
//		let filter = this.grid.filtersModel.makeFilterObject();
//		let data = filterRows(this.sourceData, filter);
//		this._setData(data);

		this.data = data;
		this.totalRowsCount = data.length;
		this._writeRowIndex();
				
		this.grid.dispatch(tableEvents.afterDataLoad, null);
	}
	

}
