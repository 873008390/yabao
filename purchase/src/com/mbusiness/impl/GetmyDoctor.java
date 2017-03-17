package com.mbusiness.impl;

import java.util.List;

import org.hibernate.Session;

public class GetmyDoctor {

	private String doctorids = "";
	
	public String get(Session session, String salerids){
		if(salerids.equalsIgnoreCase("")){
			salerids = "0";
		}
		List<Object> o11 = session.createSQLQuery("select id from users where status=1 and customerid in(select id from customer where status=1 and type=2 and salerid in("+ salerids +"))").list();//doctor
		if(!o11.isEmpty()){
			for(int i=0;i<o11.size();i++){
				if(doctorids.equalsIgnoreCase("")){
					doctorids = o11.get(i).toString();
				}else{
					doctorids = doctorids +","+ o11.get(i).toString();
				}
			}
		}
		return doctorids;
	}
}
