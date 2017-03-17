package com.mbusiness.impl;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;

import com.mbusiness.dao.ProducttypeListDAO;
import com.mbusiness.model.Producttype;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.CommonJudgeDB;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Inputverify;
import com.mbusiness.util.MMessage;

public class ProducttypeListImpl implements ProducttypeListDAO {
	
	private Session ss;
	private MMessage mmessage = new MMessage();
	private List<Producttype> producttypes = new ArrayList<Producttype>();
	private Inputverify inputverify = new Inputverify();
	private HasPermission hasPermission = new HasPermission();
	private String statement;
	private String msql;
	private String ssql;
	@Override
	public List<Producttype> list(Usersession usersession, String idtype, String typeid, int start, int limit, int page) {
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
			Producttype a = new Producttype();
			a.setName(mmessage.stringillegal);
			a.setZdy1("1");
			a.setZdy2("");
			a.setId(0);
			producttypes.add(a);
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
						producttypes = ss.createSQLQuery("select * from producttype where status=1 order by id").addEntity(Producttype.class).list();
						if(!producttypes.isEmpty()){
							producttypes.get(0).setZdy1(producttypes.size()+"");
						}
					}else if(idtype.equalsIgnoreCase("allwithlimit")){
						msql = "select * from producttype where status=1 order by id limit "+ start +","+ limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
								"select * from producttype where status=1) M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						producttypes = ss.createSQLQuery(statement).addEntity(Producttype.class).list();
						if(!producttypes.isEmpty()){
							List<Object> o = ss.createSQLQuery("select id from producttype where status=1 order by id ").list();
							producttypes.get(0).setZdy1(o.size()+"");
						}
					}else if(idtype.equalsIgnoreCase("search")){
						msql = "select * from producttype where status=1 and (name like '%"+ typeid +"%') order by id limit "+ start +","+ limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
								"select * from producttype where status=1 and (name like '%"+ typeid +"%')) M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						producttypes = ss.createSQLQuery(statement).addEntity(Producttype.class).list();
						if(!producttypes.isEmpty()){
							List<Object> o = ss.createSQLQuery("select id from producttype where status=1 and (name like '%"+ typeid +"%')").list();
							producttypes.get(0).setZdy1(o.size()+"");
						}
					}else if(idtype.equalsIgnoreCase("export")){
						producttypes = ss.createSQLQuery("select * from producttype where status=1 order by id").addEntity(Producttype.class).list();
						if(!producttypes.isEmpty()){
							producttypes.get(0).setZdy1(producttypes.size()+"");
						}
					}
					if (producttypes.isEmpty()){
						Producttype a = new Producttype();
						a.setName(mmessage.nodata);	
						a.setZdy1("1");
						a.setZdy2("");
						a.setId(0);
						producttypes.add(a);
					}
				}else{
					producttypes = new ArrayList<Producttype>();
					if (producttypes.isEmpty()){
						Producttype a = new Producttype();
						a.setName(mmessage.nopermission);
						a.setZdy1("1");
						a.setZdy2("");
						a.setId(0);
						producttypes.add(a);
					}
				}				
			}else{
				producttypes = new ArrayList<Producttype>();
				if (producttypes.isEmpty()){
					Producttype a = new Producttype();
					a.setName(mmessage.notlogin);
					a.setZdy1("1");
					a.setZdy2("");
					a.setId(0);
					producttypes.add(a);
				}
			}
		}
		
		HibernateUtil_new.closeSession();
		return producttypes;
	}

}
