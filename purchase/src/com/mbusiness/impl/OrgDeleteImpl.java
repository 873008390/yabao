package com.mbusiness.impl;

import java.text.SimpleDateFormat;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;

import com.mbusiness.dao.OrgDeleteDAO;
import com.mbusiness.model.Org;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Logging;
import com.mbusiness.util.MMessage;

public class OrgDeleteImpl implements OrgDeleteDAO {
	
	private String result;
	private Session session;
	private MMessage mmessage = new MMessage();
	private Logging logging = new Logging();
	private HasPermission hasPermission = new HasPermission();
	//private OrgCorporationid orgCorporationid = new OrgCorporationid();
	private SimpleDateFormat sformat = new SimpleDateFormat("yyyy-MM-dd");
	@Override
	public String delete(Usersession usersession, int orgid) {
		session = HibernateUtil_new.currentSession();
		session.beginTransaction();
		if(usersession.getUsername().equalsIgnoreCase("")){
			result = mmessage.notlogin;
		}else{
			int flag = 0;		
			if(hasPermission.hasPermission(usersession.getUsername(), "area", "deletedata", session) == 0){
				if(usersession.getUsername().equalsIgnoreCase("admin")){
					flag = 1;	
				}else{
					result = mmessage.nopermission;
				}
			}else{
				flag = 1;
			}
			if(flag == 1){
				List<Org> orgs = session.createSQLQuery("select * from org where status=1 and id="+ orgid).addEntity(Org.class).list();
				if(orgs.isEmpty()){
					result = mmessage.orginvalid;
				}else{
					orgs.get(0).setStatus(0);
					List<Org> orgcenters = session.createSQLQuery("select * from org where status=1 and upperid="+ orgs.get(0).getId()).addEntity(Org.class).list();
					if(!orgcenters.isEmpty()){
						String ids = "";
						for(int i=0;i<orgcenters.size();i++){
							orgcenters.get(i).setStatus(0);
							if(ids.equalsIgnoreCase("")){
								ids = ""+ orgcenters.get(i).getId();
							}else{
								ids = ids +","+ orgcenters.get(i).getId();
							}
						}
						Query q = session.createSQLQuery("update org set status=0 where upperid in("+ ids +")");
						q.executeUpdate();
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
