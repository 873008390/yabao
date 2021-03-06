package com.mbusiness.impl;

import java.text.SimpleDateFormat;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;

import com.mbusiness.dao.CityDeleteDAO;
import com.mbusiness.model.City;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Logging;
import com.mbusiness.util.MMessage;

public class CityDeleteImpl implements CityDeleteDAO {
	
	private String result;
	private Session session;
	private MMessage mmessage = new MMessage();
	private Logging logging = new Logging();
	private HasPermission hasPermission = new HasPermission();
	//private CityCorporationid cityCorporationid = new CityCorporationid();
	private SimpleDateFormat sformat = new SimpleDateFormat("yyyy-MM-dd");
	@Override
	public String delete(Usersession usersession, int cityid) {
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
				List<City> citys = session.createSQLQuery("select * from city where status=1 and id="+ cityid).addEntity(City.class).list();
				if(citys.isEmpty()){
					result = mmessage.cityinvalid;
				}else{
					Query q = session.createSQLQuery("select id from town where status=1 and cityid="+ cityid);
					if(q.list().isEmpty()){
						citys.get(0).setStatus(0);
				        session.getTransaction().commit();	
				        result = mmessage.deletesuccess;
					}else{
						result = mmessage.cityhastown;
					}
				}				
			}						
		}
		HibernateUtil_new.closeSession();
		return result;
	}
}
