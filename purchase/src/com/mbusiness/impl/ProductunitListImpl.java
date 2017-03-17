package com.mbusiness.impl;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;

import com.mbusiness.dao.ProductunitListDAO;
import com.mbusiness.model.Productunit;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.CommonJudgeDB;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Inputverify;
import com.mbusiness.util.MMessage;

public class ProductunitListImpl implements ProductunitListDAO {
	
	private Session ss;
	private MMessage mmessage = new MMessage();
	private List<Productunit> productunits = new ArrayList<Productunit>();
	private Inputverify inputverify = new Inputverify();
	private HasPermission hasPermission = new HasPermission();
	private String statement;
	private String msql;
	private String ssql;
	@Override
	public List<Productunit> list(Usersession usersession, String idtype, String typeid, int start, int limit, int page) {
		//iFlag=0 mysql; iFlag=1 sqlserver
		int iFlag = CommonJudgeDB.judgeDB();
		HibernateUtil_new.closeSession();
		ss = HibernateUtil_new.currentSession();
		ss.beginTransaction();
		int flag = 1;
		if(idtype == null || idtype.equalsIgnoreCase("")){
			flag = 0;
		}else{
			if(inputverify.check(idtype) != 1){
				flag = 0;
			}
		}
		if(typeid == null || typeid.equalsIgnoreCase("")){
			flag = 0;
		}else{
			if(inputverify.check(typeid) != 1){
				flag = 0;
			}
		}
		if(flag == 0){
			Productunit a = new Productunit();
			a.setName(mmessage.stringillegal);
			a.setZdy1("1");
			a.setZdy2("");
			a.setId(0);
			productunits.add(a);
		}else{
			if (!usersession.getUsername().equalsIgnoreCase("")){
				flag = 0;
				if(usersession.getUsername().equalsIgnoreCase("admin")){
					flag = 1;
				}else{					
					if (hasPermission.hasPermission(usersession.getUsername(), "product", "searchdata", ss) == 1){
						flag = 1;						
					}
				}
				if(flag == 1){
					if(idtype.equalsIgnoreCase("all")){
						productunits = ss.createSQLQuery("select * from productunit where status=1 order by id").addEntity(Productunit.class).list();
						if(!productunits.isEmpty()){
							productunits.get(0).setZdy1(productunits.size()+"");
						}
					}else if(idtype.equalsIgnoreCase("allwithlimit")){
						msql = "select * from productunit where status=1 order by id limit "+ start +","+ limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
								"select * from productunit where status=1) M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						productunits = ss.createSQLQuery(statement).addEntity(Productunit.class).list();
						if(!productunits.isEmpty()){
							List<Object> o = ss.createSQLQuery("select id from productunit where status=1 order by id ").list();
							productunits.get(0).setZdy1(o.size()+"");
						}
					}else if(idtype.equalsIgnoreCase("search")){
						msql = "select * from productunit where status=1 and (name like '%"+ typeid +"%') order by id limit "+ start +","+ limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
								"select * from productunit where status=1 and (name like '%"+ typeid +"%')) M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						productunits = ss.createSQLQuery(statement).addEntity(Productunit.class).list();
						if(!productunits.isEmpty()){
							List<Object> o = ss.createSQLQuery("select id from productunit where status=1 and (name like '%"+ typeid +"%')").list();
							productunits.get(0).setZdy1(o.size()+"");
						}
					}else if(idtype.equalsIgnoreCase("export")){
						productunits = ss.createSQLQuery("select * from productunit where status=1 order by id").addEntity(Productunit.class).list();
						if(!productunits.isEmpty()){
							productunits.get(0).setZdy1(productunits.size()+"");
						}
					}
					if (productunits.isEmpty()){
						Productunit a = new Productunit();
						a.setName(mmessage.nodata);	
						a.setZdy1("1");
						a.setZdy2("");
						a.setId(0);
						productunits.add(a);
					}else{
						for(int i=0;i<productunits.size();i++){
							List<Object> o = ss.createSQLQuery("select name from productunit where id="+ productunits.get(i).getDownid()).list();
							if(!o.isEmpty()){
								productunits.get(i).setZdy2(o.get(0).toString());
							}
						}
					}
				}else{
					productunits = new ArrayList<Productunit>();
					if (productunits.isEmpty()){
						Productunit a = new Productunit();
						a.setName(mmessage.nopermission);
						a.setZdy1("1");
						a.setZdy2("");
						a.setId(0);
						productunits.add(a);
					}
				}				
			}else{
				productunits = new ArrayList<Productunit>();
				if (productunits.isEmpty()){
					Productunit a = new Productunit();
					a.setName(mmessage.notlogin);
					a.setZdy1("1");
					a.setZdy2("");
					a.setId(0);
					productunits.add(a);
				}
			}
		}
		
		HibernateUtil_new.closeSession();
		return productunits;
	}

}
