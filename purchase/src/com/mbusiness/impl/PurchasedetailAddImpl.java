package com.mbusiness.impl;

import java.text.SimpleDateFormat;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.mbusiness.dao.PurchasedetailAddDAO;
import com.mbusiness.model.Purchasedetail;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Inputverify;
import com.mbusiness.util.MMessage;

public class PurchasedetailAddImpl implements PurchasedetailAddDAO {
	
	private String result;
	private Session session;
	private MMessage mmessage = new MMessage();
	private HasPermission hasPermission = new HasPermission();
	private Inputverify inputverify = new Inputverify();
	//private PurchasedetailCorporationid purchasedetailCorporationid = new PurchasedetailCorporationid();
	@Override
	public String add(Usersession usersession, Purchasedetail purchasedetail) {
		SimpleDateFormat sformat = new SimpleDateFormat("yyyy-MM-dd");
		session = HibernateUtil_new.currentSession();
		session.beginTransaction();
		if(usersession.getUsername().equalsIgnoreCase("")){
			result = mmessage.notlogin;
		}else{
			String details = purchasedetail.getZdy10();			
			purchasedetail.setZdy10("");
			//System.out.print(""+ inputverify.check(details));
			int flag = 1;			
			if(purchasedetail.getZdy10() != null){
				flag = inputverify.check(details);
			}
			if(flag != 1){
				result = mmessage.dataillegal;
			}else{
				flag = 0;
				if(hasPermission.hasPermission(usersession.getUsername(), "purchase", "adddata", session) == 0){
					if(usersession.getUsername().equalsIgnoreCase("admin")){
						flag = 1;	
					}else{
						result = mmessage.nopermission;
					}
				}else{
					flag = 1;
				}
				if(flag == 1){			
					
					
					Gson gson = new Gson();
					List<Purchasedetail> ps = gson.fromJson("["+ details +"]", new TypeToken<List<Purchasedetail>>(){}.getType());
					Purchasedetail s;
					//System.out.println("========"+details);
					for(int i=0;i<ps.size();i++){
						HibernateUtil_new.closeSession();
						session = HibernateUtil_new.currentSession();
						session.beginTransaction();
						int oldmainid = 0;
						int productid = 0;
						int productspecid = 0;
						int productunitid = 0;
						List<Object> o1 = session.createSQLQuery("select id from product where status=1 and name='"+ ps.get(i).getZdy2() +"'").list();
						if(!o1.isEmpty()){
							productid = Integer.parseInt(o1.get(0).toString());
						}
						List<Object> o2 = session.createSQLQuery("select id from productspec where status=1 and name='"+ ps.get(i).getZdy3() +"'").list();
						if(!o2.isEmpty()){
							productspecid = Integer.parseInt(o2.get(0).toString());
						}
						List<Object> o3 = session.createSQLQuery("select id from productunit where status=1 and name='"+ ps.get(i).getZdy4() +"'").list();
						if(!o3.isEmpty()){
							productunitid = Integer.parseInt(o3.get(0).toString());
						}
						Query q = session.createSQLQuery("select id from purchase where status=1 and id="+ ps.get(i).getMainid());
						if(q.list().isEmpty()){
							result = mmessage.purchaseinvalid +"[ID="+ ps.get(i).getMainid() +"]";
							break;
						}
						if(ps.get(i).getId() == 0){
							List<Purchasedetail> purchasedetails = session.createSQLQuery("select * from purchasedetail where status=1 and productid="+ productid +" and productspecid="+ productspecid +" and mainid="+ ps.get(i).getMainid()).addEntity(Purchasedetail.class).list();
							if(purchasedetails.isEmpty()){
								s = new Purchasedetail();
								s.setMainid(ps.get(i).getMainid());
								s.setMoney(ps.get(i).getPrice()*ps.get(i).getQuantity());
								s.setPrice(ps.get(i).getPrice());
								s.setQuantity(ps.get(i).getQuantity());
								s.setProductid(productid);
								s.setProductspecid(productspecid);
								s.setProductunitid(productunitid);
								s.setStatus(1);
								session.save(s);
							}else{
								if(ps.get(i).getPrice() == purchasedetails.get(0).getPrice()){
									purchasedetails.get(0).setMoney(ps.get(i).getPrice()*(ps.get(i).getQuantity() + purchasedetails.get(0).getQuantity()));
									purchasedetails.get(0).setQuantity(ps.get(i).getQuantity() + purchasedetails.get(0).getQuantity());
								}else{
									s = new Purchasedetail();
									s.setMainid(ps.get(i).getMainid());
									s.setMoney(ps.get(i).getPrice()*ps.get(i).getQuantity());
									s.setPrice(ps.get(i).getPrice());
									s.setQuantity(ps.get(i).getQuantity());
									s.setProductid(productid);
									s.setProductspecid(productspecid);
									s.setProductunitid(productunitid);
									s.setStatus(1);
									session.save(s);
								}
							}
						}else{
							List<Purchasedetail> purchasedetails = session.createSQLQuery("select * from purchasedetail where status=1 and id="+ ps.get(i).getId()).addEntity(Purchasedetail.class).list();
							if(purchasedetails.isEmpty()){
								result = mmessage.datachange;
								break;
							}else{
								oldmainid = purchasedetails.get(0).getMainid();
								List<Purchasedetail> is = session.createSQLQuery("select * from purchasedetail where status=1 and id<>"+ ps.get(i).getId() +" and productid="+ productid +" and productspecid="+ productspecid +" and mainid="+ ps.get(i).getMainid()).addEntity(Purchasedetail.class).list();
								if(is.isEmpty()){
									purchasedetails.get(0).setMoney(ps.get(i).getPrice()*ps.get(i).getQuantity());
									purchasedetails.get(0).setPrice(ps.get(i).getPrice());
									purchasedetails.get(0).setQuantity(ps.get(i).getQuantity());
									purchasedetails.get(0).setProductid(productid);
									purchasedetails.get(0).setProductspecid(productspecid);
									purchasedetails.get(0).setProductunitid(productunitid);
									purchasedetails.get(0).setMainid(ps.get(i).getMainid());
								}else{
									purchasedetails.get(0).setMainid(ps.get(i).getMainid());
									purchasedetails.get(0).setMoney(ps.get(i).getPrice()*(ps.get(i).getQuantity() + is.get(0).getQuantity()));
									purchasedetails.get(0).setQuantity(ps.get(i).getQuantity() + is.get(0).getQuantity());
									Query q0 = session.createSQLQuery("update purchasedetail set status=0 where id="+ is.get(0).getId());
									q0.executeUpdate();
								}
							}
						}					
				        session.getTransaction().commit();	
						HibernateUtil_new.closeSession();
						session = HibernateUtil_new.currentSession();
						session.beginTransaction();
						if(oldmainid != ps.get(i).getMainid()){
							List<Object[]> o0 = session.createSQLQuery("select sum(money),sum(quantity) from purchasedetail where status=1 and mainid="+ oldmainid).list();
							if(!o0.isEmpty()){
								String t = "0";
								String tq = "0";
								if(o0.get(0)[0] != null){
									t = o0.get(0)[0].toString();
								}
								if(o0.get(0)[1] != null){
									tq = o0.get(0)[1].toString();
								}
								Query q0 = session.createSQLQuery("update purchase set total = "+ t +",totalquantity="+ tq +" where id="+ oldmainid);
								q0.executeUpdate();
							}
						}
				        session.getTransaction().commit();	
				        result = mmessage.savesuccess;					
					}
					//update total and totalquantity
					int mainid = 0;
					for(int i=0;i<ps.size();i++){
						if(mainid != ps.get(i).getMainid()){
							mainid = ps.get(i).getMainid();
							HibernateUtil_new.closeSession();
							session = HibernateUtil_new.currentSession();
							session.beginTransaction();
							List<Object[]> o0 = session.createSQLQuery("select sum(money),sum(quantity) from purchasedetail where status=1 and mainid="+ mainid).list();
							if(!o0.isEmpty()){
								String t = "0";
								String tq = "0";
								if(o0.get(0)[0] != null){
									t = o0.get(0)[0].toString();
								}
								if(o0.get(0)[1] != null){
									tq = o0.get(0)[1].toString();
								}
								Query q0 = session.createSQLQuery("update purchase set total = "+ t +",totalquantity="+ tq +" where id="+ mainid);
								q0.executeUpdate();
								session.getTransaction().commit();
							}
						}
					}
				}
			}									
		}
		HibernateUtil_new.closeSession();
		return result;
	}
}
