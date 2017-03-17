package com.mbusiness.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;

import com.mbusiness.dao.CustomeronlineAddDAO;
import com.mbusiness.model.Customer;
import com.mbusiness.model.Smssending;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.MMessage;

public class CustomeronlineAddImpl implements CustomeronlineAddDAO {
	
	private String titleValid;
	private String result = "";
	private Session session;
	private MMessage mmessage = new MMessage();
	//private CustomerCorporationid customerCorporationid = new CustomerCorporationid();
	@Override
	public String add(Usersession usersession, Customer customer) {
		HibernateUtil_new.closeSession();
		session = HibernateUtil_new.currentSession();
		session.beginTransaction();
		if(usersession.getUsername().equalsIgnoreCase("")){
			result = mmessage.notlogin;
		}else{
			List<Object[]> o = new ArrayList<Object[]>();
			if(customer.getId() == 0){
				o = session.createSQLQuery("select customerid,id,name,type from users where status=1 and account='"+ usersession.getUsername() +"'").list();
			}else{
				o = session.createSQLQuery("select customerid,id,name from users where status=1 and customerid="+ customer.getId()).list();
			}
			if(!o.isEmpty()){
				if(customer.getZdy1().equalsIgnoreCase("saler")){
					Query q0 = session.createSQLQuery("select id from users where status=1 and name='"+ customer.getChangesaler() +"'");
					if(q0.list().isEmpty()){
						result = mmessage.salerinvalid;
					}else{
						Query q = session.createSQLQuery("update customer set changesaler='"+ customer.getChangesaler() +"',changedate=now() where id="+ o.get(0)[0].toString());
						q.executeUpdate();
						//send sms
						List<Object> o1 = session.createSQLQuery("select phoneno from users where status=1 and id=(select salerid from customer where id="+ o.get(0)[0].toString() +")").list();
						if(!o1.isEmpty()){
							Smssending ss = new Smssending();
							ss.setContent(o.get(0)[2].toString() + mmessage.changesaler +"["+ mmessage.corporation +"]");
							ss.setCreatedate(new Date());
							ss.setPhoneno(o1.get(0).toString());
							ss.setSendstatus(0);
							ss.setStatus(1);
							ss.setType(Integer.parseInt(o.get(0)[3].toString()));
							session.save(ss);
							session.getTransaction().commit();
							
							HibernateUtil_new.closeSession();
							session = HibernateUtil_new.currentSession();
							session.beginTransaction();
							ss = new Smssending();
							ss.setContent(o.get(0)[2].toString() + mmessage.changesaler +"["+ mmessage.corporation +"]");
							ss.setCreatedate(new Date());
							ss.setPhoneno(mmessage.adminphoneno);
							ss.setSendstatus(0);
							ss.setStatus(1);
							ss.setType(Integer.parseInt(o.get(0)[3].toString()));
							session.save(ss);
						}
						session.getTransaction().commit();
				        result = mmessage.savesuccess;	
					}
				}else if(customer.getZdy1().equalsIgnoreCase("mypatient")){
					GetmyAgent ga = new GetmyAgent();
					String salerids = ga.get(session, usersession.getUsername());
					GetmyDoctor gd = new GetmyDoctor();
					String doctorids = gd.get(session, salerids);
					GetmyPatient gp = new GetmyPatient();
					String patientids = gp.get(session, doctorids, salerids);
					Query q = session.createSQLQuery("select id from users where status=1 and type=4 and id in("+ patientids +") and customerid = "+ customer.getId());
					if(q.list().isEmpty()){
						result = mmessage.docinvalid;
					}else{
						int phonenosendsms = 0;
						List<Customer> cs = session.createSQLQuery("select * from customer where id="+ customer.getId()).addEntity(Customer.class).list();
						if(!cs.isEmpty()){
							if(!customer.getPhoneno().equalsIgnoreCase(cs.get(0).getPhoneno())){
								List<Object> o5 = session.createSQLQuery("select id from customer where status=1 and phoneno='"+ customer.getPhoneno() +"' and id<>"+ customer.getId()).list();
								if(!o5.isEmpty()){
									cs.get(0).setPhoneno(customer.getPhoneno() +"-待验证");
								}else{
									cs.get(0).setPhoneno(customer.getPhoneno());								
								}
								phonenosendsms = 1;
							}
							cs.get(0).setName(customer.getName());
							cs.get(0).setAge(customer.getAge());
							cs.get(0).setAddressdetail(customer.getAddressdetail());
							cs.get(0).setDiagnosis(customer.getDiagnosis());
							session.getTransaction().commit();
							result = mmessage.savesuccess;							
						}else{
							result = mmessage.docinvalid;
						}
						//sendsms
				        if(phonenosendsms == 1){
				        	HibernateUtil_new.closeSession();
							session = HibernateUtil_new.currentSession();
							session.beginTransaction();
							Smssending ss = new Smssending();
							ss.setContent(mmessage.docmodify +"["+ customer.getName() +"]");
							ss.setCreatedate(new Date());
							ss.setPhoneno(mmessage.adminphoneno);
							ss.setSendstatus(0);
							ss.setStatus(1);
							ss.setType(3);
							session.save(ss);
							session.getTransaction().commit();
				        }
					}
				}else if(customer.getZdy1().equalsIgnoreCase("mydoctor")){
					GetmyAgent ga = new GetmyAgent();
					String salerids = ga.get(session, usersession.getUsername());
					GetmyDoctor gd = new GetmyDoctor();
					String doctorids = gd.get(session, salerids);
					Query q = session.createSQLQuery("select id from users where status=1 and type=2 and id in("+ doctorids +") and customerid = "+ customer.getId());
					if(q.list().isEmpty()){
						result = mmessage.docinvalid;
					}else{
						int phonenosendsms = 0;
						int hospitalsendsms = 0;
						List<Customer> cs = session.createSQLQuery("select * from customer where id="+ customer.getId()).addEntity(Customer.class).list();
						if(!cs.isEmpty()){
							if(!customer.getPhoneno().equalsIgnoreCase(cs.get(0).getPhoneno())){
								List<Object> o5 = session.createSQLQuery("select id from customer where status=1 and phoneno='"+ customer.getPhoneno() +"' and id<>"+ customer.getId()).list();
								if(!o5.isEmpty()){
									cs.get(0).setPhoneno(customer.getPhoneno() +"-待验证");
								}else{
									cs.get(0).setPhoneno(customer.getPhoneno());								
								}
								phonenosendsms = 1;
							}
							cs.get(0).setName(customer.getName());
							cs.get(0).setAge(customer.getAge());
							cs.get(0).setAddressdetail(customer.getAddressdetail());
							cs.get(0).setDiagnosis(customer.getDiagnosis());
							cs.get(0).setDepartment(customer.getDepartment());
							List<Object> o6 = session.createSQLQuery("select id from customer where status=1 and name='"+ customer.getZdy2() +"' and type=5").list();
							if(!o6.isEmpty()){
								cs.get(0).setHospitalid(Integer.parseInt(o6.get(0).toString()));
							}else{
								cs.get(0).setZdy6(customer.getZdy2());
								hospitalsendsms = 1;							
							}
							session.getTransaction().commit();
							result = mmessage.savesuccess;							
						}else{
							result = mmessage.docinvalid;
						}
						//sendsms
				        if(phonenosendsms == 1){
				        	HibernateUtil_new.closeSession();
							session = HibernateUtil_new.currentSession();
							session.beginTransaction();
							Smssending ss = new Smssending();
							ss.setContent(mmessage.docmodify +"["+ customer.getName() +"]");
							ss.setCreatedate(new Date());
							ss.setPhoneno(mmessage.adminphoneno);
							ss.setSendstatus(0);
							ss.setStatus(1);
							ss.setType(3);
							session.save(ss);
							session.getTransaction().commit();
				        }
				        if(hospitalsendsms == 1){
				        	HibernateUtil_new.closeSession();
							session = HibernateUtil_new.currentSession();
							session.beginTransaction();
							Smssending ss = new Smssending();
							ss.setContent(mmessage.hospitalinvalid +"["+ customer.getName() +"]");
							ss.setCreatedate(new Date());
							ss.setPhoneno(mmessage.adminphoneno);
							ss.setSendstatus(0);
							ss.setStatus(1);
							ss.setType(3);
							session.save(ss);
							session.getTransaction().commit();
				        }
					}
				}else{
					int phonenosendsms = 0;
					int hospitalsendsms = 0;
					List<Customer>	customers = session.createSQLQuery("select * from customer where id="+ o.get(0)[0].toString()).addEntity(Customer.class).list();
					if(customers.get(0).getId() == 0){
						result = mmessage.zongbuusernomodify;
					}else{
						List<Object> o5 = session.createSQLQuery("select id from customer where status=1 and phoneno='"+ customer.getPhoneno() +"' and id<>"+ o.get(0)[0].toString()).list();
						if(!o5.isEmpty()){
							customer.setPhoneno(customer.getPhoneno() +"-待验证");
							phonenosendsms = 1;
						}
						customers.get(0).setPhoneno(customer.getPhoneno());
						customers.get(0).setName(customer.getName());
						if(customers.get(0).getType() == 4){
							customers.get(0).setAddressdetail(customer.getAddressdetail());
							customers.get(0).setAge(customer.getAge());
							customers.get(0).setDiagnosis(customer.getDiagnosis());
						}else if(customers.get(0).getType() == 2){
							customers.get(0).setDepartment(customer.getDepartment());
							List<Object> o6 = session.createSQLQuery("select id from customer where status=1 and name='"+ customer.getZdy2() +"' and type=5").list();
							if(!o6.isEmpty()){
								customers.get(0).setHospitalid(Integer.parseInt(o6.get(0).toString()));
							}else{
								customers.get(0).setZdy6(customer.getZdy2());
								hospitalsendsms = 1;							
							}
						}
						if(customers.get(0).getType() != 2){
							Query q = session.createSQLQuery("update users set name='"+ customer.getName() +"' where id="+ o.get(0)[1].toString());
							q.executeUpdate();
						}
						session.getTransaction().commit();
				        result = mmessage.savesuccess;	
				        
				        //sendsms
				        if(phonenosendsms == 1){
				        	HibernateUtil_new.closeSession();
							session = HibernateUtil_new.currentSession();
							session.beginTransaction();
							Smssending ss = new Smssending();
							ss.setContent(mmessage.phonenoduplicate +"["+ customer.getName() +"]");
							ss.setCreatedate(new Date());
							ss.setPhoneno(mmessage.adminphoneno);
							ss.setSendstatus(0);
							ss.setStatus(1);
							ss.setType(3);
							session.save(ss);
							session.getTransaction().commit();
				        }
				        if(hospitalsendsms == 1){
				        	HibernateUtil_new.closeSession();
							session = HibernateUtil_new.currentSession();
							session.beginTransaction();
							Smssending ss = new Smssending();
							ss.setContent(mmessage.hospitalinvalid +"["+ customer.getName() +"]");
							ss.setCreatedate(new Date());
							ss.setPhoneno(mmessage.adminphoneno);
							ss.setSendstatus(0);
							ss.setStatus(1);
							ss.setType(3);
							session.save(ss);
							session.getTransaction().commit();
				        }
					}
				}
			}else{
				result = mmessage.datachange;
			}				
		}
		HibernateUtil_new.closeSession();
		return result;
	}
}
