package ru.tet.demos.beans;

import lombok.Data;

@Data
public class User {

	public enum Gender {
		MALE, FEMALE
	};

	@Data
	public static class Name {
		String first, last;

	}

	public static User createTestBean() {
		User u = new User();
		u.gender = Gender.FEMALE;
		u.age = 23;
		u.name = new Name();
		u.name.first = "bob";
		u.name.last = "show";
		u.keys = new Integer[] {123,528, 951};
		return u;
	}
	
	
	Gender gender;
	int age;

	Name name;
	boolean verified;
	byte[] userImage;
	
	Integer[] keys;
	

}
