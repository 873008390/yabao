package com.mbusiness.impl;

import java.text.SimpleDateFormat;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;

import com.mbusiness.dao.AuditgroupDeleteDAO;
import com.mbusiness.model.Auditgroup;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Logging;
import com.mbusiness.util.MMessage;

public class AuditgroupDeleteImpl implements AuditgroupDeleteDAO {
	
	private String result;
	private Session session;
	private MMessage mmessage = new MMessage();
	private HasPermission hasPermission = new HasPermission();
	//private AuditgroupCorporationid auditgroupCorporationid = new AuditgroupCorporationid();
	private SimpleDateFormat sformat = new SimpleDateFormat("yyyy-MM-dd");
	@Override
	public String delete(Usersession usersession, int auditgroupid) {
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
				List<Auditgroup> auditgroups = session.createSQLQuery("select * from auditgroup where status=1 and id="+ auditgroupid).addEntity(Auditgroup.class).list();
				if(auditgroups.isEmpty()){
					result = mmessage.auditgroupinvalid;
				}else{
					//存在审核中的供应商，则不允许删除审核组
					Query q = session.createSQLQuery("select id from supplier where status=1 and auditstatus=2 and orgid="+ auditgroups.get(0).getOrgid());
					if(!q.list().isEmpty()){
						result = mmessage.auditing;
					}else{
						//查看是否存在未审核供应商
						q = session.createSQLQuery("select id from supplier where status=1 and auditstatus=0 and orgid="+ auditgroups.get(0).getOrgid());
						if(!q.list().isEmpty()){
							//查看是否还有正常状态的审核组
							q = session.createSQLQuery("select id from auditgroup where status=1 and id<>"+ auditgroupid +" and orgid="+ auditgroups.get(0).getOrgid());
							if(q.list().isEmpty()){
								//若没有，则把所有未审核的供应商改为已审核状态
								Query q1 = session.createSQLQuery("update supplier set auditstatus=1 where status=1 and auditstatus=0 and orgid="+ auditgroups.get(0).getOrgid());
								q1.executeUpdate();
							}
						}
						auditgroups.get(0).setStatus(0);
						Query q2 = session.createSQLQuery("update auditgroupdetail set status=0 where mainid="+ auditgroupid);
						q2.executeUpdate();
				        session.getTransaction().commit();	
				        result = mmessage.deletesuccess;
					}
				}				
			}						
		}
		HibernateUtil_new.closeSession();
		return result;
	}
}
