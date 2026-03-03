package ru.tet.demos.libs;

import java.io.StringWriter;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonToken;

import ru.tet.demos.beans.User;
import ru.tet.demos.beans.User.Gender;
import ru.tet.demos.beans.User.Name;

//StreamingAPI (aka "Incremental parsing/generation") 
public class StreamingAPIDemo2 {

	public static String generateUserJson() throws Exception {

		JsonFactory f = new JsonFactory();

		StringWriter sw = new StringWriter();
		JsonGenerator g = f.createGenerator(sw);

		g.writeStartObject();

		g.writeObjectFieldStart("name");
		g.writeStringField("first", "Joe");
		g.writeStringField("last", "Sixpack");
		g.writeEndObject();

		g.writeStringField("gender", Gender.MALE.toString());

		g.writeNullField("position");
		g.writeNumberField("age", 33);
		g.writeBooleanField("verified", true);

		g.writeEndObject();
		g.close();

		return sw.toString();
	}
	


	public static User parseUserJson(String json) throws Exception {

		JsonFactory f = new JsonFactory();
		JsonParser jp = f.createParser(json);

		User user = new User();
		jp.nextToken(); // will return JsonToken.START_OBJECT

		while (jp.nextToken() != JsonToken.END_OBJECT) {
			String fieldname = jp.getCurrentName();
			jp.nextToken(); // move to value, or START_OBJECT/START_ARRAY

			if ("name".equals(fieldname)) {
				Name name = new Name();
				while (jp.nextToken() != JsonToken.END_OBJECT) {
					String namefield = jp.getCurrentName();
					jp.nextToken(); // move to value
					if ("first".equals(namefield)) {
						name.setFirst(jp.getText());
					} else if ("last".equals(namefield)) {
						name.setLast(jp.getText());
					} else {
						throw new IllegalStateException("Unrecognized field '" + fieldname + "'!");
					}
				}
				user.setName(name);
			} else if ("age".equals(fieldname)) {
				user.setAge(jp.getIntValue());

			} else if ("gender".equals(fieldname)) {
				user.setGender(User.Gender.valueOf(jp.getText()));
			} else if ("verified".equals(fieldname)) {
				user.setVerified(jp.getCurrentToken() == JsonToken.VALUE_TRUE);
			} else if ("userImage".equals(fieldname)) {
				user.setUserImage(jp.getBinaryValue());
			} else {
				System.out.println("Unrecognized field '" + fieldname + "'!");
				//		    throw new IllegalStateException("Unrecognized field '"+fieldname+"'!");
			}
		}
		jp.close();

		return user;

	}

	public static void main(String[] args) throws Exception {
		String json = generateUserJson();
		System.out.println(json);

		User user = parseUserJson(json);
		System.out.println(user);

	}

}
