package com.mbusiness.impl;

import java.util.List;

import org.hibernate.Session;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.mbusiness.dao.ProductunitAddDAO;
import com.mbusiness.model.Productunit;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Logging;
import com.mbusiness.util.MMessage;

public class ProductunitAddImpl implements ProductunitAddDAO {
	
	private String titleValid;
	private String result;
	private Session session;
	private MMessage mmessage = new MMessage();
	private Logging logging = new Logging();
	private HasPermission hasPermission = new HasPermission();
	@Override
	public String add(Usersession usersession, Productunit productunit) {
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
				String details = productunit.getZdy10();
				
				productunit.setZdy10("");
				//System.out.println("========"+details);
				
				Gson gson = new Gson();
				List<Productunit> ps = gson.fromJson("["+ details +"]", new TypeToken<List<Productunit>>(){}.getType());
				Productunit s;
				//System.out.println("========"+details);
				for(int i=0;i<ps.size();i++){
					HibernateUtil_new.closeSession();
					session = HibernateUtil_new.currentSession();
					session.beginTransaction();
					int downid = 0;
					if(ps.get(i).getIsbase() == 0){
						List<Object> o = session.createSQLQuery("select id from productunit where status=1 and name='"+ ps.get(i).getZdy2()+"'").list();
						if(!o.isEmpty()){
							downid = Integer.parseInt(o.get(0).toString());
						}
					}
					if(ps.get(i).getId() == 0){
						s = new Productunit();
						s.setName(ps.get(i).getName());
						s.setDownid(downid);
						s.setIsbase(ps.get(i).getIsbase());
						s.setTotal(ps.get(i).getTotal());
						s.setStatus(1);
						session.save(s);
					}else{
						List<Productunit> productunits = session.createSQLQuery("select * from productunit where status=1 and id="+ ps.get(i).getId()).addEntity(Productunit.class).list();
						if(productunits.isEmpty()){
							result = mmessage.datachange;
							break;
						}else{
							productunits.get(0).setName(ps.get(i).getName());
							productunits.get(0).setDownid(downid);
							productunits.get(0).setIsbase(ps.get(i).getIsbase());
							productunits.get(0).setTotal(ps.get(i).getTotal());
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
