package com.mbusiness.impl;

import java.util.List;

import org.hibernate.Session;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.mbusiness.dao.ProductspecAddDAO;
import com.mbusiness.model.Productspec;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Logging;
import com.mbusiness.util.MMessage;

public class ProductspecAddImpl implements ProductspecAddDAO {
	
	private String titleValid;
	private String result;
	private Session session;
	private MMessage mmessage = new MMessage();
	private Logging logging = new Logging();
	private HasPermission hasPermission = new HasPermission();
	//private ProductspecCorporationid productspecCorporationid = new ProductspecCorporationid();
	@Override
	public String add(Usersession usersession, Productspec productspec) {
		session = HibernateUtil_new.currentSession();
		session.beginTransaction();
		if(usersession.getUsername().equalsIgnoreCase("")){
			result = mmessage.notlogin;
		}else{
			int flag = 0;		
			if(hasPermission.hasPermission(usersession.getUsername(), "product", "adddata", session) == 0){
				if(usersession.getUsername().equalsIgnoreCase("admin")){
					flag = 1;	
				}else{
					result = mmessage.nopermission;
				}
			}else{
				flag = 1;
			}
			if(flag == 1){			
				String details = productspec.getZdy10();
				
				productspec.setZdy10("");
				//System.out.println("========"+details);
				
				Gson gson = new Gson();
				List<Productspec> ps = gson.fromJson("["+ details +"]", new TypeToken<List<Productspec>>(){}.getType());
				Productspec s;
				//System.out.println("========"+details);
				for(int i=0;i<ps.size();i++){
					HibernateUtil_new.closeSession();
					session = HibernateUtil_new.currentSession();
					session.beginTransaction();
					if(ps.get(i).getId() == 0){
						s = new Productspec();
						s.setName(ps.get(i).getName());
						s.setStatus(1);
						session.save(s);
					}else{
						List<Productspec> productspecs = session.createSQLQuery("select * from productspec where status=1 and id="+ ps.get(i).getId()).addEntity(Productspec.class).list();
						if(productspecs.isEmpty()){
							result = mmessage.datachange;
							break;
						}else{
							productspecs.get(0).setName(ps.get(i).getName());
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
