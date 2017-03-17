package com.mbusiness.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.hibernate.Session;

import com.mbusiness.dao.AuditlogListDAO;
import com.mbusiness.model.Auditlog;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.CommonJudgeDB;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Inputverify;
import com.mbusiness.util.MMessage;

public class AuditlogListImpl implements AuditlogListDAO {
	
	private Session ss;
	private MMessage mmessage = new MMessage();
	private List<Auditlog> auditlogs;
	private HasPermission hasPermission = new HasPermission();
	private Inputverify inputverify = new Inputverify();
	private String statement;
	private String msql;
	private String ssql;
	@Override
	public List<Auditlog> list(Usersession usersession, String idtype, String typeid, int start, int limit, int page) {
		//iFlag=0 mysql; iFlag=1 sqlserver
		int iFlag = CommonJudgeDB.judgeDB();
		HibernateUtil_new.closeSession();
		ss = HibernateUtil_new.currentSession();
		ss.beginTransaction();
		auditlogs = new ArrayList<Auditlog>();
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
			Auditlog a = new Auditlog();
			a.setOperation(mmessage.stringillegal);
			a.setZdy1("1");
			a.setZdy2("");
			a.setZdy3("");
			a.setZdy4("");
			a.setId(0);
			auditlogs.add(a);
		}else{
			if (!usersession.getUsername().equalsIgnoreCase("")){
				flag = 0;
				if(usersession.getUsername().equalsIgnoreCase("admin")){
					flag = 1;
				}else{					
					if (hasPermission.hasPermission(usersession.getUsername(), "supplier", "searchdata", ss) == 1){
						flag = 1;						
					}
				}
				if(flag == 1){
					SimpleDateFormat sformat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
					if(idtype.equalsIgnoreCase("all")){
						auditlogs = ss.createSQLQuery("select * from auditlog where status=1 order by id").addEntity(Auditlog.class).list();
						if(!auditlogs.isEmpty()){
							auditlogs.get(0).setZdy1(auditlogs.size()+"");
						}
					}else if(idtype.equalsIgnoreCase("allwithlimit")){
						msql = "select * from auditlog where status=1 order by id limit "+ start +","+ limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
								"select * from auditlog where status=1) M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						auditlogs = ss.createSQLQuery(statement).addEntity(Auditlog.class).list();
						if(!auditlogs.isEmpty()){
							List<Object> o = ss.createSQLQuery("select id from auditlog where status=1 order by id ").list();
							auditlogs.get(0).setZdy1(o.size()+"");
						}
					}else if(idtype.equalsIgnoreCase("supplier")){
						auditlogs = ss.createSQLQuery("select * from auditlog where status=1 and supplierid="+ typeid).addEntity(Auditlog.class).list();
						if(!auditlogs.isEmpty()){
							auditlogs.get(0).setZdy1(""+ auditlogs.size());
						}
					}
					if (auditlogs.isEmpty()){
						Auditlog a = new Auditlog();
						a.setOperation(mmessage.nodata);
						a.setZdy3("");
						a.setZdy1("1");
						a.setZdy2("");
						a.setZdy4("");					
						a.setId(0);
						auditlogs.add(a);
					}else{
						for(int i=0;i<auditlogs.size();i++){
							List<Object> o1 = ss.createSQLQuery("select name from users where status=1 and id="+ auditlogs.get(i).getUserid()).list();
							if(!o1.isEmpty()){
								auditlogs.get(i).setZdy2(o1.get(0).toString());
							}else{
								auditlogs.get(i).setZdy2("");
							}
							List<Object> o2 = ss.createSQLQuery("select name from supplier where id="+ auditlogs.get(i).getSupplierid()).list();
							if(!o2.isEmpty()){
								auditlogs.get(i).setZdy3(o2.get(0).toString());
							}else{
								auditlogs.get(i).setZdy3("");
							}
							List<Object> o3 = ss.createSQLQuery("select name from auditgroup where id="+ auditlogs.get(i).getAuditgroupid()).list();
							if(!o3.isEmpty()){
								auditlogs.get(i).setZdy4(o3.get(0).toString());
							}else{
								auditlogs.get(i).setZdy4("");
							}
							if(auditlogs.get(i).getCreatedate() != null){
								auditlogs.get(i).setZdy5(sformat.format(auditlogs.get(i).getCreatedate()));
							}
						}
					}
				}else{
					auditlogs = new ArrayList<Auditlog>();
					if (auditlogs.isEmpty()){
						Auditlog a = new Auditlog();
						a.setOperation(mmessage.nopermission);
						a.setZdy1("1");
						a.setZdy2("");
						a.setZdy3("");
						a.setZdy4("");
						a.setId(0);
						auditlogs.add(a);
					}
				}				
			}else{
				auditlogs = new ArrayList<Auditlog>();
				if (auditlogs.isEmpty()){
					Auditlog a = new Auditlog();
					a.setOperation(mmessage.notlogin);
					a.setZdy1("1");
					a.setZdy2("");
					a.setZdy3("");
					a.setZdy4("");
					a.setId(0);
					auditlogs.add(a);
				}
			}
		}
		
		HibernateUtil_new.closeSession();
		return auditlogs;
	}

}
