package com.mbusiness.impl;

import java.text.SimpleDateFormat;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;

import com.mbusiness.dao.UserChangepasswordDAO;
import com.mbusiness.model.Users;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Logging;
import com.mbusiness.util.MMessage;

public class UserChangepasswordImpl implements UserChangepasswordDAO {
	
	private String titleValid;
	private String result;
	private Session session;
	private MMessage mmessage = new MMessage();
	private Logging logging = new Logging();
	private HasPermission hasPermission = new HasPermission();
	//private UserCorporationid userCorporationid = new UserCorporationid();
	private SimpleDateFormat sformat = new SimpleDateFormat("yyyy-MM-dd");
	@Override
	public String change(Users user) {
		session = HibernateUtil_new.currentSession();
		session.beginTransaction();
		List<Object> o = session.createSQLQuery("select id from users where status=1 and (account='"+ user.getPhoneno() +"' or phoneno ='"+ user.getPhoneno() +"')").list();
		if(o.isEmpty()){
			result = mmessage.phonenoinvalid;			
		}else{
			List<Object> o2 = session.createSQLQuery("select id from randomcode where status=1 and code='"+ user.getZdy1() +"' and type=3 and phoneno='"+ user.getPhoneno() +"'").list();
			if(o2.isEmpty()){
				result = mmessage.randomcodeinvalid;
			}else{
				Query q0 = session.createSQLQuery("update users set password='"+ user.getPassword() +"' where id="+ o.get(0).toString());
				q0.executeUpdate();
				Query q = session.createSQLQuery("update randomcode set status=2,userid="+ o.get(0).toString() +" where id ="+ o2.get(0).toString());
				q.executeUpdate();
		        session.getTransaction().commit();	
		        result = mmessage.modifysuccess;
			}
		}
		HibernateUtil_new.closeSession();
		return result;
	}
}
