package com.mbusiness.impl;

import java.util.List;

import org.hibernate.Session;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.mbusiness.dao.ProductAddDAO;
import com.mbusiness.model.Product;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Logging;
import com.mbusiness.util.MMessage;

public class ProductAddImpl implements ProductAddDAO {
	
	private String titleValid;
	private String result;
	private Session session;
	private MMessage mmessage = new MMessage();
	private Logging logging = new Logging();
	private HasPermission hasPermission = new HasPermission();
	//private ProductCorporationid productCorporationid = new ProductCorporationid();
	@Override
	public String add(Usersession usersession, Product product) {
		session = HibernateUtil_new.currentSession();
		session.beginTransaction();
		if(usersession.getUsername().equalsIgnoreCase("")){
			result = mmessage.notlogin;
		}else{
			int flag = 0;		
			if(hasPermission.hasPermission(usersession.getUsername(), "product", "adddata", session) == 0){
				if(usersession.getUsername().equalsIgnoreCase("admin")){
					flag = 1;	
				}else{
					result = mmessage.nopermission;
				}
			}else{
				flag = 1;
			}
			if(flag == 1){			
				String details = product.getZdy10();
				
				product.setZdy10("");
				//System.out.println("========"+details);
				
				Gson gson = new Gson();
				List<Product> ps = gson.fromJson("["+ details +"]", new TypeToken<List<Product>>(){}.getType());
				Product s;
				//System.out.println("========"+details);
				for(int i=0;i<ps.size();i++){
					HibernateUtil_new.closeSession();
					session = HibernateUtil_new.currentSession();
					session.beginTransaction();
					int typeid = 0;
					int specid = 0;
					List<Object> o = session.createSQLQuery("select id from productspec where status=1 and name='"+ ps.get(i).getZdy2() +"'").list();
					if(!o.isEmpty()){
						specid = Integer.parseInt(o.get(0).toString());
					}
					List<Object> o1 = session.createSQLQuery("select id from producttype where status=1 and name='"+ ps.get(i).getZdy3() +"'").list();
					if(!o1.isEmpty()){
						typeid = Integer.parseInt(o1.get(0).toString());
					}
					if(ps.get(i).getId() == 0){
						s = new Product();
						s.setName(ps.get(i).getName());
						s.setProducttypeid(typeid);
						s.setProductspecid(specid);
						s.setPeriodofvalidity(ps.get(i).getPeriodofvalidity());
						s.setType(ps.get(i).getType());
						s.setProductno(ps.get(i).getProductno());
						s.setStatus(1);
						session.save(s);
					}else{
						List<Product> products = session.createSQLQuery("select * from product where status=1 and id="+ ps.get(i).getId()).addEntity(Product.class).list();
						if(products.isEmpty()){
							result = mmessage.datachange;
							break;
						}else{
							products.get(0).setName(ps.get(i).getName());
							products.get(0).setProducttypeid(typeid);
							products.get(0).setProductspecid(specid);
							products.get(0).setPeriodofvalidity(ps.get(i).getPeriodofvalidity());
							products.get(0).setType(ps.get(i).getType());
							products.get(0).setProductno(ps.get(i).getProductno());
						}
					}					
			        session.getTransaction().commit();	
			        result = mmessage.savesuccess;					
				}				
			}						
		}
		HibernateUtil_new.closeSession();
		return result;
	}
}
