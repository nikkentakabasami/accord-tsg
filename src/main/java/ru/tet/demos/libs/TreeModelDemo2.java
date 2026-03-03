package ru.tet.demos.libs;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import ru.tet.demos.beans.User;

public class TreeModelDemo2 {

	//создание нового узла
	public static void createNode1() throws Exception {

		ObjectMapper mapper = new ObjectMapper();
		JsonNode node1 = mapper.createObjectNode();

		ObjectNode addedNode = ((ObjectNode) node1).putObject("address");
		addedNode
				.put("city", "Seattle")
				.put("state", "Washington")
				.put("country", "United States");

		String s = mapper.writeValueAsString(node1);
		System.out.println(s);
	}

	//считывание узла из json
	public static void createNode2() throws Exception {

		String userJson = StreamingAPIDemo2.generateUserJson();

		ObjectMapper m = new ObjectMapper();

		JsonNode rootNode = m.readTree(userJson);
		JsonNode nameNode = rootNode.path("name");

		int age = rootNode.path("age").intValue();

		String last = nameNode.path("last").textValue();
		String first = nameNode.path("first").textValue();

		System.out.println(age + "," + first + "," + last);

		//редактирование
		((ObjectNode) nameNode).put("last", "Jsoner");

		String s = m.writeValueAsString(rootNode);
		System.out.println(s);

	}

	//считывание узла из объекта
	public static void createNode3() throws Exception {

		ObjectMapper mapper = new ObjectMapper();

		User user = User.createTestBean();
		JsonNode node2 = mapper.valueToTree(user);
		//		JsonNode node3 = mapper.convertValue(user, JsonNode.class);

		JsonNode nameNode = node2.path("name");
		int age = node2.path("age").intValue();

		String last = nameNode.path("last").textValue();
		String first = nameNode.path("first").textValue();

		System.out.println(age + "," + first + "," + last);

		//удаление
		((ObjectNode) node2).remove("verified");

		String s = mapper.writeValueAsString(node2);
		System.out.println(s);

	}

	public static void createTreeDemo() throws Exception {

	}

	public static void main(String[] args) throws Exception {

		createNode1();
		//		createNode2();
		//		createNode3();

		/*
		
		User user = User.createTestBean();
		ObjectMapper mapper = new ObjectMapper();
		JsonNode node = mapper.valueToTree(user);
		
		iterateNode(node);
		*/

	}

}
