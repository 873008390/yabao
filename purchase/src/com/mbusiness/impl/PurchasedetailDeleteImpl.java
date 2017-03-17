package com.mbusiness.impl;

import java.text.SimpleDateFormat;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;

import com.mbusiness.dao.PurchasedetailDeleteDAO;
import com.mbusiness.model.Purchasedetail;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Logging;
import com.mbusiness.util.MMessage;

public class PurchasedetailDeleteImpl implements PurchasedetailDeleteDAO {
	
	private String result;
	private Session session;
	private MMessage mmessage = new MMessage();
	private Logging logging = new Logging();
	private HasPermission hasPermission = new HasPermission();
	//private PurchasedetailCorporationid purchasedetailCorporationid = new PurchasedetailCorporationid();
	private SimpleDateFormat sformat = new SimpleDateFormat("yyyy-MM-dd");
	@Override
	public String delete(Usersession usersession, int purchasedetailid) {
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
				List<Purchasedetail> purchasedetails = session.createSQLQuery("select * from purchasedetail where status=1 and id="+ purchasedetailid).addEntity(Purchasedetail.class).list();
				if(purchasedetails.isEmpty()){
					result = mmessage.purchasedetailinvalid;
				}else{
					purchasedetails.get(0).setStatus(0);
					
					//update total and totalquantity
					List<Object[]> o0 = session.createSQLQuery("select sum(money) totmoney,sum(quantity) totquan from purchasedetail where status=1 and mainid="+ purchasedetails.get(0).getMainid()).list();
					if(!o0.isEmpty()){
						String t = "0";
						String tq = "0";
						if(o0.get(0)[0] != null){
							t = o0.get(0)[0].toString();
						}
						if(o0.get(0)[1] != null){
							tq = o0.get(0)[1].toString();
						}
						Query q0 = session.createSQLQuery("update purchase set total = "+ t +",totalquantity="+ tq +" where id="+ purchasedetails.get(0).getMainid());
						q0.executeUpdate();
					}
					
			        session.getTransaction().commit();	
			        result = mmessage.deletesuccess;
				}				
			}						
		}
		HibernateUtil_new.closeSession();
		return result;
	}
}
