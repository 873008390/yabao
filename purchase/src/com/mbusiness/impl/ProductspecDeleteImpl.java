package com.mbusiness.impl;

import java.text.SimpleDateFormat;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;

import com.mbusiness.dao.ProductspecDeleteDAO;
import com.mbusiness.model.Productspec;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Logging;
import com.mbusiness.util.MMessage;

public class ProductspecDeleteImpl implements ProductspecDeleteDAO {
	
	private String result;
	private Session session;
	private MMessage mmessage = new MMessage();
	private Logging logging = new Logging();
	private HasPermission hasPermission = new HasPermission();
	//private ProductspecCorporationid productspecCorporationid = new ProductspecCorporationid();
	private SimpleDateFormat sformat = new SimpleDateFormat("yyyy-MM-dd");
	@Override
	public String delete(Usersession usersession, int productspecid) {
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
				List<Productspec> productspecs = session.createSQLQuery("select * from productspec where status=1 and id="+ productspecid).addEntity(Productspec.class).list();
				if(productspecs.isEmpty()){
					result = mmessage.productspecinvalid;
				}else{
					Query q = session.createSQLQuery("select id from product where status=1 and productspecid="+ productspecid);
					if(q.list().isEmpty()){
						productspecs.get(0).setStatus(0);
				        session.getTransaction().commit();	
				        result = mmessage.deletesuccess;
					}else{
						result = mmessage.spechasproduct;
					}
				}				
			}						
		}
		HibernateUtil_new.closeSession();
		return result;
	}
}
