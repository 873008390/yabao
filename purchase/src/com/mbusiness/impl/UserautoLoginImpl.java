package com.mbusiness.impl;

import java.util.Date;
import java.util.List;

import org.hibernate.Session;

import com.mbusiness.dao.UserautoLoginDAO;
import com.mbusiness.model.Users;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Inputverify;
import com.mbusiness.util.Logging;
import com.mbusiness.util.MMessage;

public class UserautoLoginImpl implements UserautoLoginDAO{
		
	private Session ss;
	private String result;
	private List<Users> users;
	private MMessage mmessage = new MMessage();
	private Logging logging = new Logging();	
	private String ip = org.apache.struts2.ServletActionContext.getRequest().getRemoteAddr();
	private Inputverify inputverify = new Inputverify();

	@Override
	public String login(String idtype,String name) {	
		HibernateUtil_new.closeSession();
		ss = HibernateUtil_new.currentSession();
		ss.beginTransaction();
		if(inputverify.check(name) == -1){
			result = mmessage.usernameisnull;
		}else if(inputverify.check(name) == 0){
			result = mmessage.usernameillegal;
		}else if(inputverify.check(idtype) == -1){
			result = mmessage.passwordisnull;
		}else if(inputverify.check(idtype) == 0){
			result = mmessage.passwordillegal;
		}else{
			System.err.println("==="+ name);
			if(name.indexOf("_") == -1){
				result = mmessage.userinvalid;	
			}else{
			users = ss.createSQLQuery("select * from users where status=1 and account = '"+ name.split("_")[1] +"'").addEntity(Users.class).list();
				if(users.isEmpty()){				
					result = mmessage.userinvalid;	
				}else{
					if(users.get(0).getType() == 0 || users.get(0).getType() == 1){
						result = mmessage.loginsuccess +"_"+ users.get(0).getName();
					}else if(users.get(0).getType() == 2){
						if(name.split("_")[0].equalsIgnoreCase("2")){
							result = mmessage.loginsuccess +"_"+ users.get(0).getName();
						}else{
							result = mmessage.userinvalid;	
						}
					}else if(users.get(0).getType() == 4){
						if(name.split("_")[0].equalsIgnoreCase("4")){
							result = mmessage.loginsuccess +"_"+ users.get(0).getName();
						}else{
							result = mmessage.userinvalid;	
						}
					}else if(users.get(0).getType() == 3){
						if(name.split("_")[0].equalsIgnoreCase("3")){
							result = mmessage.loginsuccess +"_"+ users.get(0).getName();
						}else{
							result = mmessage.userinvalid;	
						}
					}else if(users.get(0).getType() == 6){
						if(name.split("_")[0].equalsIgnoreCase("4")){
							result = mmessage.loginsuccess +"_"+ users.get(0).getName();
						}else{
							result = mmessage.userinvalid;	
						}
					}else{
						result = mmessage.userinvalid;	
					}
					if(result.indexOf(mmessage.loginsuccess)>-1){
						users.get(0).setLastlogindate(new Date());
					}
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
