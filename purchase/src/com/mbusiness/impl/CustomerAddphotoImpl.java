package com.mbusiness.impl;

import java.util.Date;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.mbusiness.dao.CustomerAddphotoDAO;
import com.mbusiness.model.Customerphoto;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.CheckPhoneno;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Inputverify;
import com.mbusiness.util.MMessage;

public class CustomerAddphotoImpl implements CustomerAddphotoDAO {
	
	private String result;
	private Session session;
	private MMessage mmessage = new MMessage();
	private Inputverify inputverify = new Inputverify();
	private HasPermission hasPermission = new HasPermission();
	//private CustomerCorporationid customerCorporationid = new CustomerCorporationid();
	@Override
	public String add(Usersession usersession, Customerphoto customerphoto) {
		HibernateUtil_new.closeSession();
		session = HibernateUtil_new.currentSession();
		session.beginTransaction();
		int flag = 1;			
		if(customerphoto.getZdy1() != null){
			flag = inputverify.check(customerphoto.getZdy1());
		}else if(customerphoto.getZdy2() != null){
			flag = inputverify.check(customerphoto.getZdy2());
		}else if(customerphoto.getZdy3() != null){
			flag = inputverify.check(customerphoto.getZdy3());
		}else if(customerphoto.getZdy4() != null){
			flag = inputverify.check(customerphoto.getZdy4());
		}else if(customerphoto.getZdy5() != null){
			flag = inputverify.check(customerphoto.getZdy5());
		}else if(customerphoto.getZdy6() != null){
			flag = inputverify.check(customerphoto.getZdy6());
		}else if(customerphoto.getZdy7() != null){
			flag = inputverify.check(customerphoto.getZdy7());
		}else if(customerphoto.getZdy8() != null){
			flag = inputverify.check(customerphoto.getZdy8());
		}else if(customerphoto.getZdy9() != null){
			flag = inputverify.check(customerphoto.getZdy9());
		}else if(customerphoto.getZdy10() != null){
			flag = inputverify.check(customerphoto.getZdy10());
		}
		if(flag != 1){
			result = mmessage.dataillegal;
		}else{
			if(customerphoto.getId() == 0){
				if(customerphoto.getZdy10().indexOf("_=_") == -1){
					if(customerphoto.getType() == 1){
						List<Customerphoto> cp = session.createSQLQuery("select * from customerphoto where status=1 and customerid="+ customerphoto.getCustomerid() +" and type=1").addEntity(Customerphoto.class).list();
						if(cp.isEmpty()){
							customerphoto.setCreatedate(new Date());
							customerphoto.setStatus(1);
							customerphoto.setAddress("");
							customerphoto.setIdcard("");
							customerphoto.setMemo("");
							customerphoto.setPhoneno("");
							customerphoto.setUrl("");
							customerphoto.setUsername("");
							customerphoto.setWxserverid(customerphoto.getZdy10());
							customerphoto.setZdy10("");
							session.save(customerphoto);
							result = mmessage.savesuccess;
							session.getTransaction().commit();
						}else{
							cp.get(0).setWxserverid(customerphoto.getZdy10());
							cp.get(0).setUrl("");
							result = mmessage.savesuccess;
							session.getTransaction().commit();
						}
					}else{
						customerphoto.setCreatedate(new Date());
						customerphoto.setStatus(1);
						customerphoto.setAddress("");
						customerphoto.setIdcard("");
						customerphoto.setMemo("");
						customerphoto.setPhoneno("");
						customerphoto.setUrl("");
						customerphoto.setUsername("");
						customerphoto.setWxserverid(customerphoto.getZdy10());
						customerphoto.setZdy10("");
						session.save(customerphoto);
						result = mmessage.savesuccess;
						session.getTransaction().commit();
					}
				}else{
					int len = customerphoto.getZdy10().split("_=_").length;
					if(customerphoto.getType() == 1){						
						List<Customerphoto> cp = session.createSQLQuery("select * from customerphoto where status=1 and customerid="+ customerphoto.getCustomerid() +" and type=1").addEntity(Customerphoto.class).list();
						if(cp.isEmpty()){
							Customerphoto a = new Customerphoto();
							a.setCreatedate(new Date());
							a.setCustomerid(customerphoto.getCustomerid());
							a.setStatus(1);
							a.setAddress("");
							a.setIdcard("");
							a.setMemo("");
							a.setPhoneno("");
							a.setUrl("");
							a.setUsername("");
							a.setWxserverid(customerphoto.getZdy10().split("_=_")[len-1]);
							a.setZdy10("");
							session.save(a);
							result = mmessage.savesuccess;
							session.getTransaction().commit();
						}else{
							cp.get(0).setWxserverid(customerphoto.getZdy10().split("_=_")[len-1]);
							cp.get(0).setUrl("");
							result = mmessage.savesuccess;
							session.getTransaction().commit();
						}
					}else{
						for(int i=0;i<len;i++){
							Customerphoto a = new Customerphoto();
							a.setCreatedate(new Date());
							a.setCustomerid(customerphoto.getCustomerid());
							a.setStatus(1);
							a.setAddress("");
							a.setIdcard("");
							a.setMemo("");
							a.setPhoneno("");
							a.setUrl("");
							a.setUsername("");
							a.setWxserverid(customerphoto.getZdy10().split("_=_")[i]);
							a.setZdy10("");
							session.save(a);
							result = mmessage.savesuccess;
							session.getTransaction().commit();
							if(i<(len-1)){
								HibernateUtil_new.closeSession();
								session = HibernateUtil_new.currentSession();
								session.beginTransaction();
							}
						}
					}
				}
				//update customer
				HibernateUtil_new.closeSession();
				session = HibernateUtil_new.currentSession();
				session.beginTransaction();
				Query q = session.createSQLQuery("update customer set photonum=(select count(id) from customerphoto where status=1 and customerid="+ customerphoto.getCustomerid() +") where id="+ customerphoto.getCustomerid());
				q.executeUpdate();
				session.getTransaction().commit();
			}else{
				String details = customerphoto.getZdy10();			
				customerphoto.setZdy10("");
				flag = 0;
				if(hasPermission.hasPermission(usersession.getUsername(), "customer", "adddata", session) == 0){
					if(usersession.getUsername().equalsIgnoreCase("admin")){
						flag = 1;	
					}else{
						result = mmessage.nopermission;
					}
				}else{
					flag = 1;
				}
				if(flag == 1){						
					Gson gson = new Gson();
					List<Customerphoto> ps = gson.fromJson("["+ details +"]", new TypeToken<List<Customerphoto>>(){}.getType());
					//System.out.println("========"+details);
					for(int i=0;i<ps.size();i++){
						HibernateUtil_new.closeSession();
						session = HibernateUtil_new.currentSession();
						session.beginTransaction();
						if(ps.get(i).getPhoneno() != null && !ps.get(i).getPhoneno().equalsIgnoreCase("")){
							CheckPhoneno cp = new CheckPhoneno();
							if(cp.check(ps.get(i).getPhoneno())){
								List<Customerphoto> as = session.createSQLQuery("select * from customerphoto where id="+ ps.get(i).getId()).addEntity(Customerphoto.class).list();
								if(!as.isEmpty()){
									as.get(0).setAddress(ps.get(i).getAddress());
									as.get(0).setIdcard(ps.get(i).getIdcard());
									as.get(0).setMemo(ps.get(i).getMemo());
									as.get(0).setPhoneno(ps.get(i).getPhoneno());
									as.get(0).setUsername(ps.get(i).getUsername());
									session.getTransaction().commit();
									result = mmessage.savesuccess;
								}else{
									result = mmessage.datachange;
									break;
								}
							}else{
								result = mmessage.phonenoinvalid;
							}
						}else{
							List<Customerphoto> as = session.createSQLQuery("select * from customerphoto where id="+ ps.get(i).getId()).addEntity(Customerphoto.class).list();
							if(!as.isEmpty()){
								as.get(0).setAddress(ps.get(i).getAddress());
								as.get(0).setIdcard(ps.get(i).getIdcard());
								as.get(0).setMemo(ps.get(i).getMemo());
								as.get(0).setPhoneno(ps.get(i).getPhoneno());
								as.get(0).setUsername(ps.get(i).getUsername());
								session.getTransaction().commit();
								result = mmessage.savesuccess;
							}else{
								result = mmessage.datachange;
								break;
							}
						}
					}
				}
			}
		}
		HibernateUtil_new.closeSession();
		return result;
	}
}
