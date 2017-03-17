package com.mbusiness.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class CheckPhoneno {

	private boolean result = false;
	
	public boolean check(String phoneno){
		String regExp = "^[1]([3][0-9]{1}|[5][0-9]{1}|[8][0-9]{1}|[7][0-9]{1})[0-9]{8}$"; 
		Pattern p = Pattern.compile(regExp);  
		Matcher m = p.matcher(phoneno);  
		result = m.matches();
		return result;
	}
}
