
import {AbstractModule,getTetSlickRelativePath,loadFragment} from '../tet.slick.grid.misc.js';
import {tableEvents} from '../tet.slick.grid.events.js';


/**
 * Инициализирует поля фильтрации для ввода даты.
 * На них должен быть назначен класс .date-input.
 *  
 * Для использования требуется подключить библиотеки moment.min.js и daterangepicker.js
 * 
 */
export class NumberRangeModule  extends AbstractModule {

	constructor(grid){
		super(grid);
		

		
		
		loadNumberFilterDialog();
		
		this.grid.addEventListener(tableEvents.beforeInitFilter, e => {
			
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


export function loadNumberFilterDialog(){
	loadFragment("selectNumberFilterDialog.html", () => {
		initNumberFilterDialog();
	});
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



function initNumberFilterDialog(){

  $numberFilterDialog = $("#numberFilterDialog");
  
  $numberFilterDialog.remove().appendTo("body");
  
  $('input[name="numberFilterType"]').change(function () {
    
    currentNumberFilterType = $('input[name="numberFilterType"]:checked').val();
    
    $("#divNumber2").addClass('div-hidden');
    
    if (currentNumberFilterType=="4"){
      $("#divNumber2").removeClass('div-hidden');
    }
    
//    alert(val);
  });  
  
  
  $("#clearNumberButton").click(function(){
    
    $numberFilterDialog.modal("hide");
    currentNumberFilterCallback("");    
    
  });
  
  
  $("#selectNumberButton").click(function(){
    
    var v1 = $("#filterNumber1").val();
    var v2 = $("#filterNumber2").val();
    
    
    
    if (currentNumberFilterType=="1"){
      currentNumberFilterResult = v1;
    } else if (currentNumberFilterType=="2"){
      currentNumberFilterResult = ">"+v1;
    } else if (currentNumberFilterType=="3"){
      currentNumberFilterResult = "<"+v1;
    } else if (currentNumberFilterType=="4"){
      currentNumberFilterResult = v1+":"+v2;
    }
    
    currentNumberFilterResult = currentNumberFilterResult.trim();
    
    if (!currentNumberFilterResult){
      bootbox.alert('Выберите значение!');
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


