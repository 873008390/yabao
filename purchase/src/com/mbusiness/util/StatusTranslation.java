package com.mbusiness.util;

import java.util.List;

import org.hibernate.Session;

public class StatusTranslation {

	public int trans(String input, Session session){
		int result = -1;
		List<Object> o = session.createSQLQuery("select value from keyvalue where status=1 and type=1 and keyname='"+ input +"'").list();
		if(!o.isEmpty()){
			result = Integer.parseInt(o.get(0).toString());
		}
		return result;
	}
	
	public String getKeyname(int value, Session session){
		String result = "";
		List<Object> o = session.createSQLQuery("select keyname from keyvalue where status=1 and type=1 and value="+ value).list();
		if(!o.isEmpty()){
			result = o.get(0).toString();
		}
		return result;
	}
}
