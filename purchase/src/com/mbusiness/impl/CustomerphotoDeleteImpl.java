package com.mbusiness.impl;

import java.text.SimpleDateFormat;
import java.util.List;

import org.hibernate.Session;

import com.mbusiness.dao.CustomerphotoDeleteDAO;
import com.mbusiness.model.Customerphoto;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Logging;
import com.mbusiness.util.MMessage;

public class CustomerphotoDeleteImpl implements CustomerphotoDeleteDAO {
	
	private String result;
	private Session session;
	private MMessage mmessage = new MMessage();
	private Logging logging = new Logging();
	private HasPermission hasPermission = new HasPermission();
	//private CustomerphotoCorporationid customerphotoCorporationid = new CustomerphotoCorporationid();
	private SimpleDateFormat sformat = new SimpleDateFormat("yyyy-MM-dd");
	@Override
	public String delete(Usersession usersession, int customerphotoid) {
		session = HibernateUtil_new.currentSession();
		session.beginTransaction();
		if(usersession.getUsername().equalsIgnoreCase("")){
			result = mmessage.notlogin;
		}else{
			int flag = 0;		
			if(hasPermission.hasPermission(usersession.getUsername(), "customer", "deletedata", session) == 0){
				if(usersession.getUsername().equalsIgnoreCase("admin")){
					flag = 1;	
				}else{
					List<Object> o = session.createSQLQuery("select customerid from customerphoto where id="+ customerphotoid +" and customerid=(select customerid from users where status=1 and account='"+ usersession.getUsername() +"')").list();
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
				List<Customerphoto> customerphotos = session.createSQLQuery("select * from customerphoto where status=1 and id="+ customerphotoid).addEntity(Customerphoto.class).list();
				if(customerphotos.isEmpty()){
					result = mmessage.customerphotoinvalid;
				}else{
					customerphotos.get(0).setStatus(0);
			        session.getTransaction().commit();	
			        result = mmessage.deletesuccess;
				}				
			}						
		}
		HibernateUtil_new.closeSession();
		return result;
	}
}
