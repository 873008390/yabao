package com.mbusiness.impl;

import java.util.Date;
import java.util.List;

import org.hibernate.Session;

import com.mbusiness.dao.UserGetrandomcodeDAO;
import com.mbusiness.model.Randomcode;
import com.mbusiness.model.Smssending;
import com.mbusiness.model.Users;
import com.mbusiness.util.CheckPhoneno;
import com.mbusiness.util.GenRandomString;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Inputverify;
import com.mbusiness.util.Logging;
import com.mbusiness.util.MMessage;

public class UserGetrandomcodeImpl implements UserGetrandomcodeDAO{
		
	private Session ss;
	private String result;
	private List<Users> users;
	private MMessage mmessage = new MMessage();
	private Logging logging = new Logging();	
	private String ip = org.apache.struts2.ServletActionContext.getRequest().getRemoteAddr();
	private Inputverify inputverify = new Inputverify();

	@Override
	public String get(String phoneno,String idtype, String typeid) {	
		HibernateUtil_new.closeSession();
		ss = HibernateUtil_new.currentSession();
		ss.beginTransaction();
		if(inputverify.check(phoneno) < 1){
			result = mmessage.dataillegal;
		}else if(inputverify.check(idtype) < 1){
			result = mmessage.dataillegal;
		}else if(inputverify.check(typeid) < 1){
			result = mmessage.dataillegal;
		}else{
			CheckPhoneno cp = new CheckPhoneno();
			if(!cp.check(phoneno)){
				result = mmessage.phonenoinvalid;
			}else{
				int flag = 0;
				List<Object> o0 = ss.createSQLQuery("select id from blacklist where status=1 and phoneno='"+ phoneno +"'").list();
				if(!o0.isEmpty()){
					result = mmessage.requestlimit +"[0]";					
				}else{
					List<Object> o = ss.createSQLQuery("select id from smssending where status=1 and phoneno='"+ phoneno +"' and DATE_ADD(createdate,INTERVAL 5 SECOND)>NOW() order by -id limit 0,1").list();
					if(o.isEmpty()){
						if(idtype.equalsIgnoreCase("register")){
							List<Object> o00 = ss.createSQLQuery("select id from users where status=1 and phoneno='"+ phoneno +"'").list();
							if(!o00.isEmpty()){
								result = mmessage.phonenoregistered;
							}else{
								flag = 1;
							}
						}else{
							flag = 1;
						}
					}else{
						result = mmessage.requestlimit;
					}
				}
				if(flag == 1){
					int type = 1;
					GenRandomString grs = new GenRandomString();			
					String code =grs.getSigncode(4);
					Randomcode r = new Randomcode();
					r.setCode(code);
					r.setCreatedate(new Date());
					r.setStatus(1);
					r.setUserid(0);
					r.setIp(ip);
					r.setPhoneno(phoneno);
					if(idtype.equalsIgnoreCase("register")){
						r.setType(1);
					}else if(idtype.equalsIgnoreCase("login")){
						r.setType(2);
					}else if(idtype.equalsIgnoreCase("changepassword")){
						r.setType(3);
					}else if(idtype.equalsIgnoreCase("baoming")){
						r.setType(4);
					}
					ss.save(r);
					
					//sendsms
					Smssending smss = new Smssending();
					smss.setContent("您的验证码是："+ code +"["+ mmessage.corporation +"]");
					smss.setCreatedate(new Date());
					smss.setPhoneno(phoneno);
					smss.setSendstatus(0);
					smss.setStatus(1);
					smss.setType(type);
					ss.save(smss);
					
					ss.getTransaction().commit();
					result = mmessage.sendsuccess;
				}
			}
		}			
		
		HibernateUtil_new.closeSession();
		return result;
	} 
}
