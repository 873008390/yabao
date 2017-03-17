package com.mbusiness.impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.mbusiness.dao.PurchaseonlineAddDAO;
import com.mbusiness.model.Purchase;
import com.mbusiness.model.Purchasedetail;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Inputverify;
import com.mbusiness.util.MMessage;
import com.mbusiness.util.SequenceHelper;

public class PurchaseonlineAddImpl implements PurchaseonlineAddDAO {
	
	private String result;
	private Session session;
	private MMessage mmessage = new MMessage();
	private HasPermission hasPermission = new HasPermission();
	private Inputverify inputverify = new Inputverify();
	@Override
	public String add(Usersession usersession, Purchase purchase) {
		SimpleDateFormat sformat = new SimpleDateFormat("yyyy-MM-dd");
		session = HibernateUtil_new.currentSession();
		session.beginTransaction();
		if(usersession.getUsername().equalsIgnoreCase("")){
			result = mmessage.notlogin;
		}else{
			int flag = 1;			
			if(purchase.getZdy1() != null && flag == 1){
				flag = inputverify.check(purchase.getZdy1());
			}
			if(purchase.getZdy2() != null && flag == 1){
				flag = inputverify.check(purchase.getZdy2());
			}
			if(purchase.getZdy3() != null && flag == 1){
				flag = inputverify.check(purchase.getZdy3());
			}
			if(purchase.getZdy4() != null && flag == 1){
				flag = inputverify.check(purchase.getZdy4());
			}
			if(purchase.getZdy5() != null && flag == 1){
				flag = inputverify.check(purchase.getZdy5());
			}
			if(purchase.getZdy6() != null && flag == 1){
				flag = inputverify.check(purchase.getZdy6());
			}
			if(purchase.getZdy7() != null && flag == 1){
				flag = inputverify.check(purchase.getZdy7());
			}
			if(purchase.getZdy8() != null && flag == 1){
				flag = inputverify.check(purchase.getZdy8());
			}
			if(purchase.getZdy9() != null && flag == 1){
				flag = inputverify.check(purchase.getZdy9());
			}
			if(purchase.getZdy10() != null && flag == 1){
				flag = inputverify.check(purchase.getZdy10());
			}
			if(flag != 1){
				result = mmessage.dataillegal;
			}else{
				flag = 0;
				if(hasPermission.hasPermission(usersession.getUsername(), "purchase", "adddata", session) == 0){
					if(usersession.getUsername().equalsIgnoreCase("admin")){
						result = mmessage.adminnopermission;	
					}else{
						result = mmessage.nopermission;
					}
				}else{
					flag = 1;
				}
				if(flag == 1){		
					List<Object[]> o = session.createSQLQuery("select id,orgid from users where status=1 and account='"+ usersession.getUsername() +"'").list();
					if(o.isEmpty()){
						result = mmessage.notlogin;
					}else{
						String details = purchase.getZdy9();
						int mainid = 0;
						List<Object> supplierids = session.createSQLQuery("select id from supplier where status=1 and auditstatus=1 and name='" + purchase.getZdy8() + "'").list();
						int supplierid = 0;
						if(!supplierids.isEmpty()){
							supplierid = Integer.parseInt(supplierids.get(0).toString());
							if(purchase.getId() == 0){
								String purchaseno = "PU";
								SequenceHelper sh = new SequenceHelper();
								int seq = sh.nextValue("purchaseno", session);
								if(seq>-1){								
									if(seq<10){
										purchaseno = purchaseno +"00000000"+ seq;
									}else if(seq<100){
										purchaseno = purchaseno +"0000000"+ seq;
									}else if(seq<1000){
										purchaseno = purchaseno +"000000"+ seq;
									}else if(seq<10000){
										purchaseno = purchaseno +"00000"+ seq;
									}else if(seq<100000){
										purchaseno = purchaseno +"0000"+ seq;
									}else if(seq<1000000){
										purchaseno = purchaseno +"000"+ seq;
									}else if(seq<10000000){
										purchaseno = purchaseno +"00"+ seq;
									}else if(seq<100000000){
										purchaseno = purchaseno +"0"+ seq;
									}else{
										purchaseno = purchaseno + seq;
									}
								}
								Purchase s = new Purchase();
								s.setCreatedate(new Date());
								try {
									s.setPurchasedate(sformat.parse(purchase.getZdy10()));
								} catch (ParseException e) {
									e.printStackTrace();
								}
								s.setSupplierid(supplierid);
								s.setPurchaseno(purchaseno);
								s.setTotal(0);
								s.setTotalquantity(0);
								s.setStatus(1);
								s.setUserid(Integer.parseInt(o.get(0)[0].toString()));
								s.setOrgid(Integer.parseInt(o.get(0)[1].toString()));
								session.save(s);
								session.getTransaction().commit();
								HibernateUtil_new.closeSession();
								session = HibernateUtil_new.currentSession();
								session.beginTransaction();
								List<Object> o1 = session.createSQLQuery("select id from purchase where status=1 and purchaseno='"+ purchaseno +"'").list();
								mainid = Integer.parseInt(o1.get(0).toString());
							}else{
								List<Purchase> purchases = session.createSQLQuery("select * from purchase where status=1 and id="+ purchase.getId()).addEntity(Purchase.class).list();
								if(!purchases.isEmpty()){
									purchases.get(0).setSupplierid(supplierid);
									try {
										purchases.get(0).setPurchasedate(sformat.parse(purchase.getZdy10()));
									} catch (ParseException e) {
									}
									session.getTransaction().commit();
									result = mmessage.savesuccess;
								}
							}
							//save detail
							if(!details.equalsIgnoreCase("-1")){
								Gson gson = new Gson();
								List<Purchasedetail> ps = gson.fromJson("["+ details +"]", new TypeToken<List<Purchasedetail>>(){}.getType());
								Purchasedetail s;
								for(int i=0;i<ps.size();i++){
									HibernateUtil_new.closeSession();
									session = HibernateUtil_new.currentSession();
									session.beginTransaction();
									int productid = 0;
									int productspecid = 0;
									int productunitid = 0;
									String productno = ps.get(i).getZdy2().split("-")[0];
									List<Object[]> o1 = session.createSQLQuery("select id,productspecid from product where status=1 and productno='"+ productno +"'").list();
									if(!o1.isEmpty()){
										productid = Integer.parseInt(o1.get(0)[0].toString());
										productspecid = Integer.parseInt(o1.get(0)[1].toString());
									}
									List<Object> o3 = session.createSQLQuery("select id from productunit where status=1 and name='"+ ps.get(i).getZdy4() +"'").list();
									if(!o3.isEmpty()){
										productunitid = Integer.parseInt(o3.get(0).toString());
									}
									if(ps.get(i).getId() == 0){
										List<Purchasedetail> purchasedetails = session.createSQLQuery("select * from purchasedetail where status=1 and productid="+ productid +" and productspecid="+ productspecid +" and mainid="+ mainid).addEntity(Purchasedetail.class).list();
										if(purchasedetails.isEmpty()){
											s = new Purchasedetail();
											s.setMainid(mainid);
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
											List<Purchasedetail> is = session.createSQLQuery("select * from purchasedetail where status=1 and id<>"+ ps.get(i).getId() +" and productid="+ productid +" and productspecid="+ productspecid +" and mainid="+ mainid).addEntity(Purchasedetail.class).list();
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
									//update total and totalquantity
									List<Object[]> o0 = session.createSQLQuery("select sum(money) totalmoneys,sum(quantity) totalquantitys from purchasedetail where status=1 and mainid="+ mainid).list();
									if(!o0.isEmpty()){
										HibernateUtil_new.closeSession();
										session = HibernateUtil_new.currentSession();
										session.beginTransaction();
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
							        result = mmessage.savesuccess;					
								}
							}
						}else{
							result = mmessage.noaudit;
						}
						
					}
				}
			}									
		}
		HibernateUtil_new.closeSession();
		return result;
	}
}
