package com.mbusiness.impl;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;

import com.mbusiness.dao.CustomerModifyDAO;
import com.mbusiness.model.Customer;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.MMessage;

public class CustomerModifyImpl implements CustomerModifyDAO {
	
	private String titleValid;
	private String result = "";
	private Session session;
	private MMessage mmessage = new MMessage();
	//private CustomerCorporationid customerCorporationid = new CustomerCorporationid();
	@Override
	public String modify(Usersession usersession, Customer customer, String idtype) {
		HibernateUtil_new.closeSession();
		session = HibernateUtil_new.currentSession();
		session.beginTransaction();
		if(usersession.getUsername().equalsIgnoreCase("")){
			result = mmessage.notlogin;
		}else{
			if(idtype.equalsIgnoreCase("tosharer")){
				List<Customer> cs = session.createSQLQuery("select * from customer where id="+ customer.getId()).addEntity(Customer.class).list();
				if(!cs.isEmpty()){
					cs.get(0).setType(6);
					Query q = session.createSQLQuery("update users set type=6 where status=1 and customerid="+ cs.get(0).getId());
					q.executeUpdate();
					session.getTransaction().commit();
					result = mmessage.modifysuccess;
				}else{
					result = mmessage.customerinvalid;
				}
			}
		}
		HibernateUtil_new.closeSession();
		return result;
	}
}
