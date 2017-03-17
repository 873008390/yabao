package com.mbusiness.impl;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.Date;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.mbusiness.dao.OrgAddDAO;
import com.mbusiness.model.Org;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Logging;
import com.mbusiness.util.MMessage;

public class OrgAddImpl implements OrgAddDAO {
	
	private String titleValid;
	private String result;
	private Session session;
	private MMessage mmessage = new MMessage();
	private Logging logging = new Logging();
	private HasPermission hasPermission = new HasPermission();
	@Override
	public String add(Usersession usersession, Org org) {
		session = HibernateUtil_new.currentSession();
		session.beginTransaction();
		if(usersession.getUsername().equalsIgnoreCase("")){
			result = mmessage.notlogin;
		}else{
			int flag = 0;		
			if(hasPermission.hasPermission(usersession.getUsername(), "org", "adddata", session) == 0){
				if(usersession.getUsername().equalsIgnoreCase("admin")){
					flag = 1;	
				}else{
					result = mmessage.nopermission;
				}
			}else{
				flag = 1;
			}
			if(flag == 1){			
				String details = org.getZdy10();
				
				org.setZdy10("");
				//System.out.println("========"+details);
				
				Gson gson = new Gson();
				List<Org> ps = gson.fromJson("["+ details +"]", new TypeToken<List<Org>>(){}.getType());
				Org s;
				//System.out.println("========"+details);
				for(int i=0;i<ps.size();i++){
					HibernateUtil_new.closeSession();
					session = HibernateUtil_new.currentSession();
					session.beginTransaction();
					int upperid = 0;
					if(!ps.get(i).getZdy2().equalsIgnoreCase("0")){
						List<Object> o = session.createSQLQuery("select id from org where status=1 and name='"+ ps.get(i).getZdy2()+"'").list();
						if(o.isEmpty()){
							result = mmessage.provinceinvalid;
							break;
						}else{
							upperid = Integer.parseInt(o.get(0).toString());
						}
					}
					if(ps.get(i).getId() == 0){
						Query q = session.createSQLQuery("select id from org where status=1 and name='"+ ps.get(i).getName() +"' and upperid="+ upperid);
						if(q.list().isEmpty()){
							s = new Org();
							try {
								s.setName(URLDecoder.decode(ps.get(i).getName(),"UTF-8"));
							} catch (UnsupportedEncodingException e) {
								e.printStackTrace();
							}
							s.setUpperid(upperid);
							s.setCreatedate(new Date());
							s.setStatus(1);
							session.save(s);
						}else{
							result = mmessage.dataduplicate;
							break;
						}
					}else{
						List<Org> orgs = session.createSQLQuery("select * from org where status=1 and id="+ ps.get(i).getId()).addEntity(Org.class).list();
						if(orgs.isEmpty()){
							result = mmessage.datachange;
							break;
						}else{
							orgs.get(0).setUpperid(upperid);
							try {
								orgs.get(0).setName(URLDecoder.decode(ps.get(i).getName(),"UTF-8"));
							} catch (UnsupportedEncodingException e) {
								e.printStackTrace();
							}
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
