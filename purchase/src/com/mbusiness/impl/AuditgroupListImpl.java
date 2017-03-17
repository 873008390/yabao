package com.mbusiness.impl;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;

import com.mbusiness.dao.AuditgroupListDAO;
import com.mbusiness.model.Auditgroup;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.CommonJudgeDB;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Inputverify;
import com.mbusiness.util.MMessage;

public class AuditgroupListImpl implements AuditgroupListDAO {
	
	private Session ss;
	private MMessage mmessage = new MMessage();
	private List<Auditgroup> auditgroups = new ArrayList<Auditgroup>();
	private HasPermission hasPermission = new HasPermission();
	private Inputverify inputverify = new Inputverify();
	private String statement;
	private String msql;
	private String ssql;
	@Override
	public List<Auditgroup> list(Usersession usersession, String idtype, String typeid, int start, int limit, int page) {
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
			Auditgroup a = new Auditgroup();
			a.setName(mmessage.stringillegal);
			a.setZdy1("1");
			a.setZdy2("");
			a.setZdy3("");
			a.setZdy4("");
			a.setId(0);
			auditgroups.add(a);
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
					ListAuditgroup la = new ListAuditgroup();
					String auditgroupids = la.list(usersession.getUsername(), ss);
					String sql = " and id in("+ auditgroupids +")";
					if(idtype.equalsIgnoreCase("all")){
						auditgroups = ss.createSQLQuery("select * from auditgroup where status=1 "+ sql +" order by id").addEntity(Auditgroup.class).list();
						if(!auditgroups.isEmpty()){
							auditgroups.get(0).setZdy1(auditgroups.size()+"");
						}
					}else if(idtype.equalsIgnoreCase("allwithlimit")){
						msql = "select * from auditgroup where status=1 "+ sql +" order by id limit "+ start +","+ limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
								"select * from auditgroup where status=1 "+ sql +") M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						auditgroups = ss.createSQLQuery(statement).addEntity(Auditgroup.class).list();
						if(!auditgroups.isEmpty()){
							List<Object> o = ss.createSQLQuery("select id from auditgroup where status=1 "+ sql +" order by id ").list();
							auditgroups.get(0).setZdy1(o.size()+"");
						}
					}else if(idtype.equalsIgnoreCase("search")){
						msql = "select * from auditgroup where status=1 "+ sql +" and (auditgroupno like '%"+ typeid +"%' or type in(select value from keyvalue where status=1 and keyname like '%"+ typeid +"%')) order by id limit "+ start +","+ limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
								"select * from auditgroup where status=1 "+ sql +" and (auditgroupno like '%"+ typeid +"%' or type in(select value from keyvalue where status=1 and keyname like '%"+ typeid +"%'))" +
										") M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						auditgroups = ss.createSQLQuery(statement).addEntity(Auditgroup.class).list();
						if(!auditgroups.isEmpty()){
							List<Object> o = ss.createSQLQuery("select id from auditgroup where status=1 "+ sql +" and (auditgroupno like '%"+ typeid +"%' or type in(select value from keyvalue where status=1 and keyname like '%"+ typeid +"%'))").list();
							auditgroups.get(0).setZdy1(o.size()+"");
						}
					}else if(idtype.equalsIgnoreCase("userwithlimit")){
						msql = "select * from auditgroup where status=1 "+ sql +" and userid="+ typeid +" order by id limit "+ start +","+ limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
								"select * from auditgroup where status=1 "+ sql +" and userid="+ typeid +") M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						auditgroups = ss.createSQLQuery(statement).addEntity(Auditgroup.class).list();
						if(!auditgroups.isEmpty()){
							List<Object> o = ss.createSQLQuery("select id from auditgroup where status=1 "+ sql +" and userid="+ typeid).list();
							auditgroups.get(0).setZdy1(o.size()+"");
						}
					}else if(idtype.equalsIgnoreCase("id")){
						auditgroups = ss.createSQLQuery("select * from auditgroup where status=1 "+ sql +" and id="+ typeid).addEntity(Auditgroup.class).list();
						if(!auditgroups.isEmpty()){
							auditgroups.get(0).setZdy1("1");
						}
					}else if(idtype.equalsIgnoreCase("mywithlimit")){
						List<Object> o0 = ss.createSQLQuery("select id from users where status=1 and account='"+ usersession.getUsername() +"'").list();
						if(!o0.isEmpty()){
							typeid = o0.get(0).toString();
						}
						msql = "select * from auditgroup where status=1 "+ sql +" and userid="+ typeid +" order by id limit "+ start +","+ limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
								"select * from auditgroup where status=1 "+ sql +" and userid="+ typeid +") M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						auditgroups = ss.createSQLQuery(statement).addEntity(Auditgroup.class).list();
						if(!auditgroups.isEmpty()){
							List<Object> o = ss.createSQLQuery("select id from auditgroup where status=1 "+ sql +" and userid="+ typeid).list();
							auditgroups.get(0).setZdy1(o.size()+"");
						}
					}else if(idtype.equalsIgnoreCase("org")){
						auditgroups = ss.createSQLQuery("select * from auditgroup where status=1 "+ sql +" and orgid="+ typeid +" order by id").addEntity(Auditgroup.class).list();
						if(!auditgroups.isEmpty()){
							auditgroups.get(0).setZdy1(auditgroups.size()+"");
						}
					}else if(idtype.equalsIgnoreCase("searchwithlimit")){
						String sql1 = "";
						if(!typeid.equalsIgnoreCase("0")){
							int len = typeid.split("_").length;
							for(int i=0;i<len;i++){
								if(typeid.split("_")[i].indexOf("name")>-1){
									String name = "";
									try {
										name = URLDecoder.decode(typeid.split("_")[i].split("=")[1],"UTF-8");
									} catch (UnsupportedEncodingException e) {
										e.printStackTrace();
									}
									sql1 += " and name like '%"+ name +"%'";
								}
								
							}
						}
						auditgroups = ss.createSQLQuery("select * from auditgroup where status=1 "+ sql + sql1 +" order by -id").addEntity(Auditgroup.class).list();
						if(!auditgroups.isEmpty()){
							auditgroups.get(0).setZdy1(""+ auditgroups.size());
						}
					}
					if (auditgroups.isEmpty()){
						Auditgroup a = new Auditgroup();
						a.setName(mmessage.nodata);
						a.setZdy1("1");
						a.setZdy2("");
						a.setZdy3("");
						a.setZdy4("");					
						a.setId(0);
						auditgroups.add(a);
					}else{
						for(int i=0;i<auditgroups.size();i++){
							List<Object> o = ss.createSQLQuery("select name from org where id="+ auditgroups.get(i).getOrgid()).list();
							if(!o.isEmpty()){
								auditgroups.get(i).setZdy2(o.get(0).toString());
							}else{
								auditgroups.get(i).setZdy2("");
							}
							List<Object> o1 = ss.createSQLQuery("select id from auditgroupuser where status=1 and mainid="+ auditgroups.get(i).getId()).list();
							if(o1.isEmpty()){
								auditgroups.get(i).setZdy3("0");
							}else{
								auditgroups.get(i).setZdy3(""+ o1.size());
							}
						}
					}
				}else{
					auditgroups = new ArrayList<Auditgroup>();
					if (auditgroups.isEmpty()){
						Auditgroup a = new Auditgroup();
						a.setName(mmessage.nopermission);
						a.setZdy1("1");
						a.setZdy2("");
						a.setZdy3("");
						a.setZdy4("");
						a.setId(0);
						auditgroups.add(a);
					}
				}				
			}else{
				auditgroups = new ArrayList<Auditgroup>();
				if (auditgroups.isEmpty()){
					Auditgroup a = new Auditgroup();
					a.setName(mmessage.notlogin);
					a.setZdy1("1");
					a.setZdy2("");
					a.setZdy3("");
					a.setZdy4("");
					a.setId(0);
					auditgroups.add(a);
				}
			}
		}
		
		HibernateUtil_new.closeSession();
		return auditgroups;
	}

}
