
import {AbstractModule} from '../tet.slick.grid.misc.js';
import {tsgUtils} from '../tet.slick.grid.utils.js';


/**
 * Инициализирует поля фильтрации для ввода чисел.
 * На них должен быть назначен класс .number-input.
 *  
 * Для использования требуется подключить библиотеки moment.js и daterangepicker.js
 * 
 */
export class NumberRangeModule  extends AbstractModule {

	constructor(grid){
		super(grid);
		

		
		
		loadNumberFilterDialog();
		
		this.grid.addEventListener(tsgUtils.tableEvents.beforeInitFilter, e => {
			
			let $filter = e.detail.$afe;
			
			//прикручиваем к инпутам с датой диалог для выбора даты
			if (!$filter.is('input.number-input')){
				return;
			}
			
			initNumberFilter($filter, val => {
				this.grid.filtersModel.applyMainFilter();
			});
		
		});
	}
	
	init(){
		super.init();
	}
	
}




export function initNumberFilter($filter, setValueCallback){
	
	let $calIcon = $('<span class="input-group-addon glyphicon glyphicon-signal" style="color: #31708f;top:0px;"></span>');
	$calIcon.click(e => {
		$filter.trigger( "dblclick" );
	});
    $filter.wrap( '<div class="input-group"></div>' ).before($calIcon)
	
	$filter.dblclick(e => {

		showNumberFilterDialog((val) => {
			$filter.val(val);
			if (setValueCallback){
				setValueCallback(val);
			}
		});
	});	
	
}

export function loadNumberFilterDialog() {

	$numberFilterDialog = tsgUtils.loadFragment("selectNumberFilterDialog.html");

//	$numberFilterDialog = $("#numberFilterDialog");
//	$numberFilterDialog.remove().appendTo("body");

	$numberFilterDialog.find('input[name="numberFilterType"]').change(function() {

		currentNumberFilterType = $numberFilterDialog.find('input[name="numberFilterType"]:checked').val();

		$numberFilterDialog.find("#divNumber2").addClass('div-hidden');

		if (currentNumberFilterType == "4") {
			$numberFilterDialog.find("#divNumber2").removeClass('div-hidden');
		}

		//    alert(val);
	});


	$numberFilterDialog.find("#clearNumberButton").click(function() {

		$numberFilterDialog.modal("hide");
		currentNumberFilterCallback("");

	});


	$("#selectNumberButton").click(function() {

		var v1 = $("#filterNumber1").val();
		var v2 = $("#filterNumber2").val();



		if (currentNumberFilterType == "1") {
			currentNumberFilterResult = v1;
		} else if (currentNumberFilterType == "2") {
			currentNumberFilterResult = ">" + v1;
		} else if (currentNumberFilterType == "3") {
			currentNumberFilterResult = "<" + v1;
		} else if (currentNumberFilterType == "4") {
			currentNumberFilterResult = v1 + ":" + v2;
		}

		currentNumberFilterResult = currentNumberFilterResult.trim();

		if (!currentNumberFilterResult) {
			this.grid.alert('Выберите значение!');
			return;
		}

		$numberFilterDialog.modal("hide");

		currentNumberFilterCallback(currentNumberFilterResult);

	});


}


let $numberFilterDialog; 

let currentNumberFilterType = "1";
let currentNumberFilterResult;

let currentNumberFilterCallback;

function showNumberFilterDialog(callback){
  currentNumberFilterCallback = callback;
  $numberFilterDialog.modal();
  
}


