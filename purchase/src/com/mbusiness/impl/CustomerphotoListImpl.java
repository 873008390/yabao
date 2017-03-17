package com.mbusiness.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;

import com.mbusiness.dao.CustomerphotoListDAO;
import com.mbusiness.model.Customerphoto;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.CommonJudgeDB;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Inputverify;
import com.mbusiness.util.MMessage;

public class CustomerphotoListImpl implements CustomerphotoListDAO {
	
	private Session ss;
	private MMessage mmessage = new MMessage();
	private List<Customerphoto> customerphotos = new ArrayList<Customerphoto>();
	private String ip = org.apache.struts2.ServletActionContext.getRequest().getRemoteAddr();
	private Inputverify inputverify = new Inputverify();
	private String statement;
	private String msql;
	private String ssql;
	@Override
	public List<Customerphoto> list(Usersession usersession, String idtype, String typeid, int start, int limit, int page) {
		//iFlag=0 mysql; iFlag=1 sqlserver
		int iFlag = CommonJudgeDB.judgeDB();
		HibernateUtil_new.closeSession();
		ss = HibernateUtil_new.currentSession();
		ss.beginTransaction();
		int flag = 1;
		if(idtype != null){
			if(inputverify.check(idtype) != 1){
				flag = 0;
			}
		}
		if(typeid != null){
			if(inputverify.check(typeid) != 1){
				flag = 0;
			}
		}
		if(flag == 0){
			Customerphoto a = new Customerphoto();
			a.setZdy2("");
			a.setUrl(mmessage.stringillegal);
			a.setZdy1("1");
			a.setZdy3("");
			a.setZdy4("");
			a.setId(0);
			customerphotos.add(a);
		}else{
			if(idtype.equalsIgnoreCase("all")){
				customerphotos = ss.createSQLQuery("select * from customerphoto where status=1 order by id").addEntity(Customerphoto.class).list();
				if(!customerphotos.isEmpty()){
					customerphotos.get(0).setZdy1(customerphotos.size()+"");
				}
			}else if(idtype.equalsIgnoreCase("allwithlimit")){
				msql = "select * from customerphoto where status=1 order by id limit "+ start +","+ limit;
				
				ssql = "select top "+ limit +"* (select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
						"select * from customerphoto where status=1 order by id) M) L where L.rownumber>" + start;
				if(iFlag == 0){
					statement = msql;
				}else{
					statement = ssql;
				}
				customerphotos = ss.createSQLQuery(statement).addEntity(Customerphoto.class).list();
				if(!customerphotos.isEmpty()){
					List<Object> o = ss.createSQLQuery("select id from customerphoto where status=1 order by id ").list();
					customerphotos.get(0).setZdy1(o.size()+"");
				}
			}else if(idtype.equalsIgnoreCase("search")){
				msql = "select * from customerphoto where status=1 and (title like '%"+ typeid +"%' or content like '%"+ typeid +"%' or cityid in(select id from city where status=1 and name like '%"+ typeid +"%')) order by id limit "+ start +","+ limit;
				
				ssql = "select top "+ limit +"* (select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
						"select * from customerphoto where status=1 and (title like '%"+ typeid +"%' or content like '%"+ typeid +"%' or cityid in(select id from city where status=1 and name like '%"+ typeid +"%')) order by id) M) L where L.rownumber>" + start;
				if(iFlag == 0){
					statement = msql;
				}else{
					statement = ssql;
				}
				customerphotos = ss.createSQLQuery(statement).addEntity(Customerphoto.class).list();
				if(!customerphotos.isEmpty()){
					List<Object> o = ss.createSQLQuery("select id from customerphoto where status=1 and (title like '%"+ typeid +"%' or content like '%"+ typeid +"%')").list();
					customerphotos.get(0).setZdy1(o.size()+"");
				}
			}else if(idtype.equalsIgnoreCase("photo")){
				msql = "select * from customerphoto where status=1 and customerid="+ typeid +" order by id limit "+ start +","+ limit;
				
				ssql = "select top "+ limit +"* (select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
						"select * from customerphoto where status=1 and customerid="+ typeid +" order by id) M) L where L.rownumber>" + start;
				if(iFlag == 0){
					statement = msql;
				}else{
					statement = ssql;
				}
				customerphotos = ss.createSQLQuery(statement).addEntity(Customerphoto.class).list();
				if(!customerphotos.isEmpty()){					
					List<Object> o00 = ss.createSQLQuery("select url from customerphoto where status=1 and customerid="+ typeid).list();
					customerphotos.get(0).setZdy1(""+ o00.size());
				}
			}else if(idtype.equalsIgnoreCase("customer")){
				msql = "select * from customerphoto where status=1 and customerid="+ typeid +" order by id limit "+ start +","+ limit;
				
				ssql = "select top "+ limit +"* (select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
						"select * from customerphoto where status=1 and customerid="+ typeid +" order by id) M) L where L.rownumber>" + start;
				if(iFlag == 0){
					statement = msql;
				}else{
					statement = ssql;
				}
				customerphotos = ss.createSQLQuery(statement).addEntity(Customerphoto.class).list();
				if(!customerphotos.isEmpty()){					
					List<Object> o00 = ss.createSQLQuery("select url from customerphoto where status=1 and customerid="+ typeid).list();
					customerphotos.get(0).setZdy1(""+ o00.size());
				}
			}
			if (customerphotos.isEmpty()){
				Customerphoto a = new Customerphoto();
				a.setZdy2("");	
				a.setUrl(mmessage.nodata);
				a.setZdy1("1");
				a.setZdy3("");
				a.setZdy4("");					
				a.setId(0);
				customerphotos.add(a);
			}else{
				SimpleDateFormat sformat = new SimpleDateFormat("yyyy-MM-dd");
				for(int i=0;i<customerphotos.size();i++){
					if(idtype.equalsIgnoreCase("photo")){
						
					}else{
						if(customerphotos.get(i).getCreatedate() != null){
							customerphotos.get(i).setZdy2(sformat.format(customerphotos.get(i).getCreatedate()));
						}
						if(customerphotos.get(i).getUrl() != null && !customerphotos.get(i).getUrl().equalsIgnoreCase("")){
							customerphotos.get(i).setUrl("<a href='"+ customerphotos.get(i).getUrl() +"' target='_blank'><img src='"+ customerphotos.get(i).getUrl() +"' border='0' height='100'/></a>");
						}
						List<Object> o = ss.createSQLQuery("select keyname from keyvalue where status=1 and type=21 and value='"+ customerphotos.get(i).getType() +"'").list();
						if(!o.isEmpty()){
							customerphotos.get(i).setZdy3(o.get(0).toString());
						}else{
							customerphotos.get(i).setZdy3("");
						}
					}
				}
			}
		}
		
		HibernateUtil_new.closeSession();
		return customerphotos;
	}

}
