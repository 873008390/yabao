package com.mbusiness.impl;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;

import com.mbusiness.dao.ProvinceDeleteDAO;
import com.mbusiness.model.Province;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Logging;
import com.mbusiness.util.MMessage;

public class ProvinceDeleteImpl implements ProvinceDeleteDAO {
	
	private String result;
	private Session session;
	private MMessage mmessage = new MMessage();
	private Logging logging = new Logging();
	private HasPermission hasPermission = new HasPermission();
	//private ProvinceCorporationid provinceCorporationid = new ProvinceCorporationid();
	@Override
	public String delete(Usersession usersession, int provinceid) {
		session = HibernateUtil_new.currentSession();
		session.beginTransaction();
		if(usersession.getUsername().equalsIgnoreCase("")){
			result = mmessage.notlogin;
		}else{
			int flag = 0;		
			if(hasPermission.hasPermission(usersession.getUsername(), "area", "deletedata", session) == 0){
				if(usersession.getUsername().equalsIgnoreCase("admin")){
					flag = 1;	
				}else{
					result = mmessage.nopermission;
				}
			}else{
				flag = 1;
			}
			if(flag == 1){
				List<Province> provinces = session.createSQLQuery("select * from province where status=1 and id="+ provinceid).addEntity(Province.class).list();
				if(provinces.isEmpty()){
					result = mmessage.provinceinvalid;
				}else{
					Query q = session.createSQLQuery("select id from city where status=1 and provinceid="+ provinceid);
					if(q.list().isEmpty()){
						provinces.get(0).setStatus(0);
				        session.getTransaction().commit();	
				        result = mmessage.deletesuccess;
					}else{
						result = mmessage.provincehascity;
					}					
				}				
			}						
		}
		HibernateUtil_new.closeSession();
		return result;
	}
}
