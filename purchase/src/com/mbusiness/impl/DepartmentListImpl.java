package com.mbusiness.impl;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;

import com.mbusiness.dao.DepartmentListDAO;
import com.mbusiness.model.Department;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.CommonJudgeDB;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Inputverify;
import com.mbusiness.util.MMessage;

public class DepartmentListImpl implements DepartmentListDAO {
	
	private Session ss;
	private MMessage mmessage = new MMessage();
	private List<Department> departments = new ArrayList<Department>();
	private HasPermission hasPermission = new HasPermission();
	private Inputverify inputverify = new Inputverify();
	private String statement;
	private String msql;
	private String ssql;
	@Override
	public List<Department> list(Usersession usersession, String idtype, String typeid, int start, int limit, int page) {
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
			Department a = new Department();
			a.setName(mmessage.stringillegal);
			a.setZdy1("1");
			a.setZdy2("");
			a.setZdy3("");
			a.setId(0);
			departments.add(a);
		}else{
			if (usersession.getUsername().equalsIgnoreCase("")){
				Department a = new Department();
				a.setName(mmessage.notlogin);
				a.setZdy1("1");
				a.setZdy2("");
				a.setZdy3("");
				a.setId(0);
				departments.add(a);
			}else{
				flag = 0;		
				if(hasPermission.hasPermission(usersession.getUsername(), "department", "1", ss) == 0){
					if(usersession.getUsername().equalsIgnoreCase("admin")){
						flag = 1;	
					}else{
						Department a = new Department();
						a.setName(mmessage.nopermission);
						a.setZdy1("1");
						a.setZdy2("");
						a.setZdy3("");
						a.setId(0);
						departments.add(a);
					}
				}else{
					flag = 1;
				}
				if(flag == 1){
					if(idtype.equalsIgnoreCase("all")){
						departments = ss.createSQLQuery("select * from department where status=1 order by id").addEntity(Department.class).list();
						if(!departments.isEmpty()){
							departments.get(0).setZdy1(departments.size()+"");
						}
					}else if(idtype.equalsIgnoreCase("center")){
						departments = ss.createSQLQuery("select * from department where status=1 and upperid="+ typeid +" order by id").addEntity(Department.class).list();
						if(!departments.isEmpty()){
							departments.get(0).setZdy1(departments.size()+"");
						}
					}else if(idtype.equalsIgnoreCase("son")){
						departments = ss.createSQLQuery("select * from department where status=1 and upperid="+ typeid +" order by id").addEntity(Department.class).list();
						if(!departments.isEmpty()){
							departments.get(0).setZdy1(departments.size()+"");
						}
					}else if(idtype.equalsIgnoreCase("allwithlimit")){
						msql = "select * from department where status=1 order by id limit "+ start +","+ limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
								"select * from department where status=1) M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						departments = ss.createSQLQuery(statement).addEntity(Department.class).list();
						if(!departments.isEmpty()){
							List<Object> o = ss.createSQLQuery("select id from department where status=1 order by id ").list();
							departments.get(0).setZdy1(o.size()+"");
						}
					}else if(idtype.equalsIgnoreCase("search")){
						msql = "select * from department where status=1 and (name like '%"+ typeid +"%' or shortname like '%"+ typeid +"%') order by id limit "+ start +","+ limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
								"select * from department where status=1 and (name like '%"+ typeid +"%' or shortname like '%"+ typeid +"%')) M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						departments = ss.createSQLQuery(statement).addEntity(Department.class).list();
						if(!departments.isEmpty()){
							List<Object> o = ss.createSQLQuery("select id from department where status=1 and (name like '%"+ typeid +"%' or shortname like '%"+ typeid +"%')").list();
							departments.get(0).setZdy1(o.size()+"");
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
								if(typeid.split("_")[i].indexOf("job")>-1){
									String zdy10 = "";
									try {
										zdy10 = URLDecoder.decode(typeid.split("_")[i].split("=")[1],"UTF-8");
									} catch (UnsupportedEncodingException e) {
										e.printStackTrace();
									}
									sql1 += " and zdy10 like '%"+ zdy10 +"%'";
								}
								if(typeid.split("_")[i].indexOf("manageruser")>-1){
									String name = "";
									try {
										name = URLDecoder.decode(typeid.split("_")[i].split("=")[1],"UTF-8");
									} catch (UnsupportedEncodingException e) {
										e.printStackTrace();
									};
									List<Object> manageruserids = ss.createSQLQuery("select id from users where status=1 and name like '%" 
											+ name + "%'").list();
									String str = "";
									for(int m=0; m<manageruserids.size(); m++){
										str = str + manageruserids.get(m).toString() + ",";
									}
									if(!str.equalsIgnoreCase("")){
										str = str.substring(0, str.length()-1);
										sql1 += " and manageruserid in("+ str +")";
									}
									
								}
							}
						}
						msql = "select * from department where status=1 " + sql1 +" order by -id limit " + start + "," + limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id desc) as rownumber,M.* from(" +
								"select * from department where status=1 " + sql1 +") M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						departments = ss.createSQLQuery(statement).addEntity(Department.class).list();
						if(!departments.isEmpty()){
							List<Object> o = ss.createSQLQuery("select id from department where status=1 " + sql1 +" order by -id").list();
							departments.get(0).setZdy1(""+ o.size());
						}
					}else if(idtype.equalsIgnoreCase("exportwithlimit")){
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
								if(typeid.split("_")[i].indexOf("job")>-1){
									String zdy10 = "";
									try {
										zdy10 = URLDecoder.decode(typeid.split("_")[i].split("=")[1],"UTF-8");
									} catch (UnsupportedEncodingException e) {
										e.printStackTrace();
									}
									sql1 += " and zdy10 like '%"+ zdy10 +"%'";
								}
								if(typeid.split("_")[i].indexOf("manageruser")>-1){
									String name = "";
									try {
										name = URLDecoder.decode(typeid.split("_")[i].split("=")[1],"UTF-8");
									} catch (UnsupportedEncodingException e) {
										e.printStackTrace();
									};
									List<Object> manageruserids = ss.createSQLQuery("select id from users where status=1 and name like '%" 
											+ name + "%'").list();
									String str = "";
									for(int m=0; m<manageruserids.size(); m++){
										str = str + manageruserids.get(m).toString() + ",";
									}
									if(!str.equalsIgnoreCase("")){
										str = str.substring(0, str.length()-1);
										sql1 += " and manageruserid in("+ str +")";
									}
									
								}
							}
						}
						msql = "select * from department where status=1 " + sql1 +" order by -id limit 0,500";
						
						ssql = "select top 500* from(select ROW_NUMBER() over(order by M.id desc) as rownumber,M.* from(" +
								"select * from department where status=1 " + sql1 +") M) L where L.rownumber>0";
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						departments = ss.createSQLQuery(statement).addEntity(Department.class).list();
						if(!departments.isEmpty()){
							List<Object> o = ss.createSQLQuery("select id from department where status=1 " + sql1 +" order by -id").list();
							departments.get(0).setZdy1(""+ o.size());
						}
					}else if(idtype.equalsIgnoreCase("org")){
						departments = ss.createSQLQuery("select * from department where status=1 and orgid=" + typeid +" order by -id").addEntity(Department.class).list();
						if(!departments.isEmpty()){
							departments.get(0).setZdy1(""+ departments.size());
						}
					}
					if (departments.isEmpty()){
						Department a = new Department();
						a.setName(mmessage.nodata);	
						a.setZdy1("1");
						a.setZdy2("");
						a.setZdy3("");
						a.setId(0);
						departments.add(a);
					}else{
						for(int i=0;i<departments.size();i++){
							if(departments.get(i).getUpperid() > 0){
								List<Object> o1 = ss.createSQLQuery("select name from department where id="+ departments.get(i).getUpperid()).list();
								if(!o1.isEmpty()){
									departments.get(i).setZdy2(o1.get(0).toString());
								}else{
									departments.get(i).setZdy2("");
								}
							}
							if(departments.get(i).getManageruserid() > 0){
								List<Object> o2 = ss.createSQLQuery("select name from users where id="+ departments.get(i).getManageruserid()).list();
								if(!o2.isEmpty()){
									departments.get(i).setZdy3(o2.get(0).toString());
								}else{
									departments.get(i).setZdy3("");
								}
							}
							int len = 0;
							int orgid = departments.get(i).getOrgid();
							if(orgid == 0){
								while(orgid == 0){
									if(len > 5){
										break;
									}else{
										len = len +1;
									}
									List<Object[]> o3 = ss.createSQLQuery("select upperid,orgid from department where id="+ departments.get(i).getUpperid()).list();
									if(!o3.isEmpty()){
										if(Integer.parseInt(o3.get(0)[0].toString()) == 0){
											orgid = Integer.parseInt(o3.get(0)[1].toString());
										}
									}
								}
								if(orgid > 0){
									List<Object> o4 = ss.createSQLQuery("select name from org where id="+ orgid).list();
									if(!o4.isEmpty()){
										departments.get(i).setZdy4(o4.get(0).toString());
									}else{
										departments.get(i).setZdy4("");
									}
								}
							}else{
								List<Object> o4 = ss.createSQLQuery("select name from org where id="+ orgid).list();
								if(!o4.isEmpty()){
									departments.get(i).setZdy4(o4.get(0).toString());
								}else{
									departments.get(i).setZdy4("");
								}
							}
						}
					}
				}
			}
		}
		
		HibernateUtil_new.closeSession();
		return departments;
	}

}
