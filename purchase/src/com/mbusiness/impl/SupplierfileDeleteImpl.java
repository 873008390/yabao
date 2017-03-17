package com.mbusiness.impl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;

import com.mbusiness.dao.SupplierfileDeleteDAO;
import com.mbusiness.model.Auditlog;
import com.mbusiness.model.Supplierfile;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Logging;
import com.mbusiness.util.MMessage;

public class SupplierfileDeleteImpl implements SupplierfileDeleteDAO {
	
	private String result;
	private Session session;
	private MMessage mmessage = new MMessage();
	private Logging logging = new Logging();
	private HasPermission hasPermission = new HasPermission();
	//private CustomerfileCorporationid supplierfileCorporationid = new CustomerfileCorporationid();
	private SimpleDateFormat sformat = new SimpleDateFormat("yyyy-MM-dd");
	@Override
	public String delete(Usersession usersession, int supplierfileid) {
		session = HibernateUtil_new.currentSession();
		session.beginTransaction();
		if(usersession.getUsername().equalsIgnoreCase("")){
			result = mmessage.notlogin;
		}else{
			int flag = 0;		
			if(hasPermission.hasPermission(usersession.getUsername(), "supplier", "deletedata", session) == 0){
				if(usersession.getUsername().equalsIgnoreCase("admin")){
					flag = 1;	
				}else{
					List<Object> o = session.createSQLQuery("select supplierid from supplierfile where id="+ supplierfileid +" and supplierid=(select supplierid from users where status=1 and account='"+ usersession.getUsername() +"')").list();
					if(!o.isEmpty()){
						flag = 1;
					}else{					
						result = mmessage.nopermission;
					}
				}
			}else{
				flag = 1;
			}
			if(flag == 1){
				List<Supplierfile> supplierfiles = session.createSQLQuery("select * from supplierfile where status=1 and id="+ supplierfileid).addEntity(Supplierfile.class).list();
				if(supplierfiles.isEmpty()){
					result = mmessage.supplierfileinvalid;
				}else{
					supplierfiles.get(0).setStatus(0);
					
					//update supplier
					Query q = session.createSQLQuery("update supplier set filenum=filenum-1,auditstatus=0 where id="+ supplierfiles.get(0).getSupplierid());
					q.executeUpdate();
					session.getTransaction().commit();	
					HibernateUtil_new.closeSession();
					session = HibernateUtil_new.currentSession();
					session.beginTransaction();
					
					//log
					int userid = 0;
					List<Object[]> o1 = session.createSQLQuery("select orgid,id from users where status=1 and account='"+ usersession.getUsername() +"'").list();
					if(!o1.isEmpty()){
						userid = Integer.parseInt(o1.get(0)[1].toString());
					}
					String modifycontent = "É¾³ý¸½¼þ";
					if(supplierfiles.get(0).getZdy10() == null){
						modifycontent = modifycontent +"£º"+ supplierfiles.get(0).getZdy10();
					}					
					if(userid>0){
						Auditlog al = new Auditlog();
						al.setCreatedate(new Date());
						al.setAuditgroupid(0);
						al.setMemo("");
						al.setOperation("");
						al.setStatus(1);
						al.setSupplierid(supplierfiles.get(0).getSupplierid());
						al.setUserid(userid);
						al.setModifycontent(modifycontent);
						session.save(al);
					}
					
			        session.getTransaction().commit();	
			        result = mmessage.deletesuccess;
				}				
			}						
		}
		HibernateUtil_new.closeSession();
		return result;
	}
}
