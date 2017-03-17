package com.mbusiness.impl;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;

import com.mbusiness.dao.OrgListDAO;
import com.mbusiness.model.Org;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.CommonJudgeDB;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Inputverify;
import com.mbusiness.util.MMessage;

public class OrgListImpl implements OrgListDAO {
	
	private Session ss;
	private MMessage mmessage = new MMessage();
	private List<Org> orgs = new ArrayList<Org>();
	private Inputverify inputverify = new Inputverify();
	private String statement;
	private String msql;
	private String ssql;
	@Override
	public List<Org> list(Usersession usersession, String idtype, String typeid, int start, int limit, int page) {
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
			Org a = new Org();
			a.setName(mmessage.stringillegal);
			a.setZdy1("1");
			a.setZdy2("");
			a.setZdy3("");
			a.setId(0);
			orgs.add(a);
		}else{
			if (!usersession.getUsername().equalsIgnoreCase("")){
				String sql = "";
				if(!usersession.getUsername().equalsIgnoreCase("admin")){
					List<Object> o = ss.createSQLQuery("select orgid from users where status=1 and account='"+ usersession.getUsername() +"'").list();
					if(!o.isEmpty()){
						sql = " and id="+ o.get(0).toString();
					}
				}
				if(idtype.equalsIgnoreCase("current")){
					orgs = ss.createSQLQuery("select * from org where status=1 "+ sql +" order by id").addEntity(Org.class).list();
					if(!orgs.isEmpty()){
						orgs.get(0).setZdy1(orgs.size()+"");
					}
				}else if(idtype.equalsIgnoreCase("all")){
					orgs = ss.createSQLQuery("select * from org where status=1 "+ sql +" order by id").addEntity(Org.class).list();
					if(!orgs.isEmpty()){
						orgs.get(0).setZdy1(orgs.size()+"");
					}
				}else if(idtype.equalsIgnoreCase("center")){
					String sql1 = "and upperid="+ typeid;
					if(typeid.equalsIgnoreCase("0")){
						sql1 = " and upperid in(select id from org where status=1 and upperid=0)";
					}
					msql = "select * from org where status=1 "+ sql1 +" and upperid>0 "+ sql +" order by id limit "+ start +","+ limit;
					
					ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
							"select * from org where status=1 "+ sql1 +" and upperid>0 "+ sql +") M) L where L.rownumber>" + start;
					if(iFlag == 0){
						statement = msql;
					}else{
						statement = ssql;
					}
					orgs = ss.createSQLQuery(statement).addEntity(Org.class).list();
					if(!orgs.isEmpty()){
						orgs.get(0).setZdy1(orgs.size()+"");
					}
				}else if(idtype.equalsIgnoreCase("son")){
					String sql1 = "and upperid="+ typeid;
					if(typeid.equalsIgnoreCase("0")){
						sql1 = " and upperid in(select id from org where status=1 and upperid>0)";
					}
					msql = "select * from org where status=1 "+ sql1 +" and upperid>0 "+ sql +" order by id limit "+ start +","+ limit;
					
					ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
							"select * from org where status=1 "+ sql1 +" and upperid>0 "+ sql +") M) L where L.rownumber>" + start;
					if(iFlag == 0){
						statement = msql;
					}else{
						statement = ssql;
					}
					orgs = ss.createSQLQuery(statement).addEntity(Org.class).list();
					if(!orgs.isEmpty()){
						orgs.get(0).setZdy1(orgs.size()+"");
					}
				}else if(idtype.equalsIgnoreCase("allcenter")){
					orgs = ss.createSQLQuery("select * from org where status=1 "+ sql +" and upperid in(select id from org where status=1 and upperid=0) order by id").addEntity(Org.class).list();
					if(!orgs.isEmpty()){
						orgs.get(0).setZdy1(orgs.size()+"");
					}
				}else if(idtype.equalsIgnoreCase("allson")){
					orgs = ss.createSQLQuery("select * from org where status=1 "+ sql +" and upperid in(select id from org where status=1 and upperid in(select id from org where status=1 and upperid=0)) order by id").addEntity(Org.class).list();
					if(!orgs.isEmpty()){
						orgs.get(0).setZdy1(orgs.size()+"");
					}
				}else if(idtype.equalsIgnoreCase("allgroup")){
					orgs = ss.createSQLQuery("select * from org where status=1 and upperid=0 order by id").addEntity(Org.class).list();
					if(!orgs.isEmpty()){
						orgs.get(0).setZdy1(orgs.size()+"");
					}
				}else if(idtype.equalsIgnoreCase("allwithlimit")){
					msql = "select * from org where status=1 "+ sql +" and upperid=0 order by -id limit "+ start +","+ limit;
					
					ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id desc) as rownumber,M.* from(" +
							"select * from org where status=1 "+ sql +" and upperid=0) M) L where L.rownumber>" + start;
					if(iFlag == 0){
						statement = msql;
					}else{
						statement = ssql;
					}
					orgs = ss.createSQLQuery(statement).addEntity(Org.class).list();
					if(!orgs.isEmpty()){
						List<Object> o = ss.createSQLQuery("select id from org where status=1 "+ sql +" and upperid=0 order by id ").list();
						orgs.get(0).setZdy1(o.size()+"");
					}
				}else if(idtype.equalsIgnoreCase("search")){
					msql = "select * from org where status=1 "+ sql +" and (name like '%"+ typeid +"%' or shortname like '%"+ typeid +"%') order by id limit "+ start +","+ limit;
					
					ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
							"select * from org where status=1 "+ sql +" and (name like '%"+ typeid +"%' or shortname like '%"+ typeid +"%')) M) L where L.rownumber>" + start;
					if(iFlag == 0){
						statement = msql;
					}else{
						statement = ssql;
					}
					orgs = ss.createSQLQuery(statement).addEntity(Org.class).list();
					if(!orgs.isEmpty()){
						List<Object> o = ss.createSQLQuery("select id from org where status=1 "+ sql +" and (name like '%"+ typeid +"%' or shortname like '%"+ typeid +"%')").list();
						orgs.get(0).setZdy1(o.size()+"");
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
									sql1 += " and name like '%"+ name +"%'";
								} catch (UnsupportedEncodingException e) {
									e.printStackTrace();
								}
							}
						}
					}
					msql = "select * from org where status=1 "+ sql + sql1 +" and upperid=0 order by -id limit " + start + "," +limit;
					
					ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id desc) as rownumber,M.* from(" +
							"select * from org where status=1 "+ sql + sql1 +" and upperid=0) M) L where L.rownumber>" + start;
					if(iFlag == 0){
						statement = msql;
					}else{
						statement = ssql;
					}
					orgs = ss.createSQLQuery(statement).addEntity(Org.class).list();
					if(!orgs.isEmpty()){
						List<Object> o = ss.createSQLQuery("select id from org where status=1 "+ sql + sql1 +" order by -id").list();
						orgs.get(0).setZdy1(""+ o.size());
					}
				}
				if (orgs.isEmpty()){
					Org a = new Org();
					a.setName(mmessage.nodata);	
					a.setZdy1("1");
					a.setZdy2("");
					a.setZdy3("");
					a.setId(0);
					orgs.add(a);
				}else{
					for(int i=0;i<orgs.size();i++){
						if(orgs.get(i).getUpperid() > 0){
							List<Object> o1 = ss.createSQLQuery("select name from org where id="+ orgs.get(i).getUpperid()).list();
							if(!o1.isEmpty()){
								orgs.get(i).setZdy2(o1.get(0).toString());
							}else{
								orgs.get(i).setZdy2("");
							}
						}
						if(orgs.get(i).getManageruserid() > 0){
							List<Object> o2 = ss.createSQLQuery("select name from users where id="+ orgs.get(i).getManageruserid()).list();
							if(!o2.isEmpty()){
								orgs.get(i).setZdy3(o2.get(0).toString());
							}else{
								orgs.get(i).setZdy3("");
							}
						}
					}
				}
			}else{
				orgs = new ArrayList<Org>();
				if (orgs.isEmpty()){
					Org a = new Org();
					a.setName(mmessage.notlogin);	
					a.setZdy1("1");
					a.setZdy2("");
					a.setZdy3("");
					a.setId(0);
					orgs.add(a);
				}
			}
		}
		
		HibernateUtil_new.closeSession();
		return orgs;
	}

}
