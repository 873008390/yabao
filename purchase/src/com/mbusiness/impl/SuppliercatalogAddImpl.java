package com.mbusiness.impl;

import java.util.List;

import org.hibernate.Session;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.mbusiness.dao.SuppliercatalogAddDAO;
import com.mbusiness.model.Supplier;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.MMessage;

public class SuppliercatalogAddImpl implements SuppliercatalogAddDAO {
	
	private String titleValid;
	private String result;
	private Session session;
	private MMessage mmessage = new MMessage();
	private HasPermission hasPermission = new HasPermission();
	//private SupplierCorporationid supplierCorporationid = new SupplierCorporationid();
	@Override
	public String add(Usersession usersession, Supplier supplier) {
		HibernateUtil_new.closeSession();
		session = HibernateUtil_new.currentSession();
		session.beginTransaction();
		if(usersession.getUsername().equalsIgnoreCase("")){
			result = mmessage.notlogin;
		}else{
			int flag = 0;		
			if(hasPermission.hasPermission(usersession.getUsername(), "supplier", "adddata", session) == 0){
				if(usersession.getUsername().equalsIgnoreCase("admin")){
					flag = 1;	
				}else{
					result = mmessage.nopermission;
				}
			}else{
				flag = 1;
			}
			if(flag == 1){			
				String details = supplier.getZdy10();
				
				supplier.setZdy10("");
				
				Gson gson = new Gson();
				List<Supplier> ps = gson.fromJson("["+ details +"]", new TypeToken<List<Supplier>>(){}.getType());
				Supplier s;
				//System.out.println("========"+details);
				for(int i=0;i<ps.size();i++){
					HibernateUtil_new.closeSession();
					session = HibernateUtil_new.currentSession();
					session.beginTransaction();
					if(ps.get(i).getName() != null && !ps.get(i).getName().equalsIgnoreCase("")){
						List<Object> o = session.createSQLQuery("select id from catalog where status=1 and name='"+ ps.get(i).getName() +"' and upperid=1").list();
						if(!o.isEmpty()){
							List<Supplier> suppliers = session.createSQLQuery("select * from supplier where id="+ supplier.getZdy9()).addEntity(Supplier.class).list();
							if(!suppliers.isEmpty()){
								if(suppliers.get(0).getCatalogids() != null && !suppliers.get(0).getCatalogids().equalsIgnoreCase("")){
									String tmp = ","+ suppliers.get(0).getCatalogids() +",";
									if(tmp.indexOf(","+ o.get(0).toString() +",") == -1){
										suppliers.get(0).setCatalogids(suppliers.get(0).getCatalogids() +","+ o.get(0).toString());
									}
								}else{
									suppliers.get(0).setCatalogids(o.get(0).toString());
								}
								result = mmessage.savesuccess;
							}else{
								result = mmessage.supplierinvalid;
							}
						}else{
							result = mmessage.datachange;
						}
					}
					session.getTransaction().commit();
					HibernateUtil_new.closeSession();
				}
			}						
		}
		HibernateUtil_new.closeSession();
		return result;
	}
}
