package com.mbusiness.impl;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.mbusiness.dao.TownAddDAO;
import com.mbusiness.model.Town;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Logging;
import com.mbusiness.util.MMessage;

public class TownAddImpl implements TownAddDAO {
	
	private String titleValid;
	private String result;
	private Session session;
	private MMessage mmessage = new MMessage();
	private Logging logging = new Logging();
	private HasPermission hasPermission = new HasPermission();
	//private TownCorporationid townCorporationid = new TownCorporationid();
	@Override
	public String add(Usersession usersession, Town town) {
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
				String details = town.getZdy10();
				
				town.setZdy10("");
				//System.out.println("========"+details);
				
				Gson gson = new Gson();
				List<Town> ps = gson.fromJson("["+ details +"]", new TypeToken<List<Town>>(){}.getType());
				Town s;
				//System.out.println("========"+details);
				for(int i=0;i<ps.size();i++){
					HibernateUtil_new.closeSession();
					session = HibernateUtil_new.currentSession();
					session.beginTransaction();
					List<Object> o = session.createSQLQuery("select id from city where status=1 and name='"+ ps.get(i).getZdy2()+"'").list();
					if(o.isEmpty()){
						result = mmessage.provinceinvalid;
						break;
					}
					if(ps.get(i).getId() == 0){
						Query q = session.createSQLQuery("select id from town where status=1 and name='"+ ps.get(i).getName() +"' and cityid="+ Integer.parseInt(o.get(0).toString()));
						if(q.list().isEmpty()){
							s = new Town();
							s.setName(ps.get(i).getName());
							s.setCityid(Integer.parseInt(o.get(0).toString()));
							s.setStatus(1);
							session.save(s);
						}else{
							result = mmessage.dataduplicate;
							break;
						}
					}else{
						List<Town> towns = session.createSQLQuery("select * from town where status=1 and id="+ ps.get(i).getId()).addEntity(Town.class).list();
						if(towns.isEmpty()){
							result = mmessage.datachange;
							break;
						}else{
							towns.get(0).setCityid(Integer.parseInt(o.get(0).toString()));
							towns.get(0).setName(ps.get(i).getName());
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
