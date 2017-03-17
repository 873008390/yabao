package com.mbusiness.util;

import java.util.List;

import org.hibernate.Session;

public class Initpermission {

	private int result = 1;
	public int init(Session session, String account){
		int userid = 0;
		int type = 0;
		List<Object[]> o = session.createSQLQuery("select id,type from user where status=1 and account='"+ account +"'").list();
		if(o.isEmpty()){
			result = 0;
		}else{
			userid = Integer.parseInt(o.get(0)[0].toString());
			type = Integer.parseInt(o.get(0)[1].toString());
			if(type == 0){
				List<Object> o1 = session.createSQLQuery("select shortname from catalog where status=1 and type=1").list();
				
			}else if(type == 1){
				List<Object> o1 = session.createSQLQuery("select shortname from catalog where status=1 and type=2").list();
				
			}else if(type == 2){
				
			}else if(type == 3){
				
			}else if(type == 4){
				
			}else if(type == 5){
				
			}
		}
		return result;
	}
}
