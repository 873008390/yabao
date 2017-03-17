package com.mbusiness.impl;

import java.util.Date;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;

import com.mbusiness.dao.UserRegisterDAO;
import com.mbusiness.model.Customer;
import com.mbusiness.model.Permission;
import com.mbusiness.model.Permissiongroup;
import com.mbusiness.model.Smssending;
import com.mbusiness.model.Users;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.MMessage;
import com.mbusiness.util.SendMail;

public class UserRegisterImpl implements UserRegisterDAO {
	
	private String titleValid;
	private String result;
	private Session session;
	private MMessage mmessage = new MMessage();
	//private UserCorporationid userCorporationid = new UserCorporationid();
	private int auditstatus = 0;
	@Override
	public String add(Users user) {
		HibernateUtil_new.closeSession();
		session = HibernateUtil_new.currentSession();
		session.beginTransaction();
		if(1==0){
		//if(auditstatus == 0 && user.getZdy2().equalsIgnoreCase("")){
			result = mmessage.tjrnotnull;
		}else{
			if(user.getZdy2() == null){
				user.setZdy2("");
			}
			int salerid = 0;
			String salerphoneno = "";
			String sql = " and (name='"+ user.getZdy2() +"' or phoneno='"+ user.getZdy2() +"')";
			if(!user.getZdy2().equalsIgnoreCase("")){				
				if(user.getZdy2().indexOf("_") > -1 && user.getZdy2().split("_")[0].equalsIgnoreCase("selfaccount")){
					sql = " and account='"+ user.getZdy2().split("_")[1] +"'";
					
				}else if(user.getZdy2().indexOf("_") > -1 && user.getZdy2().split("_")[0].equalsIgnoreCase("inviteaccount")){
					if(user.getZdy2().split("_").length>1){
						sql = " and account='"+ user.getZdy2().split("_")[1] +"'";
					}
				}
				List<Object[]> o1 = session.createSQLQuery("select id,phoneno from users where status=1 "+ sql).list();
				if(!o1.isEmpty()){
					salerid = Integer.parseInt(o1.get(0)[0].toString());
					salerphoneno = o1.get(0)[1].toString();
				}
			}		
			if(user.getType() == 4 || user.getType() == 5){
				auditstatus = 1;
			}
			if(auditstatus == 0 && salerid == 0 && !user.getZdy2().equalsIgnoreCase("")){
				result = mmessage.salerinvalid;
			}else{
				List<Object> o = session.createSQLQuery("select id from users where status=1 and (account='"+ user.getPhoneno() +"' or phoneno ='"+ user.getPhoneno() +"')").list();
				if(!o.isEmpty()){
					result = mmessage.phonenoregistered;			
				}else{
					List<Object> o2 = session.createSQLQuery("select id from randomcode where status=1 and code='"+ user.getZdy1() +"' and type=1 and phoneno='"+ user.getPhoneno() +"'").list();
					if(o2.isEmpty()){
						result = mmessage.randomcodeinvalid;
					}else{
						//insert into customer
						int customerid =0;
						List<Customer> cs = session.createSQLQuery("select * from customer where status=1 and type="+ user.getType() +" and phoneno='"+ user.getPhoneno() +"'").addEntity(Customer.class).list();
						if(cs.isEmpty()){
							Customer c = new Customer();
							c.setCityid(0);
							c.setCreatedate(new Date());
							String no = "";
							String noname = "agentno";
							if(user.getType() == 2){
								noname = "doctorno";
							}else if(user.getType() == 3){
								noname = "drugstoreno";
							}else if(user.getType() == 4){
								noname = "patientno";
							}else if(user.getType() == 5){
								noname = "hospitalno";
							}else if(user.getType() == 6){
								noname = "sharerno";
							}
							int loopnum = 0;
							while(true){
								List<Object> o9 = session.createSQLQuery("select nextval('"+ noname +"')").list();
								if(!o9.isEmpty()){
									Query q = session.createSQLQuery("select id from customer where status=1 and type="+ user.getType() +" and customerno='"+ o9.get(0).toString() +"'");
									if(q.list().isEmpty()){
										no = o9.get(0).toString();
										break;
									}else{
										loopnum += 1;
										if(loopnum > 50){
											break;
										}
									}
								}else{
									loopnum += 1;
									if(loopnum > 50){
										break;
									}
								}
							}
							c.setCustomerno(no);
							c.setHospitalid(0);
							c.setManageruserid(0);
							c.setName(user.getPhoneno());
							c.setPhoneno(user.getPhoneno());
							c.setProvinceid(0);
							c.setSalerid(salerid);
							c.setStatus(1);
							c.setTel("");
							c.setTownid(0);
							c.setType(user.getType());
							c.setUppercustomerid(0);
							c.setAddressdetail("");
							session.save(c);
					        session.getTransaction().commit();	
							HibernateUtil_new.closeSession();
							session = HibernateUtil_new.currentSession();
							session.beginTransaction();
							
							List<Object> o4 = session.createSQLQuery("select id from customer where status=1 and type="+ user.getType() +" and phoneno='"+ user.getPhoneno() +"'").list();
							customerid = Integer.parseInt(o4.get(0).toString());
						}else{
							customerid = cs.get(0).getId();
						}
						//insert into user
						Users s = new Users();
						s.setAccount(user.getPhoneno());
						s.setCreatedate(new Date());
						s.setIslimittime(0);
						s.setName(user.getPhoneno());
						s.setPassword(user.getPassword());
						s.setPhoneno(user.getPhoneno());
						s.setStatus(1);
						s.setTel("");
						s.setCustomerid(customerid);
						s.setType(user.getType());
						s.setAuditstatus(auditstatus);
						s.setSalestatus(0);
						s.setServicestatus(0);
						session.save(s);
				        session.getTransaction().commit();	
				        if(auditstatus == 1){
				        	result = mmessage.registersuccess;		
				        }else{
				        	result = mmessage.registersuccess +"，"+ mmessage.saleraudit;
				        }
						//update randomcode
						HibernateUtil_new.closeSession();
						session = HibernateUtil_new.currentSession();
						session.beginTransaction();
						List<Object> o3 = session.createSQLQuery("select id from users where status=1 and account='"+ user.getPhoneno() +"'").list();
						Query q = session.createSQLQuery("update randomcode set status=2,userid="+ o3.get(0).toString() +" where id ="+ o2.get(0).toString());
						q.executeUpdate();
						
				        session.getTransaction().commit();	
						
						//set permission
				        HibernateUtil_new.closeSession();
						session = HibernateUtil_new.currentSession();
						session.beginTransaction();
						String grouptype = "";
						if(user.getType() == 0){
							grouptype = "corp";
						}else if(user.getType() == 1){
							grouptype = "saler";
						}else if(user.getType() == 2){
							grouptype = "doctor";
						}else if(user.getType() == 3){
							grouptype = "drugstore";
						}else if(user.getType() == 4){
							grouptype = "patient";
						}
						List<Permissiongroup> pgs = session.createSQLQuery("select * from permissiongroup where status=1 and type='"+ grouptype +"'").addEntity(Permissiongroup.class).list();
						if(!pgs.isEmpty()){
							for(int i=0;i<pgs.size();i++){
								Permission p = new Permission();
								p.setAdddata(pgs.get(i).getAdddata());
								p.setDeletedata(pgs.get(i).getDeletedata());
								p.setModifydata(pgs.get(i).getModifydata());
								p.setPermission(pgs.get(i).getPermission());
								p.setSearchdata(pgs.get(i).getSearchdata());
								p.setStatus(1);
								p.setType("catalog");
								p.setUploaddata(pgs.get(i).getUploaddata());
								p.setUserid(Integer.parseInt(o3.get(0).toString()));
								session.save(p);
								session.getTransaction().commit();
								if(i < (pgs.size() -1)){
							        HibernateUtil_new.closeSession();
									session = HibernateUtil_new.currentSession();
									session.beginTransaction();
								}
							}
						}
						//sendsms
						HibernateUtil_new.closeSession();
						session = HibernateUtil_new.currentSession();
						session.beginTransaction();
						Smssending ss = new Smssending();
						String type = "";
						if(user.getType() == 2){
							type = "医生:";
						}else if(user.getType() == 4){
							type = "患者:";
						}
						ss.setContent(mmessage.registersuccess +"["+ type +""+ user.getPhoneno() +"]");
						ss.setCreatedate(new Date());
						if(salerphoneno.equalsIgnoreCase("")){
							ss.setPhoneno(mmessage.adminphoneno);
						}else{
							ss.setPhoneno(salerphoneno);
						}
						ss.setSendstatus(0);
						ss.setStatus(1);
						ss.setType(3);
						session.save(ss);
						
						session.getTransaction().commit();
						HibernateUtil_new.closeSession();
						session = HibernateUtil_new.currentSession();
						session.beginTransaction();
						ss = new Smssending();
						ss.setContent("您已"+ mmessage.registersuccess +"，请加管理员微信领红包。谢谢！");
						ss.setCreatedate(new Date());
						ss.setPhoneno(user.getPhoneno());
						ss.setSendstatus(0);
						ss.setStatus(1);
						ss.setType(3);
						session.save(ss);
						
						session.getTransaction().commit();
						HibernateUtil_new.closeSession();
						session = HibernateUtil_new.currentSession();
						session.beginTransaction();
						SendMail sm = new SendMail();
						sm.send(session, "",mmessage.registersuccess +"["+ type +""+ user.getPhoneno() +"]", 1);
					}
				}
			}
		}
		HibernateUtil_new.closeSession();
		return result;
	}
}
