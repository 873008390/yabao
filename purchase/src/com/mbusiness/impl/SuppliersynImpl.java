package com.mbusiness.impl;


import java.util.List;

import org.hibernate.Session;

import com.mbusiness.dao.SuppliersynDAO;
import com.mbusiness.model.Supplier;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.GetK3CloudData;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.MMessage;

public class SuppliersynImpl implements SuppliersynDAO {
	
	private Session session;
	private String result;
	private List<Supplier> suppliers;
	private MMessage mmessage = new MMessage();
	private HasPermission hasPermission = new HasPermission();
	@Override
	public String syn(Usersession usersession) {
		session = HibernateUtil_new.currentSession();
		
		if(usersession.getUsername().equalsIgnoreCase("")){
			result = mmessage.notlogin;
		}else{
			int flag = 0;		
			if(hasPermission.hasPermission(usersession.getUsername(), "supplier", "uploaddata", session) == 0){
				if(usersession.getUsername().equalsIgnoreCase("admin")){
					flag = 1;	
				}else{
					result = mmessage.nopermission;
				}
			}else{
				flag = 1;
			}
			if(flag == 1){
				ListSupplier ls = new ListSupplier();
				String supplierids = ls.list(usersession.getUsername(), session);
				String sql = " and id in("+ supplierids +")";
				suppliers = session.createSQLQuery("select * from supplier where 1=1 "+ sql +" order by -id ").addEntity(Supplier.class).list();
				
				new Thread(new task()).start();
				
				result = mmessage.synsuccess;
				
			}
		
		
		}
		HibernateUtil_new.closeSession();
		return result;
		
	}
	public class task implements Runnable{
		@Override
		public void run() {
			GetK3CloudData.addAndUpdateData(suppliers);
		}
		
	}
}
