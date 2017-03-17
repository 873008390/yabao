package com.mbusiness.impl;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;

import com.mbusiness.dao.ProvinceListDAO;
import com.mbusiness.model.Province;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.CommonJudgeDB;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Inputverify;
import com.mbusiness.util.MMessage;

public class ProvinceListImpl implements ProvinceListDAO {
	
	private Session ss;
	private MMessage mmessage = new MMessage();
	private List<Province> provinces = new ArrayList<Province>();
	private Inputverify inputverify = new Inputverify();
	private String statement;
	private String msql;
	private String ssql;
	@Override
	public List<Province> list(Usersession usersession, String idtype, String typeid, int start, int limit, int page) {
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
			Province a = new Province();
			a.setName(mmessage.stringillegal);
			a.setShortname("");
			a.setZdy1("1");
			a.setId(0);
			provinces.add(a);
		}else{
			if (!usersession.getUsername().equalsIgnoreCase("")){
				if(idtype.equalsIgnoreCase("all")){
					provinces = ss.createSQLQuery("select * from province where status=1 order by id").addEntity(Province.class).list();
					if(!provinces.isEmpty()){
						provinces.get(0).setZdy1(provinces.size()+"");
					}
				}else if(idtype.equalsIgnoreCase("allwithlimit")){
					msql = "select * from province where status=1 order by id limit "+ start +","+ limit;
					
					ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
							"select * from province where status=1) M) L where L.rownumber>" + start;
					if(iFlag == 0){
						statement = msql;
					}else{
						statement = ssql;
					}
					provinces = ss.createSQLQuery(statement).addEntity(Province.class).list();
					if(!provinces.isEmpty()){
						List<Object> o = ss.createSQLQuery("select id from province where status=1").list();
						provinces.get(0).setZdy1(o.size()+"");
					}
				}else if(idtype.equalsIgnoreCase("search")){
					msql = "select * from province where status=1 and (name like '%"+ typeid +"%' or shortname like '%"+ typeid +"%') order by id limit "+ start +","+ limit;
					
					ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
							"select * from province where status=1 and (name like '%"+ typeid +"%' or shortname like '%"+ typeid +"%')) M) L where L.rownumber>" + start;
					if(iFlag == 0){
						statement = msql;
					}else{
						statement = ssql;
					}
					provinces = ss.createSQLQuery(statement).addEntity(Province.class).list();
					if(!provinces.isEmpty()){
						List<Object> o = ss.createSQLQuery("select id from province where status=1 and (name like '%"+ typeid +"%' or shortname like '%"+ typeid +"%')").list();
						provinces.get(0).setZdy1(o.size()+"");
					}
				}else if(idtype.equalsIgnoreCase("searchwithlimit")){
					String sql1 = "";
					if(!typeid.equalsIgnoreCase("0")){
						int len = typeid.split("_").length;
						for(int i=0;i<len;i++){
							if(typeid.split("_")[i].indexOf("provincename")>-1){
								String provincename = "";
								try {
									provincename = URLDecoder.decode(typeid.split("_")[i].split("=")[1],"UTF-8");
								} catch (UnsupportedEncodingException e) {
									e.printStackTrace();
								}
								sql1 += " and name like '%"+ provincename +"%'";
							}
							if(typeid.split("_")[i].indexOf("shortname")>-1){
								String shortname = "";
								try {
									shortname = URLDecoder.decode(typeid.split("_")[i].split("=")[1],"UTF-8");
								} catch (UnsupportedEncodingException e) {
									e.printStackTrace();
								}
								sql1 += " and shortname like '%"+ shortname +"%'";
							}
						}
					}
					msql = "select * from province where status=1 " + sql1 +" order by -id limit " + start +"," + limit;
					
					ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id desc) as rownumber,M.* from(" +
							"select * from province where status=1 " + sql1 +") M) L where L.rownumber>" + start;
					if(iFlag == 0){
						statement = msql;
					}else{
						statement = ssql;
					}
					provinces = ss.createSQLQuery(statement).addEntity(Province.class).list();
					if(!provinces.isEmpty()){
						List<Object> o = ss.createSQLQuery("select id from province where status=1 " + sql1 +" order by -id").list();
						provinces.get(0).setZdy1(""+ o.size());
					}
				}
				if (provinces.isEmpty()){
					Province a = new Province();
					a.setName(mmessage.nodata);	
					a.setShortname("");
					a.setZdy1("1");
					a.setId(0);
					provinces.add(a);
				}
			}else{
				provinces = new ArrayList<Province>();
				if (provinces.isEmpty()){
					Province a = new Province();
					a.setName(mmessage.notlogin);	
					a.setShortname("");
					a.setZdy1("1");
					a.setId(0);
					provinces.add(a);
				}
			}
		}
		
		HibernateUtil_new.closeSession();
		return provinces;
	}

}
