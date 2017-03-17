package com.mbusiness.impl;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;

import com.mbusiness.dao.ProductspecListDAO;
import com.mbusiness.model.Productspec;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.CommonJudgeDB;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Inputverify;
import com.mbusiness.util.MMessage;

public class ProductspecListImpl implements ProductspecListDAO {
	
	private Session ss;
	private MMessage mmessage = new MMessage();
	private List<Productspec> productspecs = new ArrayList<Productspec>();
	private Inputverify inputverify = new Inputverify();
	private HasPermission hasPermission = new HasPermission();
	private String statement;
	private String msql;
	private String ssql;
	@Override
	public List<Productspec> list(Usersession usersession, String idtype, String typeid, int start, int limit, int page) {
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
			Productspec a = new Productspec();
			a.setName(mmessage.stringillegal);
			a.setZdy1("1");
			a.setZdy2("");
			a.setId(0);
			productspecs.add(a);
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
						productspecs = ss.createSQLQuery("select * from productspec where status=1 order by id").addEntity(Productspec.class).list();
						if(!productspecs.isEmpty()){
							productspecs.get(0).setZdy1(productspecs.size()+"");
						}
					}else if(idtype.equalsIgnoreCase("allwithlimit")){
						msql = "select * from productspec where status=1 order by id limit "+ start +","+ limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
								"select * from productspec where status=1) M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						productspecs = ss.createSQLQuery(statement).addEntity(Productspec.class).list();
						if(!productspecs.isEmpty()){
							List<Object> o = ss.createSQLQuery("select id from productspec where status=1 order by id ").list();
							productspecs.get(0).setZdy1(o.size()+"");
						}
					}else if(idtype.equalsIgnoreCase("search")){
						msql = "select * from productspec where status=1 and (name like '%"+ typeid +"%') order by id limit "+ start +","+ limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
								"select * from productspec where status=1 and (name like '%"+ typeid +"%')) M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						productspecs = ss.createSQLQuery(statement).addEntity(Productspec.class).list();
						if(!productspecs.isEmpty()){
							List<Object> o = ss.createSQLQuery("select id from productspec where status=1 and (name like '%"+ typeid +"%')").list();
							productspecs.get(0).setZdy1(o.size()+"");
						}
					}else if(idtype.equalsIgnoreCase("export")){
						productspecs = ss.createSQLQuery("select * from productspec where status=1 order by id").addEntity(Productspec.class).list();
						if(!productspecs.isEmpty()){
							productspecs.get(0).setZdy1(productspecs.size()+"");
						}
					}
					if (productspecs.isEmpty()){
						Productspec a = new Productspec();
						a.setName(mmessage.nodata);	
						a.setZdy1("1");
						a.setZdy2("");
						a.setId(0);
						productspecs.add(a);
					}
				}else{
					productspecs = new ArrayList<Productspec>();
					if (productspecs.isEmpty()){
						Productspec a = new Productspec();
						a.setName(mmessage.nopermission);
						a.setZdy1("1");
						a.setZdy2("");
						a.setId(0);
						productspecs.add(a);
					}
				}				
			}else{
				productspecs = new ArrayList<Productspec>();
				if (productspecs.isEmpty()){
					Productspec a = new Productspec();
					a.setName(mmessage.notlogin);
					a.setZdy1("1");
					a.setZdy2("");
					a.setId(0);
					productspecs.add(a);
				}
			}
		}
		
		HibernateUtil_new.closeSession();
		return productspecs;
	}

}
