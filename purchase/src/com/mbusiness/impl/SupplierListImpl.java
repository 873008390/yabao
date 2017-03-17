package com.mbusiness.impl;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.hibernate.Session;

import com.mbusiness.dao.SupplierListDAO;
import com.mbusiness.model.Supplier;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.CommonJudgeDB;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Inputverify;
import com.mbusiness.util.MMessage;

public class SupplierListImpl implements SupplierListDAO {
	
	private Session session;
	private MMessage mmessage = new MMessage();
	private List<Supplier> suppliers = new ArrayList<Supplier>();
	private Inputverify inputverify = new Inputverify();
	private HasPermission hasPermission = new HasPermission();
	private String statement;
	private String msql;
	private String ssql;
	@Override
	public List<Supplier> list(Usersession usersession, String idtype, String typeid, int start, int limit, int page) {
		//iFlag=0 mysql; iFlag=1 sqlserver
		int iFlag = CommonJudgeDB.judgeDB();
		HibernateUtil_new.closeSession();
		session = HibernateUtil_new.currentSession();
		session.beginTransaction();
		SimpleDateFormat sformat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		suppliers = new ArrayList<Supplier>();
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
			Supplier a = new Supplier();
			a.setName(mmessage.stringillegal);
			a.setZdy1("0");
			a.setId(0);
			suppliers.add(a);
		}else{			
			if (!usersession.getUsername().equalsIgnoreCase("")){
				flag = 0;
				if(usersession.getUsername().equalsIgnoreCase("admin")){
					flag = 1;
				}else{					
					if(hasPermission.hasPermission(usersession.getUsername(), "supplier", "searchdata", session) == 1){
						flag = 1;						
					}else if(idtype.equalsIgnoreCase("user")){
						flag = 1;
					}
				}
				if(flag == 1){
					String sqls = "";
					List<Object[]> o0 = session.createSQLQuery("select orgid,id from users where status=1 and account='"+ usersession.getUsername() +"'").list();
					if(!o0.isEmpty()){
						if(!usersession.getUsername().equalsIgnoreCase("admin")){
							sqls = " and orgid="+ o0.get(0)[0].toString();
						}
					}else{
						sqls = " and orgid=0";
					}
					ListSupplier ls = new ListSupplier();
					String supplierids = ls.list(usersession.getUsername(), session);
					//String sql = " and id in("+ supplierids +")";
					String sql = "";
					if(idtype.equalsIgnoreCase("allwithlimit")){
						msql = "select * from supplier where status=1 "+ sql +" order by -id limit "+ start +","+ limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id desc) as rownumber,M.* from(" +
								"select * from supplier where status=1 "+ sql +") M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						suppliers = session.createSQLQuery(statement).addEntity(Supplier.class).list();
						if(!suppliers.isEmpty()){
							List<Object> o = session.createSQLQuery("select count(*) from supplier where status=1 "+ sql +" ").list();
							if(o.get(0) != null){
								suppliers.get(0).setZdy1(""+ o.get(0).toString());
							}
						}
					}else if(idtype.equalsIgnoreCase("id")){
						suppliers = session.createSQLQuery("select * from supplier where status=1 and id="+ typeid + sql +" order by -id ").addEntity(Supplier.class).list();
						if(!suppliers.isEmpty()){
							suppliers.get(0).setZdy1("1");
						}
					}else if(idtype.equalsIgnoreCase("allmyauditingwithlimit")){
						ListMyAuditingSupplier lms = new ListMyAuditingSupplier();
						String sids = lms.list(session, usersession.getUsername());
						String sql1 = " and id in("+ sids +")";
						msql = "select * from supplier where status=1 "+ sql1 +" and auditstatus<>1 order by -id limit "+ start +","+ limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id desc) as rownumber,M.* from(" +
								"select * from supplier where status=1 "+ sql1 +" and auditstatus<>1) M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						suppliers = session.createSQLQuery(statement).addEntity(Supplier.class).list();
						if(!suppliers.isEmpty()){
							List<Object> o = session.createSQLQuery("select count(*) from supplier where status=1 "+ sql1 +" and auditstatus<>1 ").list();
							if(o.get(0) != null){
								suppliers.get(0).setZdy1(""+ o.get(0).toString());
							}
						}
					}else if(idtype.equalsIgnoreCase("allauditingwithlimit")){
						msql = "select * from supplier where status=1 "+ sql +" and auditstatus>1 order by -id limit "+ start +","+ limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id desc) as rownumber,M.* from(" +
								"select * from supplier where status=1 "+ sql +" and auditstatus>1) M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						suppliers = session.createSQLQuery(statement).addEntity(Supplier.class).list();
						if(!suppliers.isEmpty()){
							List<Object> o = session.createSQLQuery("select count(*) from supplier where status=1 "+ sql +" and auditstatus>1 ").list();
							if(o.get(0) != null){
								suppliers.get(0).setZdy1(""+ o.get(0).toString());
							}
						}
					}else if(idtype.equalsIgnoreCase("allauditedwithlimit")){
						msql = "select * from supplier where status=1 "+ sql +" and auditstatus=1 order by -id limit "+ start +","+ limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id desc) as rownumber,M.* from(" +
								"select * from supplier where status=1 "+ sql +" and auditstatus=1) M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						suppliers = session.createSQLQuery(statement).addEntity(Supplier.class).list();
						if(!suppliers.isEmpty()){
							List<Object> o = session.createSQLQuery("select count(*) from supplier where status=1 "+ sql +" and auditstatus=1 ").list();
							if(o.get(0) != null){
								suppliers.get(0).setZdy1(""+ o.get(0).toString());
							}
						}
					}else if(idtype.equalsIgnoreCase("search")){
						
						String sql0 = "";
						try {
							sql0 = " and (name like '%"+ URLDecoder.decode(typeid,"UTF-8") +"%' or supplierno like '%"+  URLDecoder.decode(typeid,"UTF-8") +"%' or address like '%"+  URLDecoder.decode(typeid,"UTF-8") +"%' or phoneno like '%"+  URLDecoder.decode(typeid,"UTF-8") +"%' or tel like '%"+  URLDecoder.decode(typeid,"UTF-8") +"%')";
						} catch (UnsupportedEncodingException e) {
							e.printStackTrace();
						}
						msql = "select * from supplier where status=1 "+ sql0 +" "+ sql +" order by -id limit "+ start +","+ limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id desc) as rownumber,M.* from(" +
								"select * from supplier where status=1 "+ sql0 +" "+ sql +") M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						
						suppliers = session.createSQLQuery(statement).addEntity(Supplier.class).list();
						if(!suppliers.isEmpty()){
							List<Object> o = session.createSQLQuery("select count(*) from supplier where status=1 "+ sql +"  "+ sql0 ).list();
							if(o.get(0) != null){
								suppliers.get(0).setZdy1(""+ o.get(0).toString());
							}
						}
					}else if(idtype.equalsIgnoreCase("searchbyproduct")){
						String productno = "";
						String suppString = "";
						if(typeid.indexOf("_") > -1){
							productno = typeid.split("_")[0];
							if(typeid.split("_").length > 1){
								suppString = typeid.split("_")[1];
							}
						}
						List<Object> productids;
						if(!productno.equalsIgnoreCase("")){							
							List<Object> suppids;
							String suppstr = "";							
							suppids = session.createSQLQuery("select supplierid from purchase where status=1 and id in(select mainid from purchasedetail where productid in(select id from product where status=1 and productno='" + productno + "'))").list();
							if(!suppids.isEmpty()){
								for(int i=0;i<suppids.size();i++){
									if(suppstr.equalsIgnoreCase("")){
										suppstr = suppids.get(i).toString();
									}else{
										suppstr = suppstr + "," + suppids.get(i).toString();
									}
								}
							}
							
							String sql0 = "";
							try {
								sql0 = " and (name like '%"+ URLDecoder.decode(suppString,"UTF-8") +"%' or supplierno like '%"+  URLDecoder.decode(suppString,"UTF-8") +"%')";
							} catch (UnsupportedEncodingException e) {
								e.printStackTrace();
							}
							if(!suppstr.equalsIgnoreCase("")){
								msql = "select * from supplier where status=1 "+ sql0 +" "+ sql +" and id in("+ suppstr +") order by -id limit "+ start +","+ limit;
								
								ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id desc) as rownumber,M.* from(" +
										"select * from supplier where status=1 "+ sql0 +" "+ sql +" and id in("+ suppstr +")) M) L where L.rownumber>" + start;
								if(iFlag == 0){
									statement = msql;
								}else{
									statement = ssql;
								}
								
								suppliers = session.createSQLQuery(statement).addEntity(Supplier.class).list();
								if(!suppliers.isEmpty()){
									/*List<Object> o = session.createSQLQuery("select count(*) from supplier where status=1 "+ sql +"  "+ sql0 ).list();
									if(o.get(0) != null){*/
										suppliers.get(0).setZdy1(""+ suppliers.size());
									//}
								}
							}
							
						}
						
						
					}else if(idtype.equalsIgnoreCase("allauditedwithsearch")){
						String sql0 = " and (name like '%"+ typeid +"%' or supplierno like '%"+ typeid +"%' or address like '%"+ typeid +"%' or phoneno like '%"+ typeid +"%' or tel like '%"+ typeid +"%')";
						msql = "select * from supplier where status=1 "+ sql0 +" "+ sql +" and auditstatus=1 order by -id limit "+ start +","+ limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id desc) as rownumber,M.* from(" +
								"select * from supplier where status=1 "+ sql0 +" "+ sql +" and auditstatus=1) M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						suppliers = session.createSQLQuery(statement).addEntity(Supplier.class).list();
						if(!suppliers.isEmpty()){
							List<Object> o = session.createSQLQuery("select count(*) from supplier where status=1 "+ sql +"  "+ sql0 + " and auditstatus=1").list();
							if(o.get(0) != null){
								suppliers.get(0).setZdy1(""+ o.get(0).toString());
							}
						}
					}else if(idtype.equalsIgnoreCase("catalog")){
						List<Object> o = session.createSQLQuery("select catalogids from supplier where id="+ typeid + sql).list();
						if(!o.isEmpty()){
							if(o.get(0) != null && !o.get(0).toString().equalsIgnoreCase("")){
								List<Object[]> o1 = session.createSQLQuery("select name,id from catalog where upperid=1 and id in ("+ o.get(0).toString() +")").list();
								if(!o1.isEmpty()){
									for(int i=0;i<o1.size();i++){
										Supplier s = new Supplier();
										s.setId(i+1);
										s.setZdy1(""+ o1.size());
										s.setCreatedate(new Date());
										s.setName(o1.get(i)[0].toString());
										s.setCatalogids(o1.get(i)[1].toString());
										suppliers.add(s);
									}
								}
							}
						}
					}else if(idtype.equalsIgnoreCase("audited")){
						msql = "select * from supplier where status=1 "+ sql +" and auditstatus=1 order by -id limit " + start +"," + limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id desc) as rownumber,M.* from(" +
								"select * from supplier where status=1 "+ sql +" and auditstatus=1) M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						suppliers = session.createSQLQuery(statement).addEntity(Supplier.class).list();
						if(!suppliers.isEmpty()){
							suppliers.get(0).setZdy1(""+ suppliers.size());
						}
					}else if(idtype.equalsIgnoreCase("searchwithlimit")){
						String sql1 = "";
						if(!typeid.equalsIgnoreCase("0")){
							int len = typeid.split("_").length;
							for(int i=0;i<len;i++){
								if(typeid.split("_")[i].indexOf("provinceid")>-1){
									sql1 += " and provinceid="+ typeid.split("_")[i].split("=")[1];
								}
								if(typeid.split("_")[i].indexOf("cityid")>-1){
									sql1 += " and cityid="+ typeid.split("_")[i].split("=")[1];
								}
								if(typeid.split("_")[i].indexOf("supplierno")>-1){
									sql1 += " and supplierno like '%"+ typeid.split("_")[i].split("=")[1] +"%'";
								}
								if(typeid.split("_")[i].indexOf("name")>-1){
									String name = "";
									try {
										name = URLDecoder.decode(typeid.split("_")[i].split("=")[1],"UTF-8");
										sql1 += " and name like '%"+ name +"%'";
									} catch (UnsupportedEncodingException e) {
										e.printStackTrace();
									}
									
								}
								if(typeid.split("_")[i].indexOf("phoneno")>-1){
									sql1 += " and phoneno like '%"+ typeid.split("_")[i].split("=")[1] +"%'";
								}
								if(typeid.split("_")[i].indexOf("tel")>-1){
									sql1 += " and tel like '%"+ typeid.split("_")[i].split("=")[1] +"%'";
								}
								if(typeid.split("_")[i].indexOf("fax")>-1){
									sql1 += " and fax like '%"+ typeid.split("_")[i].split("=")[1] +"%'";
								}
								if(typeid.split("_")[i].indexOf("auditstatus")>-1){
									String auditstatus = "";
									try {
										auditstatus = URLDecoder.decode(typeid.split("_")[i].split("=")[1],"UTF-8");
										sql1 += " and auditstatus="+ auditstatus;
									} catch (UnsupportedEncodingException e) {
										e.printStackTrace();
									}
									
								}
								if(typeid.split("_")[i].indexOf("iscompany")>-1){
									sql1 += " and iscompany="+ typeid.split("_")[i].split("=")[1];
								}
								if(typeid.split("_")[i].indexOf("createdate")>-1){
									if(iFlag == 0){
										sql1 += " and date_format(createdate,'%Y-%m-%d')=date_format('"+ typeid.split("_")[i].split("=")[1] +"','%Y-%m-%d')";
									}else{
										sql1 += " and convert(varchar(100),createdate,23)=convert(varchar(100),'"+ typeid.split("_")[i].split("=")[1] +"',23)";
									}
									
								}
							}
						}
						msql = "select * from supplier where status=1 "+ sql + sql1 +" order by -id limit " + start +"," +limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id desc) as rownumber,M.* from(" +
								"select * from supplier where status=1 "+ sql + sql1 +") M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						suppliers = session.createSQLQuery(statement).addEntity(Supplier.class).list();
						if(!suppliers.isEmpty()){
							List<Object> o = session.createSQLQuery("select id from supplier where status=1 "+ sql + sql1 +" order by -id").list();
							suppliers.get(0).setZdy1(""+ o.size());
						}
					}else if(idtype.equalsIgnoreCase("exportwithlimit")){
						String sql1 = "";
						if(!typeid.equalsIgnoreCase("0")){
							int len = typeid.split("_").length;
							for(int i=0;i<len;i++){
								if(typeid.split("_")[i].indexOf("provinceid")>-1){
									sql1 += " and provinceid="+ typeid.split("_")[i].split("=")[1];
								}
								if(typeid.split("_")[i].indexOf("cityid")>-1){
									sql1 += " and cityid="+ typeid.split("_")[i].split("=")[1];
								}
								if(typeid.split("_")[i].indexOf("supplierno")>-1){
									sql1 += " and supplierno like '%"+ typeid.split("_")[i].split("=")[1] +"%'";
								}
								if(typeid.split("_")[i].indexOf("name")>-1){
									String name = "";
									try {
										name = URLDecoder.decode(typeid.split("_")[i].split("=")[1],"UTF-8");
										sql1 += " and name like '%"+ name +"%'";
									} catch (UnsupportedEncodingException e) {
										e.printStackTrace();
									}
									
								}
								if(typeid.split("_")[i].indexOf("phoneno")>-1){
									sql1 += " and phoneno like '%"+ typeid.split("_")[i].split("=")[1] +"%'";
								}
								if(typeid.split("_")[i].indexOf("tel")>-1){
									sql1 += " and tel like '%"+ typeid.split("_")[i].split("=")[1] +"%'";
								}
								if(typeid.split("_")[i].indexOf("fax")>-1){
									sql1 += " and fax like '%"+ typeid.split("_")[i].split("=")[1] +"%'";
								}
								if(typeid.split("_")[i].indexOf("auditstatus")>-1){
									String auditstatus = "";
									try {
										auditstatus = URLDecoder.decode(typeid.split("_")[i].split("=")[1],"UTF-8");
										sql1 += " and auditstatus="+ auditstatus;
									} catch (UnsupportedEncodingException e) {
										e.printStackTrace();
									}
									
								}
								if(typeid.split("_")[i].indexOf("iscompany")>-1){
									sql1 += " and iscompany="+ typeid.split("_")[i].split("=")[1];
								}
								if(typeid.split("_")[i].indexOf("createdate")>-1){
									if(iFlag == 0){
										sql1 += " and date_format(createdate,'%Y-%m-%d')=date_format('"+ typeid.split("_")[i].split("=")[1] +"','%Y-%m-%d')";
									}else{
										sql1 += " and convert(varchar(100),createdate,23)=convert(varchar(100),'"+ typeid.split("_")[i].split("=")[1] +"',23)";
									}
									
								}
							}
						}
						msql = "select * from supplier where status=1 "+ sql + sql1 +" order by -id limit 0,500";
						
						ssql = "select top 500* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
								"select * from supplier where status=1 "+ sql + sql1 +") M) L where L.rownumber>0";
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						suppliers = session.createSQLQuery(statement).addEntity(Supplier.class).list();
						if(!suppliers.isEmpty()){
							List<Object> o = session.createSQLQuery("select id from supplier where status=1 "+ sql + sql1 +" order by -id").list();
							suppliers.get(0).setZdy1(""+ o.size());
						}
					}else if(idtype.equalsIgnoreCase("quantity")){
						Calendar c = Calendar.getInstance();
						String m1 = c.get(Calendar.YEAR) +"-"+ (c.get(Calendar.MONTH)+1);
						if((c.get(Calendar.MONTH)+1)<10){
							m1 = c.get(Calendar.YEAR) +"-0"+ (c.get(Calendar.MONTH)+1);
						}
						c.add(Calendar.MONTH, -1);
						String m2 = c.get(Calendar.YEAR) +"-"+ (c.get(Calendar.MONTH)+1);
						if((c.get(Calendar.MONTH)+1)<10){
							m2 = c.get(Calendar.YEAR) +"-0"+ (c.get(Calendar.MONTH)+1);
						}
						c.add(Calendar.MONTH, -1);
						String m3 = c.get(Calendar.YEAR) +"-"+ (c.get(Calendar.MONTH)+1);
						if((c.get(Calendar.MONTH)+1)<10){
							m3 = c.get(Calendar.YEAR) +"-0"+ (c.get(Calendar.MONTH)+1);
						}
						c.add(Calendar.MONTH, -1);
						String m4 = c.get(Calendar.YEAR) +"-"+ (c.get(Calendar.MONTH)+1);
						if((c.get(Calendar.MONTH)+1)<10){
							m4 = c.get(Calendar.YEAR) +"-0"+ (c.get(Calendar.MONTH)+1);
						}
						c.add(Calendar.MONTH, -1);
						String m5 = c.get(Calendar.YEAR) +"-"+ (c.get(Calendar.MONTH)+1);
						if((c.get(Calendar.MONTH)+1)<10){
							m5 = c.get(Calendar.YEAR) +"-0"+ (c.get(Calendar.MONTH)+1);
						}
						c.add(Calendar.MONTH, -1);
						String m6 = c.get(Calendar.YEAR) +"-"+ (c.get(Calendar.MONTH)+1);	
						if((c.get(Calendar.MONTH)+1)<10){
							m6 = c.get(Calendar.YEAR) +"-0"+ (c.get(Calendar.MONTH)+1);
						}
						Supplier s = new Supplier();
						s.setId(6);
						s.setCreatedate(new Date());
						s.setZdy10(m6);
						s.setStatus(0);
						s.setZdy1("6");
						suppliers.add(s);
						s = new Supplier();
						s.setId(5);
						s.setCreatedate(new Date());
						s.setZdy10(m5);
						s.setStatus(0);
						suppliers.add(s);
						s = new Supplier();
						s.setId(4);
						s.setCreatedate(new Date());
						s.setZdy10(m4);
						s.setStatus(0);
						suppliers.add(s);
						s = new Supplier();
						s.setId(3);
						s.setCreatedate(new Date());
						s.setZdy10(m3);
						s.setStatus(0);
						suppliers.add(s);
						s = new Supplier();
						s.setId(2);
						s.setCreatedate(new Date());
						s.setZdy10(m2);
						s.setStatus(0);
						suppliers.add(s);
						s = new Supplier();
						s.setId(1);
						s.setCreatedate(new Date());
						s.setZdy10(m1);
						s.setStatus(0);
						suppliers.add(s);
						msql = "select date_format(createdate,'%Y-%m') month,count(id) num from supplier where status=1 " + sqls + " and date_format(createdate,'%Y-%m')>=date_format('"+ m6 +"-01','%Y-%m') group by date_format(createdate,'%Y-%m')";
						
						ssql = "select convert(varchar(7),createdate,120) mon,count(id) num from supplier where status=1 " + sqls + " and convert(varchar(7),createdate,120)>='"+ m6 +"' group by convert(varchar(7),createdate,120)";
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						List<Object[]> o = session.createSQLQuery(statement).list();
						if(!o.isEmpty()){
							for(int j=0;j<suppliers.size();j++){
								for(int i=0;i<o.size();i++){
									if(o.get(i)[0].toString().equalsIgnoreCase(suppliers.get(j).getZdy10())){
										suppliers.get(j).setStatus(Integer.parseInt(o.get(i)[1].toString()));
										break;
									}
								}
							}
						}
					}else if(idtype.equalsIgnoreCase("auditquantity")){
						int myauditing = 0;
						int myaudited = 0;
						int myrefuse = 0;
						if(!usersession.getUsername().equalsIgnoreCase("admin")){
							ListMyAuditingSupplier lms = new ListMyAuditingSupplier();
							String sids = lms.list(session, usersession.getUsername());
							myauditing = sids.split(",").length;
							List<Object> o = session.createSQLQuery("select id from users where status=1 and account='"+ usersession.getUsername() +"'").list();
							if(!o.isEmpty()){
								List<Object> o1 = session.createSQLQuery("select distinct supplierid from Auditlog where status=1 and operation<>'同意' and userid="+ o.get(0).toString()).list();
								if(!o1.isEmpty()){
									myaudited = o1.size();
								}
								List<Object> o2 = session.createSQLQuery("select distinct supplierid from Auditlog where status=1 and operation<>'不同意' and userid="+ o.get(0).toString()).list();
								if(!o2.isEmpty()){
									myrefuse = o2.size();
								}
							}
						}
						Supplier s = new Supplier();
						s.setId(1);
						s.setCreatedate(new Date());
						s.setZdy1("1");
						s.setZdy2(""+ myauditing);
						s.setZdy3(""+ myaudited);
						s.setZdy4(""+ myrefuse);
						suppliers.add(s);
					}
					
					if(suppliers.isEmpty()){
						suppliers = new ArrayList<Supplier>();
						if (suppliers.isEmpty()){
							Supplier a = new Supplier();
							a.setName(mmessage.nodata);	
							a.setZdy1("0");
							a.setId(0);
							suppliers.add(a);
						}
					}else{
						for(int i=0;i<suppliers.size();i++){
							if(!idtype.equalsIgnoreCase("quantity") && !idtype.equalsIgnoreCase("auditquantity")){
								suppliers.get(i).setZdy8(sformat.format(suppliers.get(i).getCreatedate()));
								List<Object> o = session.createSQLQuery("select name from org where id="+ suppliers.get(i).getOrgid()).list();
								if(!o.isEmpty()){
									suppliers.get(i).setZdy2(o.get(0).toString());
								}
								List<Object> o1 = session.createSQLQuery("select keyname from keyvalue where status=1 and type=16 and value="+ suppliers.get(i).getAuditstatus()).list();
								if(!o1.isEmpty()){
									suppliers.get(i).setZdy3(o1.get(0).toString());
								}
								List<Object> o11 = session.createSQLQuery("select name from province where status=1 and id="+ suppliers.get(i).getProvinceid()).list();
								if(!o11.isEmpty()){
									suppliers.get(i).setZdy6(o11.get(0).toString());
								}
								List<Object> o12 = session.createSQLQuery("select name from city where status=1 and id="+ suppliers.get(i).getCityid()).list();
								if(!o12.isEmpty()){
									suppliers.get(i).setZdy7(o12.get(0).toString());
								}
								if(idtype.equalsIgnoreCase("allauditingwithlimit")){
									if(suppliers.get(i).getAuditstatus() == 0){
										msql = "select name,id from auditgroup where status=1 and orgid="+ suppliers.get(i).getOrgid() +" order by orderid,id limit 0,1";
										
										ssql = "select top 1* from(select ROW_NUMBER() over(order by M.orderid,M.id) as rownumber,M.* from(" +
												"select name,id,orderid from auditgroup where status=1 and orgid="+ suppliers.get(i).getOrgid() +") M) L where L.rownumber>0";
										if(iFlag == 0){
											statement = msql;
										}else{
											statement = ssql;
										}
										List<Object[]> o2 = session.createSQLQuery(statement).list();
										if(o2.isEmpty()){
											suppliers.get(i).setZdy4(mmessage.noaudits);
											suppliers.get(i).setZdy5("");
										}else{
											suppliers.get(i).setZdy4(o2.get(0)[0].toString());
											List<Object> o21 = session.createSQLQuery("select name from users where status=1 and id in(select userid from auditgroupuser where status=1 and mainid="+ o2.get(0)[1].toString() +")").list();
											if(o21.isEmpty()){
												suppliers.get(i).setZdy5(mmessage.noaudituser);
											}else{
												String users = "";
												for(int j=0;j<o21.size();j++){
													if(users.equalsIgnoreCase("")){
														users = o21.get(j).toString();
													}else{
														users = users +","+ o21.get(j).toString();
													}
												}
												suppliers.get(i).setZdy5(users);
											}
										}
									}else if(suppliers.get(i).getAuditstatus() == 2){
										List<Object> o2 = session.createSQLQuery("select auditgroupid from auditlog where status=1 and supplierid="+ suppliers.get(i).getId() +" and auditgroupid in (select id from auditgroup where status=1 and orgid="+ suppliers.get(i).getOrgid() +") order by -id limit 0,1").list();
										if(o2.isEmpty()){
											List<Object[]> o20 = session.createSQLQuery("select name,id from auditgroup where status=1 and orgid="+ suppliers.get(i).getOrgid() +" order by orderid,id limit 0,1").list();
											if(o20.isEmpty()){
												suppliers.get(i).setZdy4(mmessage.noaudits);
												suppliers.get(i).setZdy5("");
											}else{
												suppliers.get(i).setZdy4(o20.get(0)[0].toString());
												List<Object> o21 = session.createSQLQuery("select name from users where status=1 and id in(select userid from auditgroupuser where status=1 and mainid="+ o20.get(0)[1].toString() +")").list();
												if(o21.isEmpty()){
													suppliers.get(i).setZdy5(mmessage.noaudituser);
												}else{
													String users = "";
													for(int j=0;j<o21.size();j++){
														if(users.equalsIgnoreCase("")){
															users = o21.get(j).toString();
														}else{
															users = users +","+ o21.get(j).toString();
														}
													}
													suppliers.get(i).setZdy5(users);
												}
											}
										}else{
											List<Object[]> o20 = session.createSQLQuery("select id,name from auditgroup where status=1 and orgid="+ suppliers.get(i).getOrgid() +" order by orderid,id").list();
											if(o20.isEmpty()){
												suppliers.get(i).setZdy4(mmessage.noaudits);
												suppliers.get(i).setZdy5("");
											}else{
												for(int j=0;j<o20.size();j++){
													if(Integer.parseInt(o20.get(j)[0].toString()) == Integer.parseInt(o2.get(0).toString())){
														if(j<o20.size()-1){
															suppliers.get(i).setZdy4(o20.get(j+1)[1].toString());
															List<Object> o21 = session.createSQLQuery("select name from users where status=1 and id in(select userid from auditgroupuser where status=1 and mainid="+ o20.get(j+1)[0].toString() +")").list();
															if(o21.isEmpty()){
																suppliers.get(i).setZdy5(mmessage.noaudituser);
															}else{
																String users = "";
																for(int k=0;k<o21.size();k++){
																	if(users.equalsIgnoreCase("")){
																		users = o21.get(k).toString();
																	}else{
																		users = users +","+ o21.get(k).toString();
																	}
																}
																suppliers.get(i).setZdy5(users);
															}
														}else{
															suppliers.get(i).setZdy4(mmessage.auditgroupinvalid +"[err=1]");
															suppliers.get(i).setZdy5("");
														}
														break;
													}else{
														suppliers.get(i).setZdy4(mmessage.auditgroupinvalid +"[err=2]");
														suppliers.get(i).setZdy5("");
													}
												}							
											}
										}								
									}
								}
							}
						}
					}
				}else{
					suppliers = new ArrayList<Supplier>();
					if (suppliers.isEmpty()){
						Supplier a = new Supplier();
						a.setName(mmessage.nopermission);	
						a.setZdy1("0");
						a.setId(0);
						suppliers.add(a);
					}
				}
			}else{
				suppliers = new ArrayList<Supplier>();
				if (suppliers.isEmpty()){
					Supplier a = new Supplier();
					a.setName(mmessage.notlogin);	
					a.setZdy1("0");
					a.setId(0);
					suppliers.add(a);
				}
			}
		}
		
		HibernateUtil_new.closeSession();
		return suppliers;
	}

}
