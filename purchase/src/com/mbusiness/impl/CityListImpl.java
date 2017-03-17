package com.mbusiness.impl;


import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;

import com.mbusiness.dao.CityListDAO;
import com.mbusiness.model.City;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.CommonJudgeDB;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Inputverify;
import com.mbusiness.util.MMessage;

public class CityListImpl implements CityListDAO {
	
	private Session ss;
	private MMessage mmessage = new MMessage();
	private List<City> citys = new ArrayList<City>();
	private Inputverify inputverify = new Inputverify();
	private String statement;
	private String msql;
	private String ssql;
	@Override
	public List<City> list(Usersession usersession, String idtype, String typeid, int start, int limit, int page) {
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
			City a = new City();
			a.setName(mmessage.stringillegal);
			a.setShortname("");
			a.setZdy1("1");
			a.setZdy2("");
			a.setId(0);
			citys.add(a);
		}else{
			if (!usersession.getUsername().equalsIgnoreCase("")){
				if(idtype.equalsIgnoreCase("all")){
					citys = ss.createSQLQuery("select * from city where status=1 order by id").addEntity(City.class).list();
					if(!citys.isEmpty()){
						citys.get(0).setZdy1(citys.size()+"");
					}
				}else if(idtype.equalsIgnoreCase("province")){
					citys = ss.createSQLQuery("select * from city where status=1 and provinceid="+ typeid +" order by id").addEntity(City.class).list();
					if(!citys.isEmpty()){
						citys.get(0).setZdy1(citys.size()+"");
					}
				}else if(idtype.equalsIgnoreCase("allwithlimit")){
					msql = "select * from city where status=1 order by id limit "+ start +","+ limit;
					
					ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
							"select * from city where status=1) M) L where L.rownumber>" + start;
					if(iFlag == 0){
						statement = msql;
					}else{
						statement = ssql;
					}
					citys = ss.createSQLQuery(statement).addEntity(City.class).list();
					if(!citys.isEmpty()){
						List<Object> o = ss.createSQLQuery("select id from city where status=1 order by id ").list();
						citys.get(0).setZdy1(o.size()+"");
					}
				}else if(idtype.equalsIgnoreCase("search")){
					msql = "select * from city where status=1 and (name like '%"+ typeid +"%' or shortname like '%"+ typeid +"%') order by id limit "+ start +","+ limit;
					
					ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
							"select * from city where status=1 and (name like '%"+ typeid +"%' or shortname like '%"+ typeid +"%')) L where L.rownumber>" + start;
					if(iFlag == 0){
						statement = msql;
					}else{
						statement = ssql;
					}
					citys = ss.createSQLQuery(statement).addEntity(City.class).list();
					if(!citys.isEmpty()){
						List<Object> o = ss.createSQLQuery("select id from city where status=1 and (name like '%"+ typeid +"%' or shortname like '%"+ typeid +"%')").list();
						citys.get(0).setZdy1(o.size()+"");
					}
				}else if(idtype.equalsIgnoreCase("provincewithlimit")){
					msql = "select * from city where status=1 and provinceid="+ typeid +" order by id limit "+ start +","+ limit;
					
					ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
							"select * from city where status=1 and provinceid="+ typeid +") M) L where L.rownumber>" + start;
					if(iFlag == 0){
						statement = msql;
					}else{
						statement = ssql;
					}
					citys = ss.createSQLQuery(statement).addEntity(City.class).list();
					if(!citys.isEmpty()){
						List<Object> o = ss.createSQLQuery("select id from city where status=1 and provinceid="+ typeid).list();
						citys.get(0).setZdy1(o.size()+"");
					}
				}
				if (citys.isEmpty()){
					City a = new City();
					a.setName(mmessage.nodata);	
					a.setShortname("");
					a.setZdy1("1");
					a.setZdy2("");
					a.setId(0);
					citys.add(a);
				}else{
					for(int i=0;i<citys.size();i++){
						List<Object> o1 = ss.createSQLQuery("select name from province where id="+ citys.get(i).getProvinceid()).list();
						if(!o1.isEmpty()){
							citys.get(i).setZdy2(o1.get(0).toString());
						}else{
							citys.get(i).setZdy2("");
						}
					}
				}
			}else{
				citys = new ArrayList<City>();
				if (citys.isEmpty()){
					City a = new City();
					a.setName(mmessage.notlogin);	
					a.setShortname("");
					a.setZdy1("1");
					a.setZdy2("");
					a.setId(0);
					citys.add(a);
				}
			}
		}
		
		HibernateUtil_new.closeSession();
		return citys;
	}

}
