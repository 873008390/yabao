package com.mbusiness.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;

import com.mbusiness.dao.AuditgroupdetailListDAO;
import com.mbusiness.model.Auditgroupdetail;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.CommonJudgeDB;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Inputverify;
import com.mbusiness.util.MMessage;

public class AuditgroupdetailListImpl implements AuditgroupdetailListDAO {
	
	private Session ss;
	private MMessage mmessage = new MMessage();
	private List<Auditgroupdetail> auditgroupdetails;
	private HasPermission hasPermission = new HasPermission();
	private Inputverify inputverify = new Inputverify();
	private String statement;
	private String msql;
	private String ssql;
	@Override
	public List<Auditgroupdetail> list(Usersession usersession, String idtype, String typeid, int start, int limit, int page) {
		//iFlag=0 mysql; iFlag=1 sqlserver
		int iFlag = CommonJudgeDB.judgeDB();
		HibernateUtil_new.closeSession();
		ss = HibernateUtil_new.currentSession();
		ss.beginTransaction();
		auditgroupdetails = new ArrayList<Auditgroupdetail>();
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
			Auditgroupdetail a = new Auditgroupdetail();
			a.setZdy3(mmessage.stringillegal);
			a.setZdy1("1");
			a.setZdy2("");
			a.setZdy4("");
			a.setId(0);
			auditgroupdetails.add(a);
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
					if(idtype.equalsIgnoreCase("all")){
						auditgroupdetails = ss.createSQLQuery("select * from auditgroupdetail where status=1 order by id").addEntity(Auditgroupdetail.class).list();
						if(!auditgroupdetails.isEmpty()){
							auditgroupdetails.get(0).setZdy1(auditgroupdetails.size()+"");
						}
					}else if(idtype.equalsIgnoreCase("allwithlimit")){
						msql = "select * from auditgroupdetail where status=1 order by id limit "+ start +","+ limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
								"select * from auditgroupdetail where status=1) M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						auditgroupdetails = ss.createSQLQuery(statement).addEntity(Auditgroupdetail.class).list();
						if(!auditgroupdetails.isEmpty()){
							List<Object> o = ss.createSQLQuery("select id from auditgroupdetail where status=1 order by id ").list();
							auditgroupdetails.get(0).setZdy1(o.size()+"");
						}
					}else if(idtype.equalsIgnoreCase("search")){
						msql = "select * from auditgroupdetail where status=1 and (auditgroupdetailno like '%"+ typeid +"%' or type in(select value from keyvalue where status=1 and keyname like '%"+ typeid +"%')) order by id limit "+ start +","+ limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
								"select * from auditgroupdetail where status=1 and (auditgroupdetailno like '%"+ typeid +"%' or type in(select value from keyvalue where status=1 and keyname like '%"+ typeid +"%'))) M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						auditgroupdetails = ss.createSQLQuery(statement).addEntity(Auditgroupdetail.class).list();
						if(!auditgroupdetails.isEmpty()){
							List<Object> o = ss.createSQLQuery("select id from auditgroupdetail where status=1 and (title like '%"+ typeid +"%' or content like '%"+ typeid +"%')").list();
							auditgroupdetails.get(0).setZdy1(o.size()+"");
						}
					}else if(idtype.equalsIgnoreCase("userwithlimit")){
						msql = "select * from auditgroupdetail where status=1 and userid="+ typeid +" order by id limit "+ start +","+ limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
								"select * from auditgroupdetail where status=1 and userid="+ typeid +") M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						auditgroupdetails = ss.createSQLQuery(statement).addEntity(Auditgroupdetail.class).list();
						if(!auditgroupdetails.isEmpty()){
							List<Object> o = ss.createSQLQuery("select id from auditgroupdetail where status=1 and userid="+ typeid).list();
							auditgroupdetails.get(0).setZdy1(o.size()+"");
						}
					}else if(idtype.equalsIgnoreCase("mainid")){
						auditgroupdetails = ss.createSQLQuery("select * from auditgroupdetail where status=1 and mainid="+ typeid).addEntity(Auditgroupdetail.class).list();
						if(!auditgroupdetails.isEmpty()){
							auditgroupdetails.get(0).setZdy1(""+ auditgroupdetails.size());
						}
					}else if(idtype.equalsIgnoreCase("mywithlimit")){
						List<Object> o0 = ss.createSQLQuery("select id from users where status=1 and account='"+ usersession.getUsername() +"'").list();
						if(!o0.isEmpty()){
							typeid = o0.get(0).toString();
						}
						msql = "select * from auditgroupdetail where status=1 and mainid in(select id from auditgroup where status=1 and userid="+ typeid +") order by -id limit "+ start +","+ limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id desc) as rownumber,M.* from(" +
								"select * from auditgroupdetail where status=1 and mainid in(select id from auditgroup where status=1 and userid="+ typeid +")) M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						auditgroupdetails = ss.createSQLQuery(statement).addEntity(Auditgroupdetail.class).list();
						if(!auditgroupdetails.isEmpty()){
							auditgroupdetails.get(0).setZdy1(""+ auditgroupdetails.size());
						}
					}
					if (auditgroupdetails.isEmpty()){
						Auditgroupdetail a = new Auditgroupdetail();
						a.setZdy3(mmessage.nodata);
						a.setMainid(0);
						a.setZdy1("1");
						a.setZdy2("");
						a.setZdy4("");					
						a.setId(0);
						auditgroupdetails.add(a);
					}else{
						for(int i=0;i<auditgroupdetails.size();i++){
							List<Object> o1 = ss.createSQLQuery("select name from supplier where status=1 and id="+ auditgroupdetails.get(i).getSupplierid()).list();
							if(!o1.isEmpty()){
								auditgroupdetails.get(i).setZdy2(o1.get(0).toString());
							}else{
								auditgroupdetails.get(i).setZdy2("");
							}
							List<Object> o2 = ss.createSQLQuery("select name from auditgroup where id="+ auditgroupdetails.get(i).getMainid()).list();
							if(!o2.isEmpty()){
								auditgroupdetails.get(i).setZdy3(o2.get(0).toString());
							}else{
								auditgroupdetails.get(i).setZdy3("");
							}
						}
					}
				}else{
					auditgroupdetails = new ArrayList<Auditgroupdetail>();
					if (auditgroupdetails.isEmpty()){
						Auditgroupdetail a = new Auditgroupdetail();
						a.setZdy3(mmessage.nopermission);
						a.setZdy1("1");
						a.setZdy2("");
						a.setZdy4("");
						a.setId(0);
						auditgroupdetails.add(a);
					}
				}				
			}else{
				auditgroupdetails = new ArrayList<Auditgroupdetail>();
				if (auditgroupdetails.isEmpty()){
					Auditgroupdetail a = new Auditgroupdetail();
					a.setZdy3(mmessage.notlogin);
					a.setZdy1("1");
					a.setZdy2("");
					a.setZdy4("");
					a.setId(0);
					auditgroupdetails.add(a);
				}
			}
		}
		
		HibernateUtil_new.closeSession();
		return auditgroupdetails;
	}

}
