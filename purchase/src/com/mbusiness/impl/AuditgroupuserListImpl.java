package com.mbusiness.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.hibernate.Session;

import com.mbusiness.dao.AuditgroupuserListDAO;
import com.mbusiness.model.Auditgroupuser;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.CommonJudgeDB;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Inputverify;
import com.mbusiness.util.MMessage;

public class AuditgroupuserListImpl implements AuditgroupuserListDAO {
	
	private Session ss;
	private MMessage mmessage = new MMessage();
	private List<Auditgroupuser> auditgroupusers;
	private HasPermission hasPermission = new HasPermission();
	private Inputverify inputverify = new Inputverify();
	private String statement;
	private String msql;
	private String ssql;
	@Override
	public List<Auditgroupuser> list(Usersession usersession, String idtype, String typeid, int start, int limit, int page) {
		//iFlag=0 mysql; iFlag=1 sqlserver
		int iFlag = CommonJudgeDB.judgeDB();
		HibernateUtil_new.closeSession();
		ss = HibernateUtil_new.currentSession();
		ss.beginTransaction();
		auditgroupusers = new ArrayList<Auditgroupuser>();
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
			Auditgroupuser a = new Auditgroupuser();
			a.setZdy3(mmessage.stringillegal);
			a.setZdy1("1");
			a.setZdy2("");
			a.setZdy4("");
			a.setId(0);
			auditgroupusers.add(a);
		}else{
			if (!usersession.getUsername().equalsIgnoreCase("")){
				flag = 0;
				if(usersession.getUsername().equalsIgnoreCase("admin")){
					flag = 1;
				}else{					
					if (hasPermission.hasPermission(usersession.getUsername(), "auditgroup", "searchdata", ss) == 1){
						flag = 1;						
					}
				}
				if(flag == 1){
					SimpleDateFormat sformat = new SimpleDateFormat("yyyy-MM-dd");
					ListAuditgroup la = new ListAuditgroup();
					String auditgroupids = la.list(usersession.getUsername(), ss);
					String sql = " and mainid in("+ auditgroupids +")";
					if(idtype.equalsIgnoreCase("all")){
						auditgroupusers = ss.createSQLQuery("select * from auditgroupuser where status=1 "+ sql +" order by id").addEntity(Auditgroupuser.class).list();
						if(!auditgroupusers.isEmpty()){
							auditgroupusers.get(0).setZdy1(auditgroupusers.size()+"");
						}
					}else if(idtype.equalsIgnoreCase("allwithlimit")){
						msql = "select * from auditgroupuser where status=1 "+ sql +" order by id limit "+ start +","+ limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
								"select * from auditgroupuser where status=1 "+ sql +") M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						auditgroupusers = ss.createSQLQuery(statement).addEntity(Auditgroupuser.class).list();
						if(!auditgroupusers.isEmpty()){
							List<Object> o = ss.createSQLQuery("select id from auditgroupuser where status=1 "+ sql +" order by id ").list();
							auditgroupusers.get(0).setZdy1(o.size()+"");
						}
					}else if(idtype.equalsIgnoreCase("search")){
						msql = "select * from auditgroupuser where status=1 "+ sql +" and (auditgroupuserno like '%"+ typeid +"%' or type in(select value from keyvalue where status=1 and keyname like '%"+ typeid +"%')) order by id limit "+ start +","+ limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
								"select * from auditgroupuser where status=1 "+ sql +" and (auditgroupuserno like '%"+ typeid +"%' or type in(select value from keyvalue where status=1 and keyname like '%"+ typeid +"%'))) M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						auditgroupusers = ss.createSQLQuery(statement).addEntity(Auditgroupuser.class).list();
						if(!auditgroupusers.isEmpty()){
							List<Object> o = ss.createSQLQuery("select id from auditgroupuser where status=1 "+ sql +" and (title like '%"+ typeid +"%' or content like '%"+ typeid +"%')").list();
							auditgroupusers.get(0).setZdy1(o.size()+"");
						}
					}else if(idtype.equalsIgnoreCase("userwithlimit")){
						msql = "select * from auditgroupuser where status=1 "+ sql +" and userid="+ typeid +" order by id limit "+ start +","+ limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
								"select * from auditgroupuser where status=1 "+ sql +" and userid="+ typeid +") M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						auditgroupusers = ss.createSQLQuery(statement).addEntity(Auditgroupuser.class).list();
						if(!auditgroupusers.isEmpty()){
							List<Object> o = ss.createSQLQuery("select id from auditgroupuser where status=1 "+ sql +" and userid="+ typeid).list();
							auditgroupusers.get(0).setZdy1(o.size()+"");
						}
					}else if(idtype.equalsIgnoreCase("mainid")){
						String sql0 = "and mainid="+ typeid;
						if(typeid.equalsIgnoreCase("0")){
							sql0 = "";
						}
						auditgroupusers = ss.createSQLQuery("select * from auditgroupuser where status=1 "+ sql0 + sql).addEntity(Auditgroupuser.class).list();
						if(!auditgroupusers.isEmpty()){
							auditgroupusers.get(0).setZdy1(""+ auditgroupusers.size());
						}
					}else if(idtype.equalsIgnoreCase("mywithlimit")){
						List<Object> o0 = ss.createSQLQuery("select id from users where status=1 "+ sql +" and account='"+ usersession.getUsername() +"'").list();
						if(!o0.isEmpty()){
							typeid = o0.get(0).toString();
						}
						msql = "select * from auditgroupuser where status=1 "+ sql +" and mainid in(select id from auditgroup where status=1 and userid="+ typeid +") order by -id limit "+ start +","+ limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id desc) as rownumber,M.* from(" +
								"select * from auditgroupuser where status=1 "+ sql +" and mainid in(select id from auditgroup where status=1 and userid="+ typeid +")) M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						auditgroupusers = ss.createSQLQuery(statement).addEntity(Auditgroupuser.class).list();
						if(!auditgroupusers.isEmpty()){
							auditgroupusers.get(0).setZdy1(""+ auditgroupusers.size());
						}
					}
					if (auditgroupusers.isEmpty()){
						Auditgroupuser a = new Auditgroupuser();
						a.setZdy3(mmessage.nodata);
						a.setMainid(0);
						a.setZdy1("1");
						a.setZdy2("");
						a.setZdy4("");					
						a.setId(0);
						auditgroupusers.add(a);
					}else{
						for(int i=0;i<auditgroupusers.size();i++){
							List<Object> o1 = ss.createSQLQuery("select name from users where status=1 and id="+ auditgroupusers.get(i).getUserid()).list();
							if(!o1.isEmpty()){
								auditgroupusers.get(i).setZdy2(o1.get(0).toString());
							}else{
								auditgroupusers.get(i).setZdy2("");
							}
							List<Object> o2 = ss.createSQLQuery("select name from auditgroup where id="+ auditgroupusers.get(i).getMainid()).list();
							if(!o2.isEmpty()){
								auditgroupusers.get(i).setZdy3(o2.get(0).toString());
							}else{
								auditgroupusers.get(i).setZdy3("");
							}
						}
					}
				}else{
					auditgroupusers = new ArrayList<Auditgroupuser>();
					if (auditgroupusers.isEmpty()){
						Auditgroupuser a = new Auditgroupuser();
						a.setZdy3(mmessage.nopermission);
						a.setZdy1("1");
						a.setZdy2("");
						a.setZdy4("");
						a.setId(0);
						auditgroupusers.add(a);
					}
				}				
			}else{
				auditgroupusers = new ArrayList<Auditgroupuser>();
				if (auditgroupusers.isEmpty()){
					Auditgroupuser a = new Auditgroupuser();
					a.setZdy3(mmessage.notlogin);
					a.setZdy1("1");
					a.setZdy2("");
					a.setZdy4("");
					a.setId(0);
					auditgroupusers.add(a);
				}
			}
		}
		
		HibernateUtil_new.closeSession();
		return auditgroupusers;
	}

}
