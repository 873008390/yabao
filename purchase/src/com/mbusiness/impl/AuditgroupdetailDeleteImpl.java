package com.mbusiness.impl;

import java.text.SimpleDateFormat;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;

import com.mbusiness.dao.AuditgroupdetailDeleteDAO;
import com.mbusiness.model.Auditgroupdetail;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Logging;
import com.mbusiness.util.MMessage;

public class AuditgroupdetailDeleteImpl implements AuditgroupdetailDeleteDAO {
	
	private String result;
	private Session session;
	private MMessage mmessage = new MMessage();
	private HasPermission hasPermission = new HasPermission();
	//private AuditgroupdetailCorporationid auditgroupdetailCorporationid = new AuditgroupdetailCorporationid();
	private SimpleDateFormat sformat = new SimpleDateFormat("yyyy-MM-dd");
	@Override
	public String delete(Usersession usersession, int auditgroupdetailid) {
		session = HibernateUtil_new.currentSession();
		session.beginTransaction();
		if(usersession.getUsername().equalsIgnoreCase("")){
			result = mmessage.notlogin;
		}else{
			int flag = 0;		
			if(hasPermission.hasPermission(usersession.getUsername(), "auditgroup", "deletedata", session) == 0){
				if(usersession.getUsername().equalsIgnoreCase("admin")){
					flag = 1;	
				}else{
					result = mmessage.nopermission;
				}
			}else{
				flag = 1;
			}
			if(flag == 1){
				List<Auditgroupdetail> auditgroupdetails = session.createSQLQuery("select * from auditgroupdetail where status=1 and id="+ auditgroupdetailid).addEntity(Auditgroupdetail.class).list();
				if(auditgroupdetails.isEmpty()){
					result = mmessage.auditgroupdetailinvalid;
				}else{
					auditgroupdetails.get(0).setStatus(0);
			        session.getTransaction().commit();	
			        result = mmessage.deletesuccess;
				}				
			}						
		}
		HibernateUtil_new.closeSession();
		return result;
	}
}
