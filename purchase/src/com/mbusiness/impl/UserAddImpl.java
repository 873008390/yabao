package com.mbusiness.impl;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.hibernate.Session;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.mbusiness.dao.UserAddDAO;
import com.mbusiness.model.Permission;
import com.mbusiness.model.Permissiongroup;
import com.mbusiness.model.Smssending;
import com.mbusiness.model.Users;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Logging;
import com.mbusiness.util.MMessage;
import com.mbusiness.util.StatusTranslation;

public class UserAddImpl implements UserAddDAO {
	
	private String titleValid;
	private String result;
	private Session session;
	private MMessage mmessage = new MMessage();
	private Logging logging = new Logging();
	private HasPermission hasPermission = new HasPermission();
	//private UserCorporationid userCorporationid = new UserCorporationid();
	private SimpleDateFormat sformat = new SimpleDateFormat("yyyy-MM-dd");
	@Override
	public String add(Usersession usersession, Users user) {
		session = HibernateUtil_new.currentSession();
		session.beginTransaction();
		if(usersession.getUsername().equalsIgnoreCase("")){
			result = mmessage.notlogin;
		}else{
			int flag = 0;		
			if(hasPermission.hasPermission(usersession.getUsername(), "user", "adddata", session) == 0){
				if(usersession.getUsername().equalsIgnoreCase("admin")){
					flag = 1;	
				}else{
					result = mmessage.nopermission;
				}
			}else{
				flag = 1;
			}
			if(flag == 1){
				int id = 0;				
				String details = user.getZdy10();
				
				user.setZdy10("");
				//System.out.println("========"+details);
				
				Gson gson = new Gson();
				List<Users> ps = gson.fromJson("["+ details +"]", new TypeToken<List<Users>>(){}.getType());
				Users s;
				//System.out.println("========"+details);
				for(int i=0;i<ps.size();i++){
					if(ps.get(i).getId() != 0){
						id = ps.get(i).getId();
					}
					HibernateUtil_new.closeSession();
					session = HibernateUtil_new.currentSession();
					session.beginTransaction();
					int type = 0;
					List<Object> o0 = session.createSQLQuery("select value from keyvalue where status=1 and type=1 and keyname='"+ ps.get(i).getZdy3() +"'").list();
					if(o0.isEmpty()){
						result = mmessage.typeerror +"["+ ps.get(i).getZdy3() +"]";
						break;
					}else{
						type = Integer.parseInt(o0.get(0).toString());
					}
					int supplierid = 0;
					int orgid = 0;
					if(type == 2){
						List<Object[]> o1 = session.createSQLQuery("select id,type from supplier where status=1 and name='"+ ps.get(i).getZdy7()+"'").list();
						if(o1.isEmpty()){
							result = mmessage.supplierinvalid +"["+ ps.get(i).getZdy7() +"]";
							break;
						}else{
							supplierid = Integer.parseInt(o1.get(0)[0].toString());
						}
					}else{
						if(!usersession.getUsername().equalsIgnoreCase("admin")){
							List<Object> o1 = session.createSQLQuery("select orgid from users where status=1 and account='"+ usersession.getUsername() +"'").list();
							if(o1.isEmpty()){
								result = mmessage.orginvalid +"["+ usersession.getUsername() +"]";
								break;
							}else{
								orgid = Integer.parseInt(o1.get(0).toString());
							}
						}else{
							List<Object> o1 = session.createSQLQuery("select id from org where status=1 and name='"+ ps.get(i).getZdy8() +"'").list();
							if(o1.isEmpty()){
								result = mmessage.orginvalid +"["+ ps.get(i).getZdy8() +"]";
								break;
							}else{
								orgid = Integer.parseInt(o1.get(0).toString());
							}
						}
					}
					if(ps.get(i).getId() == 0){
						if(ps.get(i).getPhoneno() != null && !ps.get(i).getPhoneno().equalsIgnoreCase("")){
							List<Object> o2 = session.createSQLQuery("select id from users where status=1 and (phoneno='"+ ps.get(i).getPhoneno() +"' or account='"+ ps.get(i).getPhoneno() +"')").list();
							if(!o2.isEmpty()){
								result = mmessage.phonenoduplicate +"["+ ps.get(i).getAccount() +"]";
								break;
							}
						}
						List<Object> o = session.createSQLQuery("select id from users where status=1 and (account='"+ ps.get(i).getAccount() +"' or phoneno='"+ ps.get(i).getAccount() +"')").list();
						if(!o.isEmpty()){
							result = mmessage.accountduplicate +"["+ ps.get(i).getAccount() +"]";
							break;
						}
						List<Object> o3 = session.createSQLQuery("select id from users where status=1 and name='"+ ps.get(i).getName() +"'").list();
						if(!o3.isEmpty()){
							result = mmessage.usernameduplicate +"["+ ps.get(i).getAccount() +"]";
							break;
						}
						s = new Users();
						s.setAccount(ps.get(i).getAccount());
						s.setCreatedate(new Date());
						s.setIslimittime(0);
						s.setName(ps.get(i).getName());
						s.setPassword(ps.get(i).getPassword());
						s.setPhoneno(ps.get(i).getPhoneno());
						s.setStatus(1);
						s.setTel(ps.get(i).getTel());
						s.setSupplierid(supplierid);
						s.setType(type);
						s.setOrgid(orgid);
						s.setAuditstatus(ps.get(i).getAuditstatus());
						s.setSaleaddress("");
						s.setSalestatus(0);
						s.setServicestatus(0);
						s.setServiceno("");
						session.save(s);
				        session.getTransaction().commit();	
				        
				        
				        //set permission
				       HibernateUtil_new.closeSession();
						session = HibernateUtil_new.currentSession();
						session.beginTransaction();
						List<Object> o4 = session.createSQLQuery("select id from users where status=1 and account='"+ ps.get(i).getAccount() +"'").list();
						List<Permissiongroup> pgs = session.createSQLQuery("select * from permissiongroup where status=1 and type='inner'").addEntity(Permissiongroup.class).list();
						if(!pgs.isEmpty()){
							for(int j=0;j<pgs.size();j++){
								Permission p = new Permission();
								p.setAdddata(pgs.get(j).getAdddata());
								p.setDeletedata(pgs.get(j).getDeletedata());
								p.setModifydata(pgs.get(j).getModifydata());
								p.setPermission(pgs.get(j).getPermission());
								p.setSearchdata(pgs.get(j).getSearchdata());
								p.setStatus(1);
								p.setType("catalog");
								p.setUploaddata(pgs.get(j).getUploaddata());
								p.setUserid(Integer.parseInt(o4.get(0).toString()));
								session.save(p);
								session.getTransaction().commit();
								if(j < (pgs.size() -1)){
							        HibernateUtil_new.closeSession();
									session = HibernateUtil_new.currentSession();
									session.beginTransaction();
								}
							}
						}
						result = mmessage.savesuccess;	
					}else{
						if(ps.get(i).getPhoneno() != null && !ps.get(i).getPhoneno().equalsIgnoreCase("")){
							List<Object> o2 = session.createSQLQuery("select id from users where status=1 and (phoneno='"+ ps.get(i).getPhoneno() +"' or account='"+ ps.get(i).getPhoneno() +"') and id<>"+ ps.get(i).getId() +"").list();
							if(!o2.isEmpty()){
								result = mmessage.phonenoduplicate +"["+ ps.get(i).getAccount() +"]";
								break;
							}
						}
						List<Object> o = session.createSQLQuery("select id from users where status=1 and (account='"+ ps.get(i).getAccount() +"' or phoneno='"+ ps.get(i).getAccount() +"') and id<>"+ ps.get(i).getId()).list();
						if(!o.isEmpty()){
							result = mmessage.accountduplicate +"["+ ps.get(i).getAccount() +"]";
							break;
						}
						List<Users> users = session.createSQLQuery("select * from users where status=1 and id="+ ps.get(i).getId()).addEntity(Users.class).list();
						if(users.isEmpty()){
							result = mmessage.datachange +"["+ ps.get(i).getAccount() +"]";
							break;
						}
						List<Object> o3 = session.createSQLQuery("select id from users where status=1 and name='"+ ps.get(i).getName() +"' and id<>"+ ps.get(i).getId()).list();
						if(!o3.isEmpty()){
							result = mmessage.usernameduplicate +"["+ ps.get(i).getAccount() +"]";
							break;
						}
						if(type==2){
							users.get(0).setSupplierid(supplierid);
						}else{
							users.get(0).setOrgid(orgid);
						}
						users.get(0).setName(ps.get(i).getName());
						if(!ps.get(i).getPassword().equalsIgnoreCase("****")){
							users.get(0).setPassword(ps.get(i).getPassword());
						}
						users.get(0).setPhoneno(ps.get(i).getPhoneno());
						users.get(0).setTel(ps.get(i).getTel());
						users.get(0).setType(type);
						users.get(0).setAccount(ps.get(i).getAccount());
						
				        session.getTransaction().commit();	
				        result = mmessage.savesuccess;	
					}				
				}				
			}
		}
		HibernateUtil_new.closeSession();
		return result;
	}
}
