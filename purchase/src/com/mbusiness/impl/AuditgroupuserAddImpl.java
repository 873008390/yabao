package com.mbusiness.impl;

import java.text.SimpleDateFormat;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.mbusiness.dao.AuditgroupuserAddDAO;
import com.mbusiness.model.Auditgroupuser;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Inputverify;
import com.mbusiness.util.MMessage;

public class AuditgroupuserAddImpl implements AuditgroupuserAddDAO {
	
	private String result;
	private Session session;
	private MMessage mmessage = new MMessage();
	private HasPermission hasPermission = new HasPermission();
	private Inputverify inputverify = new Inputverify();
	//private AuditgroupuserCorporationid auditgroupuserCorporationid = new AuditgroupuserCorporationid();
	@Override
	public String add(Usersession usersession, Auditgroupuser auditgroupuser) {
		SimpleDateFormat sformat = new SimpleDateFormat("yyyy-MM-dd");
		session = HibernateUtil_new.currentSession();
		session.beginTransaction();
		if(usersession.getUsername().equalsIgnoreCase("")){
			result = mmessage.notlogin;
		}else{
			String users = auditgroupuser.getZdy10();			
			auditgroupuser.setZdy10("");
			//System.out.print(""+ inputverify.check(users));
			int flag = 1;			
			if(auditgroupuser.getZdy10() != null){
				flag = inputverify.check(users);
			}
			if(flag != 1){
				result = mmessage.dataillegal;
			}else{
				flag = 0;
				if(hasPermission.hasPermission(usersession.getUsername(), "auditgroup", "adddata", session) == 0){
					if(usersession.getUsername().equalsIgnoreCase("admin")){
						flag = 1;	
					}else{
						result = mmessage.nopermission;
					}
				}else{
					flag = 1;
				}
				if(flag == 1){			
					
					
					Gson gson = new Gson();
					List<Auditgroupuser> ps = gson.fromJson("["+ users +"]", new TypeToken<List<Auditgroupuser>>(){}.getType());
					Auditgroupuser s;
					//System.out.println("========"+users);
					for(int i=0;i<ps.size();i++){
						HibernateUtil_new.closeSession();
						session = HibernateUtil_new.currentSession();
						session.beginTransaction();
						int userid = 0;
						List<Object> o1 = session.createSQLQuery("select id from users where status=1 and name='"+ ps.get(i).getZdy2() +"'").list();
						if(!o1.isEmpty()){
							userid = Integer.parseInt(o1.get(0).toString());
						}
						int mainid = auditgroupuser.getMainid();
//						List<Object> o2 = session.createSQLQuery("select id from auditgroup where status=1 and name='"+ ps.get(i).getZdy3() +"'").list();
//						if(!o2.isEmpty()){
//							mainid = Integer.parseInt(o2.get(0).toString());
//						}
						if(ps.get(i).getId() == 0){
							List<Auditgroupuser> is = session.createSQLQuery("select * from auditgroupuser where status=1 and id<>"+ ps.get(i).getId() +" and mainid="+ mainid +" and userid="+ userid).addEntity(Auditgroupuser.class).list();
							if(is.isEmpty()){
								s = new Auditgroupuser();
								s.setMainid(mainid);
								s.setUserid(userid);
								s.setStatus(1);
								session.save(s);
							}
						}else{
							List<Auditgroupuser> auditgroupusers = session.createSQLQuery("select * from auditgroupuser where status=1 and id="+ ps.get(i).getId()).addEntity(Auditgroupuser.class).list();
							if(auditgroupusers.isEmpty()){
								result = mmessage.datachange;
								break;
							}else{
								List<Auditgroupuser> is = session.createSQLQuery("select * from auditgroupuser where status=1 and id<>"+ ps.get(i).getId() +" and mainid="+ mainid +" and userid="+ userid).addEntity(Auditgroupuser.class).list();
								if(is.isEmpty()){
									auditgroupusers.get(0).setUserid(userid);
								}
							}
						}					
				        session.getTransaction().commit();
				        result = mmessage.savesuccess;					
					}
				}
			}									
		}
		HibernateUtil_new.closeSession();
		return result;
	}
}
