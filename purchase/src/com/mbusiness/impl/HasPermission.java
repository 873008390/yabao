package com.mbusiness.impl;

import org.hibernate.Query;
import org.hibernate.Session;

public class HasPermission {

	private int result;
	
	public int hasPermission(String username, String permission, String type, Session session){
		Query q = session.createSQLQuery("select * from users where status=1 and account='"+ username +"'");
		if(q.list().isEmpty()){
			result = 0;
		}else{
			Query query = session.createSQLQuery("select * from permission where status=1 and "+ type +"=1 and permission in ('"+ permission +"') and userid=(select distinct id from users where status=1 and account='"+ username +"')");
			if (query.list().isEmpty()){
				result = 0;
			}else{
				result = 1;
			}
		}
		return result;
	}
}
