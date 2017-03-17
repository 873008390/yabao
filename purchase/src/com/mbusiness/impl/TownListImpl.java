package com.mbusiness.impl;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;

import com.mbusiness.dao.TownListDAO;
import com.mbusiness.model.Town;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.CommonJudgeDB;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Inputverify;
import com.mbusiness.util.MMessage;

public class TownListImpl implements TownListDAO {
	
	private Session ss;
	private MMessage mmessage = new MMessage();
	private List<Town> towns = new ArrayList<Town>();
	private Inputverify inputverify = new Inputverify();
	private String statement;
	private String msql;
	private String ssql;
	@Override
	public List<Town> list(Usersession usersession, String idtype, String typeid, int start, int limit, int page) {
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
			Town a = new Town();
			a.setName(mmessage.stringillegal);
			a.setShortname("");
			a.setZdy1("1");
			a.setId(0);
			towns.add(a);
		}else{
			if (!usersession.getUsername().equalsIgnoreCase("")){
				if(idtype.equalsIgnoreCase("all")){
					towns = ss.createSQLQuery("select * from town where status=1 order by id").addEntity(Town.class).list();
					if(!towns.isEmpty()){
						towns.get(0).setZdy1(towns.size()+"");
					}
				}else if(idtype.equalsIgnoreCase("city")){
					towns = ss.createSQLQuery("select * from town where status=1 and cityid="+ typeid +" order by id").addEntity(Town.class).list();
					if(!towns.isEmpty()){
						towns.get(0).setZdy1(towns.size()+"");
					}
				}else if(idtype.equalsIgnoreCase("allwithlimit")){
					msql = "select * from town where status=1 order by id limit "+ start +","+ limit;
					
					ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
							"select * from town where status=1) M) L where L.rownumber>" + start;
					if(iFlag == 0){
						statement = msql;
					}else{
						statement = ssql;
					}
					towns = ss.createSQLQuery(statement).addEntity(Town.class).list();
					if(!towns.isEmpty()){
						List<Object> o = ss.createSQLQuery("select id from town where status=1 order by id ").list();
						towns.get(0).setZdy1(o.size()+"");
					}
				}else if(idtype.equalsIgnoreCase("search")){
					msql = "select * from town where status=1 and (name like '%"+ typeid +"%' or shortname like '%"+ typeid +"%') order by id limit "+ start +","+ limit;
					
					ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
							"select * from town where status=1 and (name like '%"+ typeid +"%' or shortname like '%"+ typeid +"%')) M) L where L.rownumber>" + start;
					if(iFlag == 0){
						statement = msql;
					}else{
						statement = ssql;
					}
					towns = ss.createSQLQuery(statement).addEntity(Town.class).list();
					if(!towns.isEmpty()){
						List<Object> o = ss.createSQLQuery("select id from town where status=1 and (name like '%"+ typeid +"%' or shortname like '%"+ typeid +"%')").list();
						towns.get(0).setZdy1(o.size()+"");
					}
				}else if(idtype.equalsIgnoreCase("citywithlimit")){
					msql = "select * from town where status=1 and cityid="+ typeid +" order by id limit "+ start +","+ limit;
					
					ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
							"select * from town where status=1 and cityid="+ typeid +") M) L where L.rownumber>" + start;
					if(iFlag == 0){
						statement = msql;
					}else{
						statement = ssql;
					}
					towns = ss.createSQLQuery(statement).addEntity(Town.class).list();
					if(!towns.isEmpty()){
						List<Object> o = ss.createSQLQuery("select id from town where status=1 and cityid="+ typeid).list();
						towns.get(0).setZdy1(o.size()+"");
					}
				}
				if (towns.isEmpty()){
					Town a = new Town();
					a.setName(mmessage.nodata);	
					a.setShortname("");
					a.setZdy1("1");
					a.setId(0);
					towns.add(a);
				}else{
					for(int i=0;i<towns.size();i++){
						List<Object> o1 = ss.createSQLQuery("select name from city where id="+ towns.get(i).getCityid()).list();
						if(!o1.isEmpty()){
							towns.get(i).setZdy2(o1.get(0).toString());
						}else{
							towns.get(i).setZdy2("");
						}
					}
				}
			}else{
				towns = new ArrayList<Town>();
				if (towns.isEmpty()){
					Town a = new Town();
					a.setName(mmessage.notlogin);	
					a.setShortname("");
					a.setZdy1("1");
					a.setId(0);
					towns.add(a);
				}
			}
		}
		
		HibernateUtil_new.closeSession();
		return towns;
	}

}
