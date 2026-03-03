package ru.tet.demos.libs;

import java.io.StringWriter;
import java.util.Stack;
import java.util.stream.Collectors;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonToken;

//StreamingAPI (aka "Incremental parsing/generation") 
public class StreamingAPIDemo1 {

	public static String generateJson2() throws Exception {

		JsonFactory f = new JsonFactory();

		StringWriter sw = new StringWriter();
		JsonGenerator g = f.createGenerator(sw);

		g.writeStartObject();

		g.writeStringField("name", "Tom");
		g.writeNumberField("age", 25);

		g.writeNullField("position");

		g.writeBooleanField("verified", true);

		//массив
		g.writeFieldName("address");
		g.writeStartArray();
		g.writeString("Poland");
		g.writeString("5th avenue");
		g.writeEndArray();

		//вложенный объект 
		g.writeObjectFieldStart("otherName");
		g.writeStringField("first", "Joe");
		g.writeStringField("last", "Sixpack");
		g.writeEndObject();

		g.writeEndObject();

		g.close();

		return sw.toString();
	}

	/**
	 * Рассмотрим все токены 
	 */
	public static void parseJson1(String json) throws Exception {

		JsonFactory f = new JsonFactory();
		JsonParser jp = f.createParser(json);

		while (true) {
			JsonToken token = jp.nextToken();
			if (token == null) {
				break;
			}

			String text = jp.getText();

			if (token == JsonToken.FIELD_NAME) {
				System.out.format("%s : %s%n", token.toString(), text);

			} else if (token.isStructStart() || token.isStructEnd()) {
				System.out.format("%s : %s%n", token.toString(), text);
			} else {
				String fieldname = jp.getCurrentName();

				//		  System.out.format("getCurrentName(): %s, text: %s", fieldname,text);
				System.out.format("%s : %s (%s)%n", token.toString(), text, fieldname);
			}

		}

		jp.close();

	}

	/**
	 * выводит значения всех полей объекта 
	 */
	public static void parseJson2(String json) throws Exception {

		JsonFactory f = new JsonFactory();
		JsonParser jp = f.createParser(json);

		Stack<String> path = new Stack<>();

		while (true) {
			JsonToken token = jp.nextToken();
			if (token == null) {
				break;
			}

			String text = jp.getText();
			//имя текущего поля
			String fieldname = jp.getCurrentName();
			if (fieldname == null) {
				fieldname = "_";
			}

			
			if (token.isStructStart()) {								//начало объекта или массива
				path.push(fieldname);
			} else if (token.isStructEnd()) {						//конец объекта или массива
				path.pop();
			} else if (token == JsonToken.FIELD_NAME) {	//имя поля
			} else {		//значение
				
				String pathString = path.stream().collect(Collectors.joining("."))+"."+fieldname;
				System.out.format("%s : %s%n", pathString, text);
			}

		}

		jp.close();

	}

	public static void main(String[] args) throws Exception {
		String json = generateJson2();
		System.out.println(json);

		//		parseJson1(json);
		parseJson2(json);

		//		User user = parseUserJson(json);
		//		System.out.println(user);

	}

}
