package com.mbusiness.impl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;

import com.mbusiness.dao.UserchangeauditstatusDAO;
import com.mbusiness.model.Smssending;
import com.mbusiness.model.Users;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Logging;
import com.mbusiness.util.MMessage;

public class UserchangeauditstatusImpl implements UserchangeauditstatusDAO {
	
	private String result;
	private Session session;
	private MMessage mmessage = new MMessage();
	private Logging logging = new Logging();
	private HasPermission hasPermission = new HasPermission();
	//private UserCorporationid userCorporationid = new UserCorporationid();
	private SimpleDateFormat sformat = new SimpleDateFormat("yyyy-MM-dd");
	@Override
	public String change(Usersession usersession, int customerid) {
		HibernateUtil_new.closeSession();
		session = HibernateUtil_new.currentSession();
		session.beginTransaction();
		if(usersession.getUsername().equalsIgnoreCase("")){
			result = mmessage.notlogin;
		}else{
			int flag = 0;	
			Query q = session.createSQLQuery("select id from customer where status=1 and id="+ customerid +" and salerid=(select id from users where status=1 and account='"+ usersession.getUsername() +"')");
			if(q.list().isEmpty()){
				if(usersession.getUsername().equalsIgnoreCase("admin")){
					flag = 1;	
				}else{
					result = mmessage.nopermission;
				}
			}else{
				flag = 1;
			}
			if(flag == 1){
				List<Users> users = session.createSQLQuery("select * from users where status=1 and customerid="+ customerid).addEntity(Users.class).list();
				if(users.isEmpty()){
					result = mmessage.userinvalid;
				}else{
					if(users.get(0).getAuditstatus() == 1){
						users.get(0).setAuditstatus(0);
					}else{
						users.get(0).setAuditstatus(1);
						//send sms
						Smssending ss = new Smssending();
						ss.setContent(mmessage.accountstarted +"["+ mmessage.corporation +"]");
						ss.setCreatedate(new Date());
						ss.setPhoneno(users.get(0).getPhoneno());
						ss.setSendstatus(0);
						ss.setStatus(1);
						ss.setType(users.get(0).getType());
						session.save(ss);
					}
			        session.getTransaction().commit();	
			        result = mmessage.modifysuccess;					
				}				
			}						
		}
		HibernateUtil_new.closeSession();
		return result;
	}
}
