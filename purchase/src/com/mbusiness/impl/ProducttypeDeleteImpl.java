package com.mbusiness.impl;

import java.text.SimpleDateFormat;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;

import com.mbusiness.dao.ProducttypeDeleteDAO;
import com.mbusiness.model.Producttype;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Logging;
import com.mbusiness.util.MMessage;

public class ProducttypeDeleteImpl implements ProducttypeDeleteDAO {
	
	private String result;
	private Session session;
	private MMessage mmessage = new MMessage();
	private Logging logging = new Logging();
	private HasPermission hasPermission = new HasPermission();
	//private ProducttypeCorporationid producttypeCorporationid = new ProducttypeCorporationid();
	private SimpleDateFormat sformat = new SimpleDateFormat("yyyy-MM-dd");
	@Override
	public String delete(Usersession usersession, int producttypeid) {
		session = HibernateUtil_new.currentSession();
		session.beginTransaction();
		if(usersession.getUsername().equalsIgnoreCase("")){
			result = mmessage.notlogin;
		}else{
			int flag = 0;		
			if(hasPermission.hasPermission(usersession.getUsername(), "product", "deletedata", session) == 0){
				if(usersession.getUsername().equalsIgnoreCase("admin")){
					flag = 1;	
				}else{
					result = mmessage.nopermission;
				}
			}else{
				flag = 1;
			}
			if(flag == 1){
				List<Producttype> producttypes = session.createSQLQuery("select * from producttype where status=1 and id="+ producttypeid).addEntity(Producttype.class).list();
				if(producttypes.isEmpty()){
					result = mmessage.producttypeinvalid;
				}else{
					Query q = session.createSQLQuery("select id from product where status=1 and producttypeid="+ producttypeid);
					if(q.list().isEmpty()){
						producttypes.get(0).setStatus(0);
				        session.getTransaction().commit();	
				        result = mmessage.deletesuccess;
					}else{
						result = mmessage.typehasproduct;
					}
				}				
			}						
		}
		HibernateUtil_new.closeSession();
		return result;
	}
}
