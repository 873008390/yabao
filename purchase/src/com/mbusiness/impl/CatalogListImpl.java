package com.mbusiness.impl;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;

import com.mbusiness.dao.CatalogListDAO;
import com.mbusiness.model.Catalog;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Inputverify;
import com.mbusiness.util.MMessage;

public class CatalogListImpl implements CatalogListDAO {
	
	private Session ss;
	private MMessage mmessage = new MMessage();
	private List<Catalog> catalogs = new ArrayList<Catalog>();
	private Inputverify inputverify = new Inputverify();
	
	@Override
	public List<Catalog> list(Usersession usersession, String type) {
		HibernateUtil_new.closeSession();
		ss = HibernateUtil_new.currentSession();
		ss.beginTransaction();
		int flag = 1;
		if(type != null){
			if(inputverify.check(type) != 1){
				flag = 0;
			}
		}
		if(flag == 0){
			Catalog a = new Catalog();
			a.setName(mmessage.stringillegal);
			a.setUrl("login.html");
			a.setId(0);
			catalogs.add(a);
		}else{
			if (!usersession.getUsername().equalsIgnoreCase("")){
				if(type.equalsIgnoreCase("inner")){
					if(usersession.getUsername().equalsIgnoreCase("admin")){
						catalogs = ss.createSQLQuery("select * from catalog where status=1 and type=1 order by upperid,orderid").addEntity(Catalog.class).list();
					}else{
						List<Object> o = ss.createSQLQuery("select type from users where status=1 and account='"+ usersession.getUsername() +"'").list();
						if(!o.isEmpty()){
							if(Integer.parseInt(o.get(0).toString()) == 0){
								catalogs = ss.createSQLQuery("select * from catalog where status=1 and type=1 order by upperid,orderid").addEntity(Catalog.class).list();
							}else if(Integer.parseInt(o.get(0).toString()) == 1){
								catalogs = ss.createSQLQuery("select * from catalog where status=1 and type=2 order by upperid,orderid").addEntity(Catalog.class).list();
							}
						}
					}
				}else if(type.equalsIgnoreCase("allwithlimit")){
					if(usersession.getUsername().equalsIgnoreCase("admin")){
						catalogs = ss.createSQLQuery("select * from catalog where status=1 and type=1 and upperid<>0 order by upperid,orderid").addEntity(Catalog.class).list();
					}else{
						List<Object> o = ss.createSQLQuery("select type from users where status=1 and account='"+ usersession.getUsername() +"'").list();
						if(!o.isEmpty()){
							if(Integer.parseInt(o.get(0).toString()) == 0){
								catalogs = ss.createSQLQuery("select * from catalog where status=1 and type=1 and upperid<>0 order by upperid,orderid").addEntity(Catalog.class).list();
							}else if(Integer.parseInt(o.get(0).toString()) == 1){
								catalogs = ss.createSQLQuery("select * from catalog where status=1 and type=2 and upperid<>0 order by upperid,orderid").addEntity(Catalog.class).list();
							}
						}
					}
				}else if(type.equalsIgnoreCase("saler")){
					catalogs = ss.createSQLQuery("select * from catalog where status=1 and type=3 order by upperid,orderid").addEntity(Catalog.class).list();
				}else if(type.equalsIgnoreCase("drugstore")){
					catalogs = ss.createSQLQuery("select * from catalog where status=1 and type=4 order by upperid,orderid").addEntity(Catalog.class).list();
				}else if(type.equalsIgnoreCase("patient")){
					catalogs = ss.createSQLQuery("select * from catalog where status=1 and type=5 order by upperid,orderid").addEntity(Catalog.class).list();
				}else if(type.indexOf("search")>-1){
					catalogs = ss.createSQLQuery("select * from catalog where status=1 and name='"+ type.split("_")[1] +"'").addEntity(Catalog.class).list();
					if(!catalogs.isEmpty()){
						Query q = ss.createSQLQuery("select id from permission where status=1 and permission='"+ catalogs.get(0).getShortname() +"'");
						if(q.list().isEmpty()){
							catalogs.clear();
							Catalog a = new Catalog();
							a.setName(mmessage.nodata);	
							a.setId(0);
							a.setUrl("login.html");
							catalogs.add(a);
						}
					}else{
						Catalog a = new Catalog();
						a.setName(mmessage.nodata);	
						a.setId(0);
						a.setUrl("login.html");
						catalogs.add(a);
					}
				}
				if(!catalogs.isEmpty()){
//					for(int i=0;i<catalogs.size();i++){
//						if(catalogs.get(i).getUpperid() == 0){
//							for(int j=0;j<catalogs.size();j++){
//								if(catalogs.get(j).getUpperid() == catalogs.get(i).getId() && catalogs.get(j).getOrderid() == 1){
//									catalogs.get(i).setUrl(catalogs.get(j).getUrl());
//								}
//							}
//						}
//						if(catalogs.get(i).getIcon() == null || catalogs.get(i).getIcon().equalsIgnoreCase("")){
//							catalogs.get(i).setIcon(catalogs.get(i).getShortname() +"list.png");
//						}
//					}
				}else{
					catalogs = new ArrayList<Catalog>();
					Catalog a = new Catalog();
					a.setName(mmessage.nodata);	
					a.setId(0);
					a.setUrl("login.html");
					catalogs.add(a);
				}
			}else{
				catalogs = new ArrayList<Catalog>();
				Catalog a = new Catalog();
				a.setName(mmessage.notlogin);	
				a.setId(0);
				a.setUrl("login.html");
				catalogs.add(a);
			}
		}
		
		HibernateUtil_new.closeSession();
		return catalogs;
	}

}
