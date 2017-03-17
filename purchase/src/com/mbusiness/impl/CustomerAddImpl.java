package com.mbusiness.impl;

import java.util.Date;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.mbusiness.dao.CustomerAddDAO;
import com.mbusiness.model.Customer;
import com.mbusiness.model.Permission;
import com.mbusiness.model.Permissiongroup;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Logging;
import com.mbusiness.util.MMessage;

public class CustomerAddImpl implements CustomerAddDAO {
	
	private String titleValid;
	private String result;
	private Session session;
	private MMessage mmessage = new MMessage();
	private Logging logging = new Logging();
	private HasPermission hasPermission = new HasPermission();
	//private CustomerCorporationid customerCorporationid = new CustomerCorporationid();
	@Override
	public String add(Usersession usersession, Customer customer) {
		session = HibernateUtil_new.currentSession();
		session.beginTransaction();
		if(usersession.getUsername().equalsIgnoreCase("")){
			result = mmessage.notlogin;
		}else{
			int flag = 0;		
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
				String details = customer.getZdy10();
				
				customer.setZdy10("");
				//System.out.println("========"+details);
				
				Gson gson = new Gson();
				List<Customer> ps = gson.fromJson("["+ details +"]", new TypeToken<List<Customer>>(){}.getType());
				Customer s;
				int oldmanageruserid = 0;
				//System.out.println("========"+details);
				for(int i=0;i<ps.size();i++){
					HibernateUtil_new.closeSession();
					session = HibernateUtil_new.currentSession();
					session.beginTransaction();
					int provinceid = 0;
					List<Object> o = session.createSQLQuery("select id from province where status=1 and name='"+ ps.get(i).getZdy3()+"'").list();
					if(o.isEmpty()){
						if(ps.get(i).getType() != 6){
							result = mmessage.provinceinvalid +"["+ ps.get(i).getName() +"]";
							break;
						}
					}else{
						provinceid = Integer.parseInt(o.get(0).toString());
					}
					int manageruserid = 0;
					List<Object[]> o1 = session.createSQLQuery("select id,customerid from users where status=1 and name='"+ ps.get(i).getZdy2()+"'").list();
					if(!o1.isEmpty()){
						manageruserid = Integer.parseInt(o1.get(0)[0].toString());
					}
					int saleuserid = 0;
					if(ps.get(i).getType() == 1){
						List<Object[]> o11 = session.createSQLQuery("select id,customerid from users where status=1 and name='"+ ps.get(i).getZdy8()+"'").list();
						if(!o11.isEmpty()){
							saleuserid = Integer.parseInt(o11.get(0)[0].toString());
						}
					}
					int cityid = 0;
					List<Object> o2 = session.createSQLQuery("select id from city where status=1 and provinceid="+ provinceid +" and name='"+ ps.get(i).getZdy4()+"'").list();
					if(o2.isEmpty()){
						if(ps.get(i).getType() != 6){
							result = mmessage.cityinvalid +"["+ ps.get(i).getName() +"]";
							break;
						}
					}else{
						cityid = Integer.parseInt(o2.get(0).toString());
					}
					int townid = 0;
					List<Object> o3 = session.createSQLQuery("select id from town where status=1 and cityid="+ cityid +" and name='"+ ps.get(i).getZdy5()+"'").list();
					if(!o3.isEmpty()){
						townid = Integer.parseInt(o3.get(0).toString());
					}
					int hospitalid = 0;
					if((ps.get(i).getType() == 2 || ps.get(i).getType() == 4) && ps.get(i).getZdy6() != null && !ps.get(i).getZdy6().equalsIgnoreCase("")){
						List<Object> o4 = session.createSQLQuery("select id from customer where status=1 and type=5 and name='"+ ps.get(i).getZdy6()+"'").list();
						if(o4.isEmpty()){
							result = mmessage.hospitalinvalid +"["+ ps.get(i).getName() +"]";
							break;
						}else{
							hospitalid = Integer.parseInt(o4.get(0).toString());
						}
					}
					int uppercustomerid = 0;
					if(ps.get(i).getType() == 1 && ps.get(i).getZdy6() != null && !ps.get(i).getZdy6().equalsIgnoreCase("")){
						List<Object> o4 = session.createSQLQuery("select id from customer where status=1 and type=1 and name='"+ ps.get(i).getZdy6()+"'").list();
						if(o4.isEmpty()){
							result = mmessage.upperagentinvalid +"["+ ps.get(i).getName() +"]";
							break;
						}else{
							uppercustomerid = Integer.parseInt(o4.get(0).toString());
						}
					}
					int sex = 0;
					int familysex = 0;
					if(ps.get(i).getType() == 4){
						if(ps.get(i).getZdy9() != null && !ps.get(i).getZdy9().equalsIgnoreCase("")){
							List<Object> o7 = session.createSQLQuery("select value from keyvalue where status=1 and type=22 and keyname='"+ ps.get(i).getZdy9()+"'").list();
							if(!o7.isEmpty()){
								sex = Integer.parseInt(o7.get(0).toString());
							}
						}
						if(ps.get(i).getZdy10() != null && !ps.get(i).getZdy10().equalsIgnoreCase("")){
							List<Object> o8 = session.createSQLQuery("select value from keyvalue where status=1 and type=22 and keyname='"+ ps.get(i).getZdy10()+"'").list();
							if(!o8.isEmpty()){
								familysex = Integer.parseInt(o8.get(0).toString());
							}
						}
					}
					String no = "";
					String noname = "agentno";
					if(ps.get(i).getType() == 2){
						noname = "doctorno";
					}else if(ps.get(i).getType() == 3){
						noname = "drugstoreno";
					}else if(ps.get(i).getType() == 4){
						noname = "patientno";
					}else if(ps.get(i).getType() == 5){
						noname = "hospitalno";
					}else if(ps.get(i).getType() == 6){
						noname = "sharerno";
					}
					if(ps.get(i).getId() == 0){
						int loopnum = 0;
						while(true){
							List<Object> o9 = session.createSQLQuery("select nextval('"+ noname +"')").list();
							if(!o9.isEmpty()){
								Query q = session.createSQLQuery("select id from customer where status=1 and type="+ ps.get(i).getType() +" and customerno='"+ o9.get(0).toString() +"'");
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
						if(ps.get(i).getName().equalsIgnoreCase(ps.get(i).getZdy6())){
							result = mmessage.upperagenterror +"["+ ps.get(i).getName() +"]";
							break;
						}
						if(ps.get(i).getType() != 5 && !ps.get(i).getPhoneno().equalsIgnoreCase("")){
							List<Object> o5 = session.createSQLQuery("select id from customer where status=1 and type="+ ps.get(i).getType() +" and phoneno='"+ ps.get(i).getPhoneno() +"'").list();
							if(!o5.isEmpty()){
								result = mmessage.phonenoduplicate +"["+ ps.get(i).getName() +"]";
								break;
							}
						}
						if(ps.get(i).getType() == 5 || ps.get(i).getType() == 3 || ps.get(i).getType() == 1){
							List<Object> o6 = session.createSQLQuery("select id from customer where status=1 and type="+ ps.get(i).getType() +" and name='"+ ps.get(i).getName() +"'").list();
							if(!o6.isEmpty()){
								result = mmessage.nameduplicate +"["+ ps.get(i).getName() +"]";
								break;
							}
						}
						s = new Customer();
						s.setCreatedate(new Date());
						s.setType(ps.get(i).getType());
						s.setCityid(cityid);
						s.setTownid(townid);
						s.setCustomerno(no);
						s.setPhoneno(ps.get(i).getPhoneno());
						s.setTel(ps.get(i).getTel());
						s.setName(ps.get(i).getName());
						s.setProvinceid(provinceid);
						if(ps.get(i).getType() == 1){
							s.setManageruserid(manageruserid);
							s.setSalerid(0);
						}else{
							s.setManageruserid(0);
							s.setSalerid(manageruserid);
						}
						s.setHospitalid(hospitalid);
						s.setUppercustomerid(uppercustomerid);
						s.setAddressdetail(ps.get(i).getAddressdetail());
						s.setSicknesstype(ps.get(i).getSicknesstype());
						s.setAge(ps.get(i).getAge());
						s.setChangesaler("");
						s.setSex(sex);
						s.setFamilysex(familysex);
						s.setIdcard(ps.get(i).getIdcard());
						s.setFamilyname(ps.get(i).getFamilyname());
						s.setFamilyphoneno(ps.get(i).getFamilyphoneno());
						s.setDiagnosis(ps.get(i).getDiagnosis());
						s.setClearstatus(ps.get(i).getClearstatus());
						s.setStatus(1);
						s.setSaleuserid(saleuserid);
						if(ps.get(i).getPatientstatus() != null){
							s.setPatientstatus(ps.get(i).getPatientstatus());
						}else{
							s.setPatientstatus("");
						}
						if(ps.get(i).getFamilyrelationship() != null){
							s.setFamilyrelationship(ps.get(i).getFamilyrelationship());
						}else{
							s.setFamilyrelationship("");
						}
						session.save(s);
					}else{
						List<Customer> customers = session.createSQLQuery("select * from customer where status=1 and id="+ ps.get(i).getId()).addEntity(Customer.class).list();
						if(customers.isEmpty()){
							result = mmessage.datachange +"["+ ps.get(i).getName() +"]";
							break;
						}
						if(ps.get(i).getName().equalsIgnoreCase(ps.get(i).getZdy6())){
							result = mmessage.upperagenterror +"["+ ps.get(i).getName() +"]";
							break;
						}
						if(ps.get(i).getType() != 5 && !ps.get(i).getPhoneno().equalsIgnoreCase("")){
							List<Object> o5 = session.createSQLQuery("select id from customer where status=1 and type="+ ps.get(i).getType() +" and phoneno='"+ ps.get(i).getPhoneno() +"' and id<>"+ ps.get(i).getId()).list();
							if(!o5.isEmpty()){
								result = mmessage.phonenoduplicate +"["+ ps.get(i).getName() +"]";
								break;
							}
						}
						if(ps.get(i).getType() == 5 || ps.get(i).getType() == 3){
							List<Object> o6 = session.createSQLQuery("select id from customer where status=1 and type="+ ps.get(i).getType() +" and name='"+ ps.get(i).getName() +"' and id<>"+ ps.get(i).getId()).list();
							if(!o6.isEmpty()){
								result = mmessage.nameduplicate +"["+ ps.get(i).getName() +"]";
								break;
							}
						}
						oldmanageruserid = customers.get(0).getManageruserid();
						customers.get(0).setProvinceid(provinceid);
						customers.get(0).setName(ps.get(i).getName());
						customers.get(0).setType(ps.get(i).getType());
						customers.get(0).setCityid(cityid);
						customers.get(0).setTownid(townid);
						customers.get(0).setPhoneno(ps.get(i).getPhoneno());
						if(ps.get(i).getType() == 1){
							customers.get(0).setManageruserid(manageruserid);
							customers.get(0).setSalerid(0);
						}else{
							customers.get(0).setManageruserid(0);
							customers.get(0).setSalerid(manageruserid);
						}
						customers.get(0).setTel(ps.get(i).getTel());
						customers.get(0).setHospitalid(hospitalid);
						customers.get(0).setUppercustomerid(uppercustomerid);
						customers.get(0).setAddressdetail(ps.get(i).getAddressdetail());
						customers.get(0).setSicknesstype(ps.get(i).getSicknesstype());
						customers.get(0).setAge(ps.get(i).getAge());
						customers.get(0).setChangesaler(ps.get(i).getChangesaler());
						if(ps.get(i).getChangesaler() == null || ps.get(i).getChangesaler().equalsIgnoreCase("")){
							customers.get(0).setChangedate(null);
						}
						customers.get(0).setSex(sex);
						customers.get(0).setFamilysex(familysex);
						customers.get(0).setIdcard(ps.get(i).getIdcard());
						customers.get(0).setFamilyname(ps.get(i).getFamilyname());
						customers.get(0).setFamilyphoneno(ps.get(i).getFamilyphoneno());
						customers.get(0).setDiagnosis(ps.get(i).getDiagnosis());
						customers.get(0).setClearstatus(ps.get(i).getClearstatus());
						customers.get(0).setSaleuserid(saleuserid);
						if(ps.get(i).getPatientstatus() != null){
							customers.get(0).setPatientstatus(ps.get(i).getPatientstatus());
						}else{
							customers.get(0).setPatientstatus("");
						}
						if(ps.get(i).getFamilyrelationship() != null){
							customers.get(0).setFamilyrelationship(ps.get(i).getFamilyrelationship());
						}else{
							customers.get(0).setFamilyrelationship("");
						}
					}					
			        session.getTransaction().commit();	
					//change permission
					if(oldmanageruserid != manageruserid){
						HibernateUtil_new.closeSession();
						session = HibernateUtil_new.currentSession();
						session.beginTransaction();
						Query q = session.createSQLQuery("update permission set status=0 where userid="+ oldmanageruserid);
						q.executeUpdate();
						Query q0 = session.createSQLQuery("update permission set status=0 where userid="+ manageruserid);
						q0.executeUpdate();
						session.getTransaction().commit();
						HibernateUtil_new.closeSession();
						session = HibernateUtil_new.currentSession();
						session.beginTransaction();
						List<Permissiongroup> pgs = session.createSQLQuery("select * from permissiongroup where status=1 and type='agent'").addEntity(Permissiongroup.class).list();
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
								p.setUserid(manageruserid);
								session.save(p);
								session.getTransaction().commit();
								if(j < (pgs.size() -1)){
							        HibernateUtil_new.closeSession();
									session = HibernateUtil_new.currentSession();
									session.beginTransaction();
								}
							}
						}
						HibernateUtil_new.closeSession();
						session = HibernateUtil_new.currentSession();
						session.beginTransaction();
						pgs = session.createSQLQuery("select * from permissiongroup where status=1 and type='saler'").addEntity(Permissiongroup.class).list();
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
								p.setUserid(oldmanageruserid);
								session.save(p);
								session.getTransaction().commit();
								if(j < (pgs.size() -1)){
							        HibernateUtil_new.closeSession();
									session = HibernateUtil_new.currentSession();
									session.beginTransaction();
								}
							}
						}
					}					
			        result = mmessage.savesuccess;					
				}				
			}						
		}
		HibernateUtil_new.closeSession();
		return result;
	}
}
