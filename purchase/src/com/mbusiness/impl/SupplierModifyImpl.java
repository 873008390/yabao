package com.mbusiness.impl;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;

import com.mbusiness.dao.SupplierModifyDAO;
import com.mbusiness.model.Supplier;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.MMessage;

public class SupplierModifyImpl implements SupplierModifyDAO {
	
	private String titleValid;
	private String result = "";
	private Session session;
	private MMessage mmessage = new MMessage();
	//private CustomerCorporationid supplierCorporationid = new CustomerCorporationid();
	@Override
	public String modify(Usersession usersession, Supplier supplier, String idtype) {
		HibernateUtil_new.closeSession();
		session = HibernateUtil_new.currentSession();
		session.beginTransaction();
		if(usersession.getUsername().equalsIgnoreCase("")){
			result = mmessage.notlogin;
		}else{
			
		}
		HibernateUtil_new.closeSession();
		return result;
	}
}
