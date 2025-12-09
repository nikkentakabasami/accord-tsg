package ru.tet.tsg.util;

import java.util.Arrays;

public enum FilterTokens {

	greaterEqual(">=") {
		@Override
		public Boolean match(int val, int filterVal) {
			return val >= filterVal;
		}
	},
	lessEqual("<=") {
		@Override
		public Boolean match(int val, int filterVal) {
			return val <= filterVal;
		}

	},
	greater(">") {
		
		
		@Override
		public Boolean match(int val, int filterVal) {
			return val > filterVal;
		}
	},
	less("<") {
		@Override
		public Boolean match(int val, int filterVal) {
			return val < filterVal;
		}
	},
	diapazon(":") {

		@Override
		public Boolean match(int val, String filterVal) {
			int ind = filterVal.indexOf(token);
			if (ind<=0) {
				return null;
			}
			
			int fvi1 = Integer.parseInt(filterVal.substring(0, ind));
			int fvi2 = Integer.parseInt(filterVal.substring(ind+1));

			return val>=fvi1 && val<=fvi2;
		}
		
	},
	multi(",") {

		@Override
		public Boolean match(int val, String filterVal) {
			int ind = filterVal.indexOf(token);
			if (ind<=0) {
				return null;
			}
			
			String[] filterVals = filterVal.split(",");
			return Arrays.stream(filterVals).map(String::trim).filter(cv->cv.length()>0).map(cv->Integer.parseInt(cv)).anyMatch(cv->cv.intValue()==val);
		}
		
	};

	
	
	String token;

	private FilterTokens(String token) {
		this.token = token;
	}

	/**
	 * Возвращает null если выражение filterVal неприменимо к этому токену.
	 * Иначе возвращает результат соответствия.
	 */
	public Boolean match(int val, String filterVal) {
		if (this==diapazon) {
			
			int ind = filterVal.indexOf(token);
			if (ind<=0) {
				return null;
			}
			
			int fvi1 = Integer.parseInt(filterVal.substring(0, ind));
			int fvi2 = Integer.parseInt(filterVal.substring(ind+1));

			return val>=fvi1 && val<=fvi2;
		}
		
		
		if (!filterVal.startsWith(token)) {
			return null;
		}

		String s = filterVal.substring(token.length());
		try {
			int fvi = Integer.parseInt(s);
			return match(val, fvi);
		} catch (Exception e) {
			return false;
		}

	}

	protected Boolean match(int val, int filterVal) {
		return false;
	};

	public String getToken() {
		return token;
	}

}