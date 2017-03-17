package com.mbusiness.impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.hibernate.Session;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.mbusiness.dao.PurchaseAddDAO;
import com.mbusiness.model.Purchase;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Inputverify;
import com.mbusiness.util.MMessage;
import com.mbusiness.util.SequenceHelper;

public class PurchaseAddImpl implements PurchaseAddDAO {
	
	private String result;
	private Session session;
	private MMessage mmessage = new MMessage();
	private HasPermission hasPermission = new HasPermission();
	private Inputverify inputverify = new Inputverify();
	//private PurchaseCorporationid purchaseCorporationid = new PurchaseCorporationid();
	@Override
	public String add(Usersession usersession, Purchase purchase) {
		SimpleDateFormat sformat = new SimpleDateFormat("yyyy-MM-dd");
		session = HibernateUtil_new.currentSession();
		session.beginTransaction();
		if(usersession.getUsername().equalsIgnoreCase("")){
			result = mmessage.notlogin;
		}else{
			String details = purchase.getZdy10();			
			purchase.setZdy10("");
			//System.out.print(""+ inputverify.check(details));
			int flag = 1;			
			if(purchase.getZdy10() != null){
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
					List<Purchase> ps = gson.fromJson("["+ details +"]", new TypeToken<List<Purchase>>(){}.getType());
					Purchase s;
					//System.out.println("========"+details);
					for(int i=0;i<ps.size();i++){
						HibernateUtil_new.closeSession();
						session = HibernateUtil_new.currentSession();
						session.beginTransaction();
						List<Object> o = session.createSQLQuery("select id from users where status=1 and account='"+ usersession.getUsername() +"'").list();
						if(o.isEmpty()){
							result = mmessage.notlogin;
							break;
						}
						int supplierid = 0;
						if(ps.get(i).getZdy4() != null){
							List<Object> o2 = session.createSQLQuery("select id from supplier where status=1 and auditstatus=1 and name='"+ ps.get(i).getZdy4() +"'").list();
							if(!o2.isEmpty()){
								supplierid = Integer.parseInt(o2.get(0).toString());
							}else{
								result = mmessage.supplierinvalid +"["+ ps.get(i).getZdy5() +"]";
								break;
							}
						}
						if(ps.get(i).getId() == 0){
							String purchaseno = ps.get(i).getPurchaseno();
							purchaseno = "PU";
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
							s = new Purchase();
							s.setCreatedate(new Date());
							try {
								s.setPurchasedate(sformat.parse(ps.get(i).getZdy2()));
							} catch (ParseException e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							}
							s.setSupplierid(supplierid);
							s.setPurchaseno(purchaseno);
							s.setTotal(0);
							s.setTotalquantity(0);
							s.setStatus(1);
							s.setUserid(Integer.parseInt(o.get(0).toString()));
							session.save(s);
						}else{
							List<Purchase> purchases = session.createSQLQuery("select * from purchase where status=1 and id="+ ps.get(i).getId()).addEntity(Purchase.class).list();
							if(purchases.isEmpty()){
								result = mmessage.datachange;
								break;
							}else{
								List<Object> o0 = session.createSQLQuery("select id from purchase where status=1 and purchaseno='"+ ps.get(i).getPurchaseno() +"'").list();
								if(!o0.isEmpty()){
									if(Integer.parseInt(o0.get(0).toString()) != ps.get(i).getId()){
										result = mmessage.noduplicate +"["+ ps.get(i).getPurchaseno() +"]";
										break;
									}
								}
								purchases.get(0).setPurchaseno(ps.get(i).getPurchaseno());
								try {
									purchases.get(0).setPurchasedate(sformat.parse(ps.get(i).getZdy2()));
								} catch (ParseException e) {
									// TODO Auto-generated catch block
								}
								purchases.get(0).setSupplierid(supplierid);
								purchases.get(0).setZdy5(ps.get(i).getZdy8());
								purchases.get(0).setZdy6(ps.get(i).getZdy6());
								purchases.get(0).setZdy7(ps.get(i).getZdy7());
							}
						}					
				        session.getTransaction().commit();	
				        result = mmessage.savesuccess;					
					}				
				}
			}									
		}
		HibernateUtil_new.closeSession();
		return result;
	}
}
