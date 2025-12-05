package ru.tet.tsg.misc;

import java.lang.reflect.Field;

import org.apache.commons.lang3.StringUtils;

import lombok.Data;
import ru.tet.tsg.util.SUSearchFilter;

@Data
public class TSGTaskFilter extends SUSearchFilter {

	String id;
	String section;

	String title;
	String duration;
	String percentComplete;
	String start;
	String finish;
	String effortDriven;
	String odd;

	public boolean isEmpty() {

		try {

			Field[] fields = this.getClass().getDeclaredFields();
			for (int i = 0; i < fields.length; i++) {
				Field field = fields[i];
				String v = (String)field.get(this);
				if (!StringUtils.isBlank(v)) {
					return false;
				}
				
			}
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}

	}


}
