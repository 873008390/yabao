package com.mbusiness.impl;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.mbusiness.dao.ProvinceAddDAO;
import com.mbusiness.model.Province;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Logging;
import com.mbusiness.util.MMessage;

public class ProvinceAddImpl implements ProvinceAddDAO {
	
	private String titleValid;
	private String result;
	private Session session;
	private MMessage mmessage = new MMessage();
	private Logging logging = new Logging();
	private HasPermission hasPermission = new HasPermission();
	//private ProvinceCorporationid provinceCorporationid = new ProvinceCorporationid();
	@Override
	public String add(Usersession usersession, Province province) {
		session = HibernateUtil_new.currentSession();
		session.beginTransaction();
		if(usersession.getUsername().equalsIgnoreCase("")){
			result = mmessage.notlogin;
		}else{
			int flag = 0;		
			if(hasPermission.hasPermission(usersession.getUsername(), "area", "adddata", session) == 0){
				if(usersession.getUsername().equalsIgnoreCase("admin")){
					flag = 1;	
				}else{
					result = mmessage.nopermission;
				}
			}else{
				flag = 1;
			}
			if(flag == 1){			
				String details = province.getZdy10();
				
				province.setZdy10("");
				//System.out.println("========"+details);
				
				Gson gson = new Gson();
				List<Province> ps = gson.fromJson("["+ details +"]", new TypeToken<List<Province>>(){}.getType());
				Province s;
				//System.out.println("========"+details);
				for(int i=0;i<ps.size();i++){
					HibernateUtil_new.closeSession();
					session = HibernateUtil_new.currentSession();
					session.beginTransaction();
					if(ps.get(i).getId() == 0){
						Query q = session.createSQLQuery("select id from province where status=1 and name='"+ ps.get(i).getName() +"'");
						if(q.list().isEmpty()){
							s = new Province();
							s.setName(ps.get(i).getName());
							s.setShortname(ps.get(i).getShortname());
							s.setStatus(1);
							session.save(s);
						}else{
							result = mmessage.dataduplicate +"["+ ps.get(i).getName() +"]";
							break;
						}
					}else{
						List<Province> provinces = session.createSQLQuery("select * from province where status=1 and id="+ ps.get(i).getId()).addEntity(Province.class).list();
						if(provinces.isEmpty()){
							result = mmessage.datachange;
							break;
						}else{
							provinces.get(0).setShortname(ps.get(i).getShortname());
							provinces.get(0).setName(ps.get(i).getName());
						}
					}					
			        session.getTransaction().commit();	
			        result = mmessage.savesuccess;					
				}				
			}						
		}
		HibernateUtil_new.closeSession();
		return result;
	}
}
