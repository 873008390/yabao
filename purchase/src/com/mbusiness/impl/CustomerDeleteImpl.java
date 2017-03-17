package com.mbusiness.impl;

import java.text.SimpleDateFormat;
import java.util.List;

import org.hibernate.Session;

import com.mbusiness.dao.CustomerDeleteDAO;
import com.mbusiness.model.Customer;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Logging;
import com.mbusiness.util.MMessage;

public class CustomerDeleteImpl implements CustomerDeleteDAO {
	
	private String result;
	private Session session;
	private MMessage mmessage = new MMessage();
	private Logging logging = new Logging();
	private HasPermission hasPermission = new HasPermission();
	//private CustomerCorporationid customerCorporationid = new CustomerCorporationid();
	private SimpleDateFormat sformat = new SimpleDateFormat("yyyy-MM-dd");
	@Override
	public String delete(Usersession usersession, int customerid) {
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
					result = mmessage.nopermission;
				}
			}else{
				flag = 1;
			}
			if(flag == 1){
				List<Customer> customers = session.createSQLQuery("select * from customer where status=1 and id="+ customerid).addEntity(Customer.class).list();
				if(customers.isEmpty()){
					result = mmessage.customerinvalid;
				}else{
					customers.get(0).setStatus(0);
			        session.getTransaction().commit();	
			        result = mmessage.deletesuccess;
				}				
			}						
		}
		HibernateUtil_new.closeSession();
		return result;
	}
}
