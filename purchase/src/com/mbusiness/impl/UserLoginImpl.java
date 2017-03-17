package com.mbusiness.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.hibernate.Session;

import com.mbusiness.dao.UserLoginDAO;
import com.mbusiness.model.Users;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Inputverify;
import com.mbusiness.util.Logging;
import com.mbusiness.util.MMessage;

public class UserLoginImpl implements UserLoginDAO{
		
	private Session ss;
	private String result;
	private List<Users> users = new ArrayList<Users>();
	private MMessage mmessage = new MMessage();
	private Logging logging = new Logging();	
	private String ip = org.apache.struts2.ServletActionContext.getRequest().getRemoteAddr();
	private Inputverify inputverify = new Inputverify();

	@Override
	public String login(String name,String password, int corporationid, String from) {	
		HibernateUtil_new.closeSession();
		ss = HibernateUtil_new.currentSession();
		ss.beginTransaction();
		if(inputverify.check(name) == -1){
			result = mmessage.usernameisnull;
		}else if(inputverify.check(name) == 0){
			result = mmessage.usernameillegal;
		}else if(inputverify.check(password) == -1){
			result = mmessage.passwordisnull;
		}else if(inputverify.check(password) == 0){
			result = mmessage.passwordillegal;
		}else{
			users = ss.createSQLQuery("select * from users where status=1 and (account = '"+ name +"' or phoneno ='"+ name +"')").addEntity(Users.class).list();
			if(users.isEmpty()){				
				result = mmessage.userinvalid;	
			}else{
				String account = "";
				if(users.get(0).getPassword().equalsIgnoreCase(password)){
					account = "_"+ users.get(0).getAccount();
					result = mmessage.loginsuccess +"_"+ users.get(0).getName() + account;
				}else{
					result = mmessage.userinvalid;
				}
				if(result.indexOf(mmessage.loginsuccess)>-1){
					users.get(0).setLastlogindate(new Date());
				}
			}
		}			
		if(!users.isEmpty()){
			logging.log(users.get(0).getId(), "login", "login success", ip, ss);
		}else{
			logging.log(0, "login", "login error", ip, ss);
		}
		ss.getTransaction().commit();
		HibernateUtil_new.closeSession();
		return result;
	} 
}
