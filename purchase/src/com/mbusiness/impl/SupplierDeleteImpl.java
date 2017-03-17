package com.mbusiness.impl;

import java.text.SimpleDateFormat;
import java.util.List;

import org.hibernate.Session;

import com.mbusiness.dao.SupplierDeleteDAO;
import com.mbusiness.model.Supplier;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Logging;
import com.mbusiness.util.MMessage;

public class SupplierDeleteImpl implements SupplierDeleteDAO {
	
	private String result;
	private Session session;
	private MMessage mmessage = new MMessage();
	private Logging logging = new Logging();
	private HasPermission hasPermission = new HasPermission();
	//private CustomerCorporationid supplierCorporationid = new CustomerCorporationid();
	private SimpleDateFormat sformat = new SimpleDateFormat("yyyy-MM-dd");
	@Override
	public String delete(Usersession usersession, int supplierid) {
		session = HibernateUtil_new.currentSession();
		session.beginTransaction();
		if(usersession.getUsername().equalsIgnoreCase("")){
			result = mmessage.notlogin;
		}else{
			int flag = 0;		
			if(hasPermission.hasPermission(usersession.getUsername(), "supplier", "deletedata", session) == 0){
				if(usersession.getUsername().equalsIgnoreCase("admin")){
					flag = 1;	
				}else{
					result = mmessage.nopermission;
				}
			}else{
				flag = 1;
			}
			if(flag == 1){
				List<Supplier> suppliers = session.createSQLQuery("select * from supplier where status=1 and id="+ supplierid).addEntity(Supplier.class).list();
				if(suppliers.isEmpty()){
					result = mmessage.supplierinvalid;
				}else{
					suppliers.get(0).setStatus(0);
			        session.getTransaction().commit();	
			        result = mmessage.deletesuccess;
				}				
			}						
		}
		HibernateUtil_new.closeSession();
		return result;
	}
}
