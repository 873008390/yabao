package com.mbusiness.impl;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;

import com.mbusiness.dao.UserListDAO;
import com.mbusiness.model.Purchase;
import com.mbusiness.model.Users;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.CommonJudgeDB;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Inputverify;
import com.mbusiness.util.MMessage;
import com.mbusiness.util.StatusTranslation;

public class UserListImpl implements UserListDAO{
		
	private List<Users> users;
	private Session session;
	private MMessage mmessage = new MMessage();
	private HasPermission hasPermission = new HasPermission();
	//private int userlimit = 1000;
	private Inputverify inputverify = new Inputverify();
	private String result = "";
	private String statement;
	private String msql;
	private String ssql;
	@Override
	public List<Users> list(Usersession usersession, String idtype, String typeid, int start, int limit, int page) {		
		//iFlag=0 mysql; iFlag=1 sqlserver
		int iFlag = CommonJudgeDB.judgeDB();
		HibernateUtil_new.closeSession();
		session = HibernateUtil_new.currentSession();
		session.beginTransaction();
		users = new ArrayList<Users>();
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
			result = mmessage.stringillegal;
		}else{
			if(!usersession.getUsername().equalsIgnoreCase("")){
				flag = 0;
				if(usersession.getUsername().equalsIgnoreCase("admin")){
					flag = 1;
				}else{					
					if (hasPermission.hasPermission(usersession.getUsername(), "user", "searchdata", session) == 1){
						flag = 1;						
					}else{
						if(idtype.equalsIgnoreCase("checkaccount") || idtype.equalsIgnoreCase("point") || idtype.equalsIgnoreCase("saler")){
							flag = 1;
						}else{
							Query q = session.createSQLQuery("select id from users where type=0 and status=1 and account='"+ usersession.getUsername() +"'");
							if(!q.list().isEmpty()){
								flag = 1;
							}
						}
					}
				}
				if(flag == 1){
					ListUser lu = new ListUser();
					String userids = lu.list(usersession.getUsername(), session);
					String sql = " and id in("+ userids +")";
					if(idtype.equalsIgnoreCase("all")){
						users = session.createSQLQuery("select * from users where status=1 "+ sql +" order by -id").addEntity(Users.class).list();
						if(!users.isEmpty()){
							List<Object> o = session.createSQLQuery("select count(*) from users where status=1 "+ sql +"").list();
							if(o.get(0) != null){
								users.get(0).setZdy1(""+ o.get(0).toString());
							}
						}else{
							result = mmessage.nodata;
						}
					}else if(idtype.equalsIgnoreCase("allorg")){
						users = session.createSQLQuery("select * from users where status=1 and account<>'admin' order by -id").addEntity(Users.class).list();
						if(!users.isEmpty()){
							List<Object> o = session.createSQLQuery("select count(*) from users where status=1").list();
							if(o.get(0) != null){
								users.get(0).setZdy1(""+ o.get(0).toString());
							}
						}else{
							result = mmessage.nodata;
						}
					}else if(idtype.equalsIgnoreCase("allwithlimit")){
						msql = "select * from users where status=1 "+ sql +" order by -id limit "+ start +","+ limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id desc) as rownumber,M.* from(" +
								"select * from users where status=1 "+ sql +") M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						users = session.createSQLQuery(statement).addEntity(Users.class).list();
						if(!users.isEmpty()){
							List<Object> o = session.createSQLQuery("select count(*) from users where status=1  "+ sql +"").list();
							if(o.get(0) != null){
								users.get(0).setZdy1(""+ o.get(0).toString());
							}
						}else{
							result = mmessage.nodata;
						}
					}else if(idtype.equalsIgnoreCase("checkaccount")){
						users = new ArrayList<Users>();
						List<Object> o = session.createSQLQuery("select id from users where status=1 and name='"+ typeid.split("_")[0] +"'").list();
						if(!o.isEmpty()){
							result = mmessage.accountduplicate;
						}else{
							result = mmessage.usernameisnormal;
						}
					}else if(idtype.equalsIgnoreCase("search")){
						String sql0 = " and (name like '%"+ typeid +"%' or phoneno like '%"+ typeid +"%' or account like '%"+ typeid +"%' or tel like '%"+ typeid +"%'";
						sql0 = sql0 +")";
						
						msql = "select * from users where status=1 "+ sql0 +" "+ sql +" order by -id limit "+ start +","+ limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id desc) as rownumber,M.* from(" +
								"select * from users where status=1 "+ sql0 +" "+ sql +") M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						users = session.createSQLQuery(statement).addEntity(Users.class).list();
						if(!users.isEmpty()){
							List<Object> o = session.createSQLQuery("select count(*) from users where status=1 "+ sql0).list();
							if(o.get(0) != null){
								users.get(0).setZdy1(""+ o.get(0).toString());
							}
						}else{
							result = mmessage.nodata;
						}
					}else if(idtype.equalsIgnoreCase("searchwithlimit")){
						String sql1 = "";
						if(!typeid.equalsIgnoreCase("0")){
							int len = typeid.split("_").length;
							for(int i=0;i<len;i++){
								if(typeid.split("_")[i].indexOf("account")>-1){
									sql1 += " and account like '%"+ typeid.split("_")[i].split("=")[1] +"%'";
								}
								if(typeid.split("_")[i].indexOf("name")>-1){
									String name = "";
									try {
										name = URLDecoder.decode(typeid.split("_")[i].split("=")[1],"UTF-8");
									} catch (UnsupportedEncodingException e) {
										e.printStackTrace();
									}
									sql1 += " and name like '%"+ name +"%'";
								}
								
								if(typeid.split("_")[i].indexOf("createdate")>-1){
									if(iFlag == 0){
										sql1 += " and date_format(createdate,'%Y-%m-%d')=date_format('"+ typeid.split("_")[i].split("=")[1] +"','%Y-%m-%d')";
									}else{
										sql1 += " and convert(varchar(100),createdate,23)=convert(varchar(100),'"+ typeid.split("_")[i].split("=")[1] +"',23)";
									}
									
								}
								if(typeid.split("_")[i].indexOf("phoneno")>-1){
									sql1 += " and phoneno like '%"+ typeid.split("_")[i].split("=")[1] +"%'";
								}
								if(typeid.split("_")[i].indexOf("tel")>-1){
									sql1 += " and tel like '%"+ typeid.split("_")[i].split("=")[1] +"%'";
								}
								if(typeid.split("_")[i].indexOf("org")>-1){
									String name = "";
									try {
										name = URLDecoder.decode(typeid.split("_")[i].split("=")[1],"UTF-8");
									} catch (UnsupportedEncodingException e) {
										e.printStackTrace();
									}
									List<Object> orgids = session.createSQLQuery("select id from org where status=1 and name like '%" +
											name +"%'").list();
									String str = "";
									if(!orgids.isEmpty()){
										for(int m=0; m<orgids.size(); m++){
											str = str + orgids.get(m).toString() + ",";
										}
										if(!str.equalsIgnoreCase("")){
											str = str.substring(0,str.length()-1);
											sql1 += " and orgid in("+ str +")";
										}
									}else{
										sql1 += " and orgid in(-1)";
									}
									
									
								}
							}
						}
						msql = "select * from users where status=1 "+ sql + sql1 +" order by -id limit " + start + "," + limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id desc) as rownumber,M.* from(" +
								"select * from users where status=1 "+ sql + sql1 +") M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						users = session.createSQLQuery(statement).addEntity(Users.class).list();
						if(!users.isEmpty()){
							List<Object> o = session.createSQLQuery("select id from users where status=1 "+ sql + sql1 +" order by -id").list();
							users.get(0).setZdy1(""+ o.size());
						}
					}
					if(!users.isEmpty()){
						SimpleDateFormat sformat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
						if(!idtype.equalsIgnoreCase("notereply") && !idtype.equalsIgnoreCase("allnotewithlimit")){
							for(int i=0;i<users.size();i++){
								users.get(i).setZdy2(sformat.format(users.get(i).getCreatedate()));
								StatusTranslation st = new StatusTranslation();
								users.get(i).setZdy3(st.getKeyname(users.get(i).getType(), session));
								if(users.get(i).getType() > 0){
									List<Object> o = session.createSQLQuery("select name from supplier where id="+ users.get(i).getSupplierid()).list();
									if(!o.isEmpty()){
										users.get(i).setZdy7(o.get(0).toString());
									}else{
										users.get(i).setZdy7("");
									}
									users.get(i).setZdy8("");
								}else{
									users.get(i).setZdy4("");
									users.get(i).setZdy5("");
									users.get(i).setZdy6("");
									users.get(i).setZdy7("");
									users.get(i).setZdy8("");
									List<Object> o = session.createSQLQuery("select name from org where id="+ users.get(i).getOrgid()).list();
									if(!o.isEmpty()){
										users.get(i).setZdy8(o.get(0).toString());
									}
								}
							}
						}
					}
				}else{
					result = mmessage.nopermission;
				}
			}else{
				users = new ArrayList<Users>();
				if(idtype.equalsIgnoreCase("checkaccount")){
					List<Object> o = session.createSQLQuery("select id from users where status=1 and account='"+ typeid.split("_")[0] +"'").list();
					if(!o.isEmpty()){
						result = mmessage.accountduplicate;
					}else{
						result = mmessage.usernameisnormal;
					}
				}else{	
					result = mmessage.notlogin;
				}
			}
		}
		
		if(!users.isEmpty()){
			for(int i=0;i<users.size();i++){
				users.get(i).setPassword("****");				
			}
		}else{
			Users u = new Users();
			u.setId(0);
			u.setAccount("");
			u.setCreatedate(new Date());
			u.setName(mmessage.nodata);
			u.setZdy1("1");
			u.setZdy2("");
			u.setPassword("");
			users.add(u);
		}
		HibernateUtil_new.closeSession();
		return users;
	}
}
