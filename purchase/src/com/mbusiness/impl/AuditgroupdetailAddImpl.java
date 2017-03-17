package com.mbusiness.impl;

import java.text.SimpleDateFormat;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.mbusiness.dao.AuditgroupdetailAddDAO;
import com.mbusiness.model.Auditgroupdetail;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Inputverify;
import com.mbusiness.util.MMessage;

public class AuditgroupdetailAddImpl implements AuditgroupdetailAddDAO {
	
	private String result;
	private Session session;
	private MMessage mmessage = new MMessage();
	private HasPermission hasPermission = new HasPermission();
	private Inputverify inputverify = new Inputverify();
	//private AuditgroupdetailCorporationid auditgroupdetailCorporationid = new AuditgroupdetailCorporationid();
	@Override
	public String add(Usersession usersession, Auditgroupdetail auditgroupdetail) {
		SimpleDateFormat sformat = new SimpleDateFormat("yyyy-MM-dd");
		session = HibernateUtil_new.currentSession();
		session.beginTransaction();
		if(usersession.getUsername().equalsIgnoreCase("")){
			result = mmessage.notlogin;
		}else{
			String details = auditgroupdetail.getZdy10();			
			auditgroupdetail.setZdy10("");
			//System.out.print(""+ inputverify.check(details));
			int flag = 1;			
			if(auditgroupdetail.getZdy10() != null){
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
					List<Auditgroupdetail> ps = gson.fromJson("["+ details +"]", new TypeToken<List<Auditgroupdetail>>(){}.getType());
					Auditgroupdetail s;
					//System.out.println("========"+details);
					for(int i=0;i<ps.size();i++){
						HibernateUtil_new.closeSession();
						session = HibernateUtil_new.currentSession();
						session.beginTransaction();
						int supplierid = 0;
						List<Object> o1 = session.createSQLQuery("select id from supplier where status=1 and name='"+ ps.get(i).getZdy2() +"'").list();
						if(!o1.isEmpty()){
							supplierid = Integer.parseInt(o1.get(0).toString());
						}
						if(ps.get(i).getId() == 0){
							List<Auditgroupdetail> is = session.createSQLQuery("select * from auditgroupdetail where status=1 and id<>"+ ps.get(i).getId() +" and mainid="+ auditgroupdetail.getMainid() +" and supplierid="+ supplierid).addEntity(Auditgroupdetail.class).list();
							if(is.isEmpty()){
								s = new Auditgroupdetail();
								s.setMainid(auditgroupdetail.getMainid());
								s.setSupplierid(supplierid);
								s.setStatus(1);
								session.save(s);
							}
						}else{
							List<Auditgroupdetail> auditgroupdetails = session.createSQLQuery("select * from auditgroupdetail where status=1 and id="+ ps.get(i).getId()).addEntity(Auditgroupdetail.class).list();
							if(auditgroupdetails.isEmpty()){
								result = mmessage.datachange;
								break;
							}else{
								List<Auditgroupdetail> is = session.createSQLQuery("select * from auditgroupdetail where status=1 and id<>"+ ps.get(i).getId() +" and mainid="+ ps.get(i).getMainid() +" and supplierid="+ supplierid).addEntity(Auditgroupdetail.class).list();
								if(is.isEmpty()){
									auditgroupdetails.get(0).setSupplierid(supplierid);
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
