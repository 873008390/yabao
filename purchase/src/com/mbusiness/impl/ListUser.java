package com.mbusiness.impl;

import java.util.List;

import org.hibernate.Session;

public class ListUser {

	private String result = "";
	public String list(String account,Session session){
		if(account.equalsIgnoreCase("admin")){
			List<Object> o = session.createSQLQuery("select id from users where status=1").list();
			if(!o.isEmpty()){
				for(int i=0;i<o.size();i++){
					if(result.equalsIgnoreCase("")){
						result = o.get(i).toString();
					}else{
						result = result +","+ o.get(i).toString();
					}
				}
			}
		}else{
			List<Object> o0 = session.createSQLQuery("select orgid from users where status=1 and account='"+ account +"'").list();
			if(!o0.isEmpty()){
				if(o0.get(0).toString().equalsIgnoreCase("0")){
					List<Object> o = session.createSQLQuery("select id from users where status=1 and account<>'admin' and orgid = (select orgid from users where status=1 and account='"+ account +"')").list();
					if(!o.isEmpty()){
						for(int i=0;i<o.size();i++){
							if(result.equalsIgnoreCase("")){
								result = o.get(i).toString();
							}else{
								result = result +","+ o.get(i).toString();
							}
						}
					}
				}else{
					List<Object> o = session.createSQLQuery("select id from users where status=1 and account<>'admin' and supplierid = (select supplierid from users where status=1 and account='"+ account +"')").list();
					if(!o.isEmpty()){
						for(int i=0;i<o.size();i++){
							if(result.equalsIgnoreCase("")){
								result = o.get(i).toString();
							}else{
								result = result +","+ o.get(i).toString();
							}
						}
					}
				}
			}
			
		}
		if(result.equalsIgnoreCase("")){
			result = "0";
		}
		return result;
	}
}
