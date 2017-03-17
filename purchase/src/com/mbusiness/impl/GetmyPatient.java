package com.mbusiness.impl;

import java.util.List;

import org.hibernate.Session;

public class GetmyPatient {

	private String patientids = "";
	
	public String get(Session session, String doctorids, String salerids){
		if(doctorids.equalsIgnoreCase("")){
			doctorids = "0";
		}
		if(salerids.equalsIgnoreCase("")){
			salerids = "0";
		}
		List<Object> o12 = session.createSQLQuery("select id from users where status=1 and customerid in(select id from customer where status=1 and type=4 and salerid in("+ doctorids +","+ salerids +"))").list();//doctor
		if(!o12.isEmpty()){
			for(int i=0;i<o12.size();i++){
				if(patientids.equalsIgnoreCase("")){
					patientids = o12.get(i).toString();
				}else{
					patientids = patientids +","+ o12.get(i).toString();
				}
			}
		}
		return patientids;
	}
}
