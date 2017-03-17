package com.mbusiness.impl;

import java.text.SimpleDateFormat;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.mbusiness.dao.AuditgroupAddDAO;
import com.mbusiness.model.Auditgroup;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Inputverify;
import com.mbusiness.util.MMessage;

public class AuditgroupAddImpl implements AuditgroupAddDAO {
	
	private String result;
	private Session session;
	private MMessage mmessage = new MMessage();
	private HasPermission hasPermission = new HasPermission();
	private Inputverify inputverify = new Inputverify();
	//private AuditgroupCorporationid auditgroupCorporationid = new AuditgroupCorporationid();
	@Override
	public String add(Usersession usersession, Auditgroup auditgroup) {
		SimpleDateFormat sformat = new SimpleDateFormat("yyyy-MM-dd");
		session = HibernateUtil_new.currentSession();
		session.beginTransaction();
		if(usersession.getUsername().equalsIgnoreCase("")){
			result = mmessage.notlogin;
		}else{
			String details = auditgroup.getZdy10();			
			auditgroup.setZdy10("");
			//System.out.print(""+ inputverify.check(details));
			int flag = 1;			
			if(auditgroup.getZdy10() != null){
				flag = inputverify.check(details);
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
					List<Auditgroup> ps = gson.fromJson("["+ details +"]", new TypeToken<List<Auditgroup>>(){}.getType());
					Auditgroup s;
					//System.out.println("========"+details);
					for(int i=0;i<ps.size();i++){
						HibernateUtil_new.closeSession();
						session = HibernateUtil_new.currentSession();
						session.beginTransaction();
						int orgid = ps.get(i).getOrgid();
//						if(usersession.getUsername().equalsIgnoreCase("admin")){
//							List<Object> o1 = session.createSQLQuery("select id from org where status=1 and name='"+ ps.get(i).getZdy2() +"'").list();
//							if(o1.isEmpty()){
//								result = mmessage.orginvalid +"["+ ps.get(i).getZdy2() +"]";
//								break;
//							}else{
//								orgid = Integer.parseInt(o1.get(0).toString());
//							}
//						}else{
//							List<Object> o1 = session.createSQLQuery("select orgid from user where status=1 and account='"+ usersession.getUsername() +"'").list();
//							if(o1.isEmpty()){
//								result = mmessage.orginvalid +"["+ usersession.getUsername() +"]";
//								break;
//							}else{
//								orgid = Integer.parseInt(o1.get(0).toString());
//							}
//						}
						if(ps.get(i).getId() == 0){
							Query q = session.createSQLQuery("select name from auditgroup where status=1 and orgid=" + orgid + " and name='"+ ps.get(i).getName() +"'");
							if(!q.list().isEmpty()){
								result = mmessage.nameduplicate +"["+ ps.get(i).getName() +"]";
								break;
							}
							Query q1 = session.createSQLQuery("select id from auditgroup where status=1 and orgid="+ orgid +" and orderid="+ ps.get(i).getOrderid());
							if(!q1.list().isEmpty()){
								result = mmessage.orderidduplicate +"["+ ps.get(i).getName() +"]";
							}
							s = new Auditgroup();
							s.setName(ps.get(i).getName());
							s.setStatus(1);
							s.setOrgid(orgid);
							s.setOrderid(ps.get(i).getOrderid());
							session.save(s);
						}else{
							Query q = session.createSQLQuery("select name from auditgroup where status=1 and name='"+ ps.get(i).getName() +"' and id<>"+ ps.get(i).getId());
							if(!q.list().isEmpty()){
								result = mmessage.nameduplicate +"["+ ps.get(i).getName() +"]";
								break;
							}
							Query q1 = session.createSQLQuery("select id from auditgroup where status=1 and orgid="+ orgid +" and orderid="+ ps.get(i).getOrderid() +" and id<>"+ ps.get(i).getId());
							if(!q1.list().isEmpty()){
								result = mmessage.orderidduplicate +"["+ ps.get(i).getName() +"]";
								break;
							}
							List<Auditgroup> auditgroups = session.createSQLQuery("select * from auditgroup where status=1 and id="+ ps.get(i).getId()).addEntity(Auditgroup.class).list();
							if(auditgroups.isEmpty()){
								result = mmessage.datachange;
								break;
							}else{
								auditgroups.get(0).setName(ps.get(i).getName());
								auditgroups.get(0).setOrderid(ps.get(i).getOrderid());
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
