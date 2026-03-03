

let $jstree1;
let $jstree2;

let currentTree

let jsonTreeData1 = [
  'Simple root node',
  {
    'id': 'node_2',
    'text': 'Root node with options',
    'state': { 'opened': true, 'selected': true },
    'children': [
			{ 'text': 'Child 1', 'id': 'node_3',}, 
			'Child 2'
		]
  }
]

let jsonTreeData2 = [
       { "id" : "ajson1", "parent" : "#", "text" : "Simple root node" },
       { "id" : "ajson2", "parent" : "#", "text" : "Root node 2" },
       { "id" : "ajson3", "parent" : "ajson2", "text" : "Child 1" },
       { "id" : "ajson4", "parent" : "ajson2", "text" : "Child 2" },
];





let selectorsData1 = {


	init1(){
	
		//задание всех данных целиком через json
		$jstree1.jstree({
		  'core': {
		    'data': jsonTreeData1
		  }
		});
		
		le2("jsonTreeData1");
	},

	init2(){
		
		//задание всех данных целиком через json
		//альтернативный json формат
		$jstree1.jstree({
		  'core': {
		    'data': jsonTreeData2
		  }
		});
		le2("jsonTreeData2");
	},


	init3(){
	
		//данные для дерева будут передаваться через ajax в json-формате
		//JSTreeServlet
		$jstree1.jstree({
		  'core': {
				'data' : {
				  'url' : '../../jsTree/getNode2',
				  'data' : function (node) {
				    return { 'id' : node.id };
				  }
				}
		  }
		});
		
		la2("../../jsTree/getNode2?id=tn1","пример ссылки для получения данных");
		
	},
	

	init4(){
		
		//данные для дерева будут передаваться через ajax в html-формате
		//jstreeDemo1Nodes.jsp
		
		$jstree1.jstree({
		  'core': {
				'data' : {
				  'url' : '../demos_jsp/jstreeDemo1Nodes.jsp',
				  'data' : function (node) {
				    return { 'id' : node.id };
				  }
				}
		  }
		});	
		la2("../../demos/demos_jsp/jstreeDemo1Nodes.jsp?id=tn1","пример ссылки для получения данных через jstreeDemo1Nodes.jsp");
		
		
	},
	init5(){
		
		//checkbox plugin
		
		$jstree1.jstree({
			"checkbox" : {
			  "keep_selected_style" : false
			},
			"plugins" : [ "checkbox" ],
		  'core': {
				'data' : {
					'url' : '../../jsTree/getNode2',
				  'data' : function (node) {
				    return { 'id' : node.id };
				  }
				}
		  }
		});	
	}

};
	
function destroyTree1(){
	let tree = $jstree1.jstree(true);
	
	if (tree){
		tree.destroy();		
	}
	
}


$(() => {

	//смена общего стиля
	//	$.jstree.defaults.core.themes.variant = "large";	
	
	$jstree1 = $('#jstree1');
	$jstree2 = $('#jstree2');
	
	
	initDemoCodeSelect("#selectors1", selectorsData1);
	
	beforeExecDemoFunc = ()=>{
		destroyTree1();
		clearLog();
	};
	
	afterExecDemoFunc	= ()=>{
		currentTree = $jstree1.jstree(true);
		
		$jstree1.on("changed.jstree", function(e, data) {
		  log2(data.selected);
		});
	};
	
	
/*	
	$("#selectors1").change(()=>{
		destroyTree1();
		clearLog();
		
		let val = $sel1.val();
		
		if (val==1){
			init1();
		} else if (val==2){
			init2();
		} else if (val==3){
			init3();
		} else if (val==4){
			init4();
		}	else if (val==5){
		  init5();
		}
		
		currentTree = $jstree1.jstree(true);
		
		$jstree1.on("changed.jstree", function(e, data) {
//		  clearLog();
		  log(data.selected);
		});
		
		
	});
	
	//show ajax by default
	$("#selectors1").val("3").trigger("change");
	*/
	
	//дерево, у которого все узлы заданы изначально в html
	$jstree2.jstree();

	
	//выбор узла
  $('#btn1').click(()=>{
		
		$jstree1.jstree(true).select_node('tn3');
		//или можно выбрать так:
//		$jstree4.jstree('select_node', 'tn3');
  });
	
	
	//Открытие узла
	$('#btn2').click(()=>{
		
		currentTree.open_node('tn1', ()=>{
			currentTree.open_node('tn2');
			log("opened");
		});
		
	});	

	$('#btn3').click(()=>{
		
		$jstree1.jstree(true).show_all();
		
	});	

	
	$('#btn4').click(()=>{
		
		
		
		let selectedIds = currentTree.get_selected();
		if (selectedIds.length==0){
			return;
		}
		
		let parentId = selectedIds[0];
		
		$.post({
			url : '../../jsTree/addNode1',
			data: { 'parentId': parentId },
		  success: function(data, status, request){
				currentTree.refresh_node(parentId);
				currentTree.open_node(parentId);
		  },
		});		

	});

});
