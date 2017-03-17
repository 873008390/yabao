package com.mbusiness.impl;

import java.text.SimpleDateFormat;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;

import com.mbusiness.dao.PurchaseDeleteDAO;
import com.mbusiness.model.Purchase;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Logging;
import com.mbusiness.util.MMessage;

public class PurchaseDeleteImpl implements PurchaseDeleteDAO {
	
	private String result;
	private Session session;
	private MMessage mmessage = new MMessage();
	private Logging logging = new Logging();
	private HasPermission hasPermission = new HasPermission();
	//private PurchaseCorporationid purchaseCorporationid = new PurchaseCorporationid();
	private SimpleDateFormat sformat = new SimpleDateFormat("yyyy-MM-dd");
	@Override
	public String delete(Usersession usersession, int purchaseid) {
		session = HibernateUtil_new.currentSession();
		session.beginTransaction();
		if(usersession.getUsername().equalsIgnoreCase("")){
			result = mmessage.notlogin;
		}else{
			int flag = 0;		
			if(hasPermission.hasPermission(usersession.getUsername(), "purchase", "deletedata", session) == 0){
				if(usersession.getUsername().equalsIgnoreCase("admin")){
					flag = 1;	
				}else{
					result = mmessage.nopermission;
				}
			}else{
				flag = 1;
			}
			if(flag == 1){
				List<Purchase> purchases = session.createSQLQuery("select * from purchase where status=1 and id="+ purchaseid).addEntity(Purchase.class).list();
				if(purchases.isEmpty()){
					result = mmessage.purchaseinvalid;
				}else{
					purchases.get(0).setStatus(0);
					Query q = session.createSQLQuery("update purchasedetail set status=0 where mainid="+ purchaseid);
					q.executeUpdate();
			        session.getTransaction().commit();	
			        result = mmessage.deletesuccess;
				}				
			}						
		}
		HibernateUtil_new.closeSession();
		return result;
	}
}
