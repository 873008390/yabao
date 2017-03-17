package com.mbusiness.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.hibernate.Session;

import com.mbusiness.dao.GetuserinfoDAO;
import com.mbusiness.model.Users;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.MMessage;

public class GetuserinfoImpl implements GetuserinfoDAO{
		
	private List<Users> users;
	private Session session;
	private MMessage mmessage = new MMessage();
	//private int userlimit = 1000;
	private String result = "";

	@Override
	public List<Users> list(Usersession usersession) {		
		HibernateUtil_new.closeSession();
		session = HibernateUtil_new.currentSession();
		session.beginTransaction();
		users = new ArrayList<Users>();
		int flag = 1;		
		if(flag == 0){
			result = mmessage.stringillegal;
		}else{
			if(!usersession.getUsername().equalsIgnoreCase("")){
				List<Object[]> o = session.createSQLQuery("select phoneno,name,provinceid,cityid,addressdetail from customer where id in(select customerid from users where status=1 and account='"+ usersession.getUsername() +"')").list();
				if(!o.isEmpty()){
					String province = "";
					if(!o.get(0)[2].toString().equalsIgnoreCase("0")){
						List<Object> o1 = session.createSQLQuery("select name from province where id="+ o.get(0)[2].toString()).list();
						if(!o1.isEmpty()){
							province = o1.get(0).toString();
						}
					}
					String city = "";
					if(!o.get(0)[3].toString().equalsIgnoreCase("0")){
						List<Object> o1 = session.createSQLQuery("select name from city where id="+ o.get(0)[3].toString()).list();
						if(!o1.isEmpty()){
							city = o1.get(0).toString();
						}
					}
					String addressdetail = "";
					if(o.get(0)[4] != null){
						addressdetail = o.get(0)[4].toString();
					}
					Users u = new Users();
					u.setId(1);
					u.setPhoneno(o.get(0)[0].toString());
					u.setName(o.get(0)[1].toString());
					u.setSaleaddress(province+city+addressdetail);
					users.add(u);
				}
			}
		}
		
		if(users.isEmpty()){
			Users u = new Users();
			u.setId(0);
			u.setAccount("");
			u.setCreatedate(new Date());
			u.setName(result);
			u.setZdy1("1");
			u.setZdy2("");
			u.setPassword("");
			users.add(u);
		}
		HibernateUtil_new.closeSession();
		return users;
	}
}
