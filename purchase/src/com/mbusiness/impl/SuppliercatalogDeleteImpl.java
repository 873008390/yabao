package com.mbusiness.impl;

import java.text.SimpleDateFormat;
import java.util.List;

import org.hibernate.Session;

import com.mbusiness.dao.SuppliercatalogDeleteDAO;
import com.mbusiness.model.Supplier;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Logging;
import com.mbusiness.util.MMessage;

public class SuppliercatalogDeleteImpl implements SuppliercatalogDeleteDAO {
	
	private String result;
	private Session session;
	private MMessage mmessage = new MMessage();
	private Logging logging = new Logging();
	private HasPermission hasPermission = new HasPermission();
	//private CustomerCorporationid supplierCorporationid = new CustomerCorporationid();
	private SimpleDateFormat sformat = new SimpleDateFormat("yyyy-MM-dd");
	@Override
	public String delete(Usersession usersession, int supplierid, String catalogname) {
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
					List<Object> o = session.createSQLQuery("select id from catalog where status=1 and name='"+ catalogname +"' and upperid=1").list();
					if(!o.isEmpty()){
						String tmp = ","+ suppliers.get(0).getCatalogids() +",";
						if(tmp.indexOf(","+ o.get(0).toString() +",") > -1){
							String newtmp = tmp.replace(","+ o.get(0).toString(), "");
							if(newtmp.equalsIgnoreCase(",")){
								suppliers.get(0).setCatalogids("");
							}else{
								if(newtmp.substring(0, 1).equals(",")){
									suppliers.get(0).setCatalogids(newtmp.substring(1, newtmp.length()-1));
								}else{
									suppliers.get(0).setCatalogids(newtmp.substring(0, newtmp.length()-1));
								}
							}
							session.getTransaction().commit();
						}
					}
						
			        result = mmessage.deletesuccess;
				}				
			}						
		}
		HibernateUtil_new.closeSession();
		return result;
	}
}
