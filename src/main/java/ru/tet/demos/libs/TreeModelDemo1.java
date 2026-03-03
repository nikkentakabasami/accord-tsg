package ru.tet.demos.libs;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map.Entry;
import java.util.stream.Collectors;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import ru.tet.demos.beans.User;

public class TreeModelDemo1 {

	public static void baseDemo() throws Exception {

		ObjectMapper mapper = new ObjectMapper();

		//создание пустого узла
		//		JsonNode node1 = mapper.createObjectNode();

		//парсинг json
		//		JsonNode node1 = m.readTree(userJson);

		//создание на основе бина
		User user = User.createTestBean();
		JsonNode node1 = mapper.valueToTree(user);

		//получение значений
		int age = node1.path("age").intValue();

		JsonNode nameNode = node1.path("name");
		String last = nameNode.path("last").textValue();
		String first = nameNode.path("first").textValue();

		System.out.println(age + "," + first + "," + last);

		//редактирование
		ObjectNode addedNode = ((ObjectNode) node1).putObject("address");
		addedNode
				.put("city", "Seattle")
				.put("state", "Washington")
				.put("country", "United States");

		//удаление поля
		((ObjectNode) node1).remove("verified");

		//итерация
		iterateNode(node1);

		//преобразование в json
		String s = mapper.writeValueAsString(node1);
		System.out.println(s);

	}


	public static void iterateNode(JsonNode node) throws Exception {

		Iterator<Entry<String, JsonNode>> fields = node.fields();
		while (fields.hasNext()) {
			Entry<String, JsonNode> jsonField = fields.next();

			String fieldName = jsonField.getKey();
			JsonNode valueNode = jsonField.getValue();

			String value = null;
			if (valueNode.isValueNode()) {
				value = valueNode.asText();
			} else if (valueNode.isArray()) {

				List<String> values = new ArrayList<>();
				for (JsonNode item : valueNode) {
					values.add(item.asText());
				}
				value = values.stream().collect(Collectors.joining(","));

			} else if (valueNode.isObject()) {
				System.out.println("----------" + fieldName + "----------");
				iterateNode(valueNode);
				System.out.println("----------");
				continue;
			}

			System.out.format("%s: %s%n", fieldName, value);
		}

	}	

	public static void main(String[] args) throws Exception {
		
		baseDemo();		
		

	}

}
