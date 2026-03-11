package ru.tet.demos.libs;

import java.util.Map;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import ru.tet.demos.aux.JSTreeDataSamples;
import ru.tet.demos.beans.JSTreeNode;

//тестируем преобразование в json JSTreeNode
public class DataBindingDemo1 {

	public static String test1() throws Exception {
		JSTreeNode tree1 = JSTreeDataSamples.getInstance().getTree1().getChild(1);
		ObjectMapper mapper = new ObjectMapper();
		String treeJson = mapper.writeValueAsString(tree1);
		System.out.println(treeJson);
		return treeJson;
	}
	
	public static void test2(String treeJson) throws Exception {
		ObjectMapper mapper = new ObjectMapper();
		JSTreeNode tree = mapper.readValue(treeJson, JSTreeNode.class);
		System.out.println(tree.toString());
	}

	public static void test3(String treeJson) throws Exception {
		ObjectMapper mapper = new ObjectMapper();
		
		//Данные можно распарсить в виде мапа
	  Map<String,Object> map = mapper.readValue(treeJson, Map.class);
	  map.forEach((key, val)->{
	  	System.out.format("key=%s, val=%s%n", key, val);
	  });

 
	  
	  
	  

	}
	

  	
	
	public static void main(String[] args) throws Exception {
		String treeJson = test1();
//		test2(treeJson);
		test3(treeJson);
		
		
		
		
		
	}
	
	
	
}
