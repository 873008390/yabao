package com.mbusiness.impl;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.hibernate.Session;

import com.mbusiness.dao.PurchaseListDAO;
import com.mbusiness.model.Purchase;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.CommonJudgeDB;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Inputverify;
import com.mbusiness.util.MMessage;

public class PurchaseListImpl implements PurchaseListDAO {
	
	private Session ss;
	private MMessage mmessage = new MMessage();
	private List<Purchase> purchases = new ArrayList<Purchase>();
	private HasPermission hasPermission = new HasPermission();
	private Inputverify inputverify = new Inputverify();
	private String statement;
	private String msql;
	private String ssql;
	@Override
	public List<Purchase> list(Usersession usersession, String idtype, String typeid, int start, int limit, int page) {
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
			Purchase a = new Purchase();
			a.setZdy3(mmessage.stringillegal);
			a.setZdy1("1");
			a.setZdy2("");
			a.setZdy4("");
			a.setId(0);
			purchases.add(a);
		}else{
			if (!usersession.getUsername().equalsIgnoreCase("")){
				flag = 0;
				if(usersession.getUsername().equalsIgnoreCase("admin")){
					flag = 1;
				}else{					
					if (hasPermission.hasPermission(usersession.getUsername(), "purchase", "searchdata", ss) == 1){
						flag = 1;						
					}
				}
				if(flag == 1){
					SimpleDateFormat sformat = new SimpleDateFormat("yyyy-MM-dd");
					String sql = "";
					List<Object[]> o0 = ss.createSQLQuery("select orgid,id from users where status=1 and account='"+ usersession.getUsername() +"'").list();
					if(!o0.isEmpty()){
						if(!usersession.getUsername().equalsIgnoreCase("admin")){
							sql = " and orgid="+ o0.get(0)[0].toString();
						}
					}else{
						sql = " and orgid=0";
					}
					if(idtype.equalsIgnoreCase("all")){
						purchases = ss.createSQLQuery("select * from purchase where status=1 "+ sql +" order by id").addEntity(Purchase.class).list();
						if(!purchases.isEmpty()){
							purchases.get(0).setZdy1(purchases.size()+"");
						}
					}else if(idtype.equalsIgnoreCase("allwithlimit")){
						msql = "select * from purchase where status=1 "+ sql +" order by id limit "+ start +","+ limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
								"select * from purchase where status=1 "+ sql +") M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						purchases = ss.createSQLQuery(statement).addEntity(Purchase.class).list();
						if(!purchases.isEmpty()){
							List<Object> o = ss.createSQLQuery("select id from purchase where status=1 "+ sql +" order by id ").list();
							purchases.get(0).setZdy1(o.size()+"");
						}
					}else if(idtype.equalsIgnoreCase("search")){
						msql = "select * from purchase where status=1 "+ sql +" and (purchaseno like '%"+ typeid +"%' or type in(select value from keyvalue where status=1 and keyname like '%"+ typeid +"%')) order by id limit "+ start +","+ limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
								"select * from purchase where status=1 "+ sql +" and (purchaseno like '%"+ typeid +"%' or type in(select value from keyvalue where status=1 and keyname like '%"+ typeid +"%'))) M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						purchases = ss.createSQLQuery(statement).addEntity(Purchase.class).list();
						if(!purchases.isEmpty()){
							List<Object> o = ss.createSQLQuery("select id from purchase where status=1 "+ sql +" and (purchaseno like '%"+ typeid +"%' or type in(select value from keyvalue where status=1 and keyname like '%"+ typeid +"%'))").list();
							purchases.get(0).setZdy1(o.size()+"");
						}
					}else if(idtype.equalsIgnoreCase("userwithlimit")){
						msql = "select * from purchase where status=1 "+ sql +" and userid="+ typeid +" order by id limit "+ start +","+ limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
								"select * from purchase where status=1 "+ sql +" and (purchaseno like '%"+ typeid +"%' or type in(select value from keyvalue where status=1 and keyname like '%"+ typeid +"%'))) M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						purchases = ss.createSQLQuery(statement).addEntity(Purchase.class).list();
						if(!purchases.isEmpty()){
							List<Object> o = ss.createSQLQuery("select id from purchase where status=1 "+ sql +" and userid="+ typeid).list();
							purchases.get(0).setZdy1(o.size()+"");
						}
					}else if(idtype.equalsIgnoreCase("id")){
						purchases = ss.createSQLQuery("select * from purchase where status=1 "+ sql +" and id="+ typeid).addEntity(Purchase.class).list();
						if(!purchases.isEmpty()){
							purchases.get(0).setZdy1("1");
						}
					}else if(idtype.equalsIgnoreCase("mywithlimit")){
						typeid = o0.get(0)[1].toString();
						
						purchases = ss.createSQLQuery("select * from purchase where status=1 "+ sql +" and userid="+ typeid +" order by id limit "+ start +","+ limit).addEntity(Purchase.class).list();
						if(!purchases.isEmpty()){
							List<Object> o = ss.createSQLQuery("select id from purchase where status=1 "+ sql +" and userid="+ typeid).list();
							purchases.get(0).setZdy1(o.size()+"");
						}
					}else if(idtype.equalsIgnoreCase("searchwithlimit")){
						String sql1 = "";
						if(!typeid.equalsIgnoreCase("0")){
							int len = typeid.split("_").length;
							for(int i=0;i<len;i++){
								if(typeid.split("_")[i].indexOf("supplier")>-1){
									String name = "";
									try {
										name = URLDecoder.decode(typeid.split("_")[i].split("=")[1],"UTF-8");
									} catch (UnsupportedEncodingException e) {
										e.printStackTrace();
									}
									List<Object> supplierids = ss.createSQLQuery("select id from supplier where status=1 and name like '%" +
											name +"%'").list();
									String str = "";
									if(!supplierids.isEmpty()){
										for(int m=0; m<supplierids.size(); m++){
											str = str + supplierids.get(m).toString() + ",";
										}
										if(!str.equalsIgnoreCase("")){
											str = str.substring(0,str.length()-1);
											sql1 += " and supplierid in("+ str +")";
										}
									}else{
										sql1 += " and supplierid in(-1)";
									}
									
									
								}
								if(typeid.split("_")[i].indexOf("purchasedate1")>-1){
									if(iFlag == 0){
										sql1 += " and date_format(purchasedate,'%Y-%m-%d')>=date_format('"+ typeid.split("_")[i].split("=")[1] +"','%Y-%m-%d')";
									}else{
										sql1 += " and convert(varchar(100),purchasedate,23)>=convert(varchar(100),'"+ typeid.split("_")[i].split("=")[1] +"',23)";
									}
									
								}
								if(typeid.split("_")[i].indexOf("purchasedate2")>-1){
									if(iFlag == 0){
										sql1 += " and date_format(purchasedate,'%Y-%m-%d')<=date_format('"+ typeid.split("_")[i].split("=")[1] +"','%Y-%m-%d')";
									}else{
										sql1 += " and convert(varchar(100),purchasedate,23)<=convert(varchar(100),'"+ typeid.split("_")[i].split("=")[1] +"',23)";
									}
									
								}
								if(typeid.split("_")[i].indexOf("purchaseno")>-1){
									sql1 += " and purchaseno like '%"+ typeid.split("_")[i].split("=")[1] +"%'";
								}
								
							}
						}
						msql = "select * from purchase where status=1 "+ sql + sql1 +" order by -id limit " + start +"," + limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id desc) as rownumber,M.* from(" +
								"select * from purchase where status=1 "+ sql + sql1 +") M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						purchases = ss.createSQLQuery(statement).addEntity(Purchase.class).list();
						if(!purchases.isEmpty()){
							List<Object> o = ss.createSQLQuery("select id from purchase where status=1 "+ sql + sql1 +" order by -id").list();
							purchases.get(0).setZdy1(""+ o.size());
						}
					}else if(idtype.equalsIgnoreCase("exportwithlimit")){
						String sql1 = "";
						if(!typeid.equalsIgnoreCase("0")){
							int len = typeid.split("_").length;
							for(int i=0;i<len;i++){
								if(typeid.split("_")[i].indexOf("supplier")>-1){
									String name = "";
									try {
										name = URLDecoder.decode(typeid.split("_")[i].split("=")[1],"UTF-8");
									} catch (UnsupportedEncodingException e) {
										e.printStackTrace();
									}
									List<Object> supplierids = ss.createSQLQuery("select id from supplier where status=1 and name like '%" +
											name +"%'").list();
									String str = "";
									for(int m=0; m<supplierids.size(); m++){
										str = str + supplierids.get(m).toString() + ",";
									}
									if(!str.equalsIgnoreCase("")){
										str = str.substring(0,str.length()-1);
										sql1 += " and supplierid in("+ str +")";
									}
									
								}
								if(typeid.split("_")[i].indexOf("purchasedate1")>-1){
									if(iFlag == 0){
										sql1 += " and date_format(purchasedate,'%Y-%m-%d')>=date_format('"+ typeid.split("_")[i].split("=")[1] +"','%Y-%m-%d')";
									}else{
										sql1 += " and convert(varchar(100),purchasedate,23)>=convert(varchar(100),'"+ typeid.split("_")[i].split("=")[1] +"',23)";
									}
									
								}
								if(typeid.split("_")[i].indexOf("purchasedate2")>-1){
									if(iFlag == 0){
										sql1 += " and date_format(purchasedate,'%Y-%m-%d')<=date_format('"+ typeid.split("_")[i].split("=")[1] +"','%Y-%m-%d')";
									}else{
										sql1 += " and convert(varchar(100),purchasedate,23)<=convert(varchar(100),'"+ typeid.split("_")[i].split("=")[1] +"',23)";
									}
									
								}
								if(typeid.split("_")[i].indexOf("purchaseno")>-1){
									sql1 += " and purchaseno like '%"+ typeid.split("_")[i].split("=")[1] +"%'";
								}
								
							}
						}
						msql = "select * from purchase where status=1 "+ sql + sql1 +" order by -id limit 0,500";
						
						ssql = "select top 500* from(select ROW_NUMBER() over(order by M.id desc) as rownumber,M.* from(" +
								"select * from purchase where status=1 "+ sql + sql1 +") M) L where L.rownumber>0";
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						purchases = ss.createSQLQuery(statement).addEntity(Purchase.class).list();
						if(!purchases.isEmpty()){
							List<Object> o = ss.createSQLQuery("select id from purchase where status=1 "+ sql + sql1 +" order by -id").list();
							purchases.get(0).setZdy1(""+ o.size());
						}
					}else if(idtype.equalsIgnoreCase("money")){
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
						Purchase s = new Purchase();
						s.setId(6);
						s.setCreatedate(new Date());
						s.setZdy10(m6);
						s.setStatus(0);
						s.setZdy1("6");
						purchases.add(s);
						s = new Purchase();
						s.setId(5);
						s.setCreatedate(new Date());
						s.setZdy10(m5);
						s.setStatus(0);
						purchases.add(s);
						s = new Purchase();
						s.setId(4);
						s.setCreatedate(new Date());
						s.setZdy10(m4);
						s.setStatus(0);
						purchases.add(s);
						s = new Purchase();
						s.setId(3);
						s.setCreatedate(new Date());
						s.setZdy10(m3);
						s.setStatus(0);
						purchases.add(s);
						s = new Purchase();
						s.setId(2);
						s.setCreatedate(new Date());
						s.setZdy10(m2);
						s.setStatus(0);
						purchases.add(s);
						s = new Purchase();
						s.setId(1);
						s.setCreatedate(new Date());
						s.setZdy10(m1);
						s.setStatus(0);
						purchases.add(s);
						msql = "select date_format(purchasedate,'%Y-%m') month,sum(total) num from purchase where status=1 "+ sql +" and date_format(purchasedate,'%Y-%m')>=date_format('"+ m6 +"-01','%Y-%m') group by date_format(purchasedate,'%Y-%m')";
						
						ssql = "select convert(varchar(7),purchasedate,120) mon,sum(total) num from purchase where status=1 "+ sql +" and convert(varchar(7),purchasedate,120)>='"+ m6 +"' group by convert(varchar(7),purchasedate,120)";
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						List<Object[]> o = ss.createSQLQuery(statement).list();
						if(!o.isEmpty()){
							for(int j=0;j<purchases.size();j++){
								for(int i=0;i<o.size();i++){
									if(o.get(i)[0].toString().equalsIgnoreCase(purchases.get(j).getZdy10())){
										purchases.get(j).setStatus((int)Float.parseFloat(o.get(i)[1].toString()));
										break;
									}
								}
							}
						}
					}else if(idtype.equalsIgnoreCase("productprice")){
						String sql1 = "";
						if(!typeid.equalsIgnoreCase("0")){
							int len = typeid.split("_").length;
							for(int i=0;i<len;i++){
								if(typeid.split("_")[i].indexOf("product")>-1){
									String str = "";
									try {
										str = URLDecoder.decode(typeid.split("_")[i].split("=")[1],"UTF-8");
									} catch (UnsupportedEncodingException e) {
										e.printStackTrace();
									}
									List<Object> productids = ss.createSQLQuery("select id from product where status=1 and productno='" +str+ "'").list();
									if(!productids.isEmpty()){
										sql1 += " and M.productid=" + productids.get(0).toString();
									}
									
								}else if(typeid.split("_")[i].indexOf("startdate")>-1){
									if(iFlag == 0){
										sql1 += " and date_format(N.purchasedate,'%Y-%m-%d')>=date_format('"+ typeid.split("_")[i].split("=")[1] +"','%Y-%m-%d')";
									}else{
										sql1 += " and convert(varchar(100),N.purchasedate,23)>=convert(varchar(100),'"+ typeid.split("_")[i].split("=")[1] +"',23)";
									}
									
								}else if(typeid.split("_")[i].indexOf("enddate")>-1){
									if(iFlag == 0){
										sql1 += " and date_format(N.purchasedate,'%Y-%m-%d')<=date_format('"+ typeid.split("_")[i].split("=")[1] +"','%Y-%m-%d')";
									}else{
										sql1 += " and convert(varchar(100),N.purchasedate,23)<=convert(varchar(100),'"+ typeid.split("_")[i].split("=")[1] +"',23)";
									}
									
								}
							}
							msql = "select date_format(purchasedate,'%Y-%m-%d') da ,M.price pri from purchasedetail M inner join purchase N on M.mainid=N.id where M.status=1 "+ sql1 +" order by date_format(purchasedate,'%Y-%m-%d')";
							
							ssql = "select convert(varchar(100),N.purchasedate,23) da ,M.price pri from purchasedetail M inner join purchase N on M.mainid=N.id where M.status=1 "+ sql1 +" order by convert(varchar(100),N.purchasedate,23)";
							if(iFlag == 0){
								statement = msql;
							}else{
								statement = ssql;
							}
							List<Object[]> o = ss.createSQLQuery(statement).list();
							if(!o.isEmpty()){
								int length = o.size();
								if(length<6){
									for(int j=0;j<length;j++){
										Purchase purchase = new Purchase();
										purchase.setZdy10(o.get(j)[0].toString());
										purchase.setZdy1("0");
										purchases.add(purchase);
									}
									for(int j=0;j<length;j++){
										for(int i=0;i<length;i++){
											if(o.get(i)[0].toString().equalsIgnoreCase(purchases.get(j).getZdy10())){
												purchases.get(j).setZdy1(o.get(i)[1].toString());
												break;
											}
										}
									}
								}else{
									for(int j=0;j<6;j++){
										Purchase purchase = new Purchase();
										purchase.setZdy10(o.get(j)[0].toString());
										purchase.setZdy1("0");
										purchases.add(purchase);
									}
									for(int j=0;j<6;j++){
										for(int i=0;i<6;i++){
											if(o.get(i)[0].toString().equalsIgnoreCase(purchases.get(j).getZdy10())){
												purchases.get(j).setZdy1(o.get(i)[1].toString());
												break;
											}
										}
									}
									
								}
								
							}else{
								purchases = this.commonGetPurchases();
							}
						}else{
							purchases = this.commonGetPurchases();
						}
					}else if(idtype.equalsIgnoreCase("supplierproductprice")){
						String sql1 = "";
						if(!typeid.equalsIgnoreCase("0")){
							int len = typeid.split("_").length;
							for(int i=0;i<len;i++){
								if(typeid.split("_")[i].indexOf("supplier")>-1){
									String supplierno = "";
									try {
										supplierno = URLDecoder.decode(typeid.split("_")[i].split("=")[1],"UTF-8");
									} catch (UnsupportedEncodingException e) {
										e.printStackTrace();
									}
									List<Object> supplierids = ss.createSQLQuery("select id from supplier where status=1 and supplierno='" + supplierno + "'" + sql).list();
									if(!supplierids.isEmpty()){
										sql1 += " and N.supplierid="+supplierids.get(0).toString();
									}
									
								}else if(typeid.split("_")[i].indexOf("product")>-1){
									String str = "";
									try {
										str = URLDecoder.decode(typeid.split("_")[i].split("=")[1],"UTF-8");
									} catch (UnsupportedEncodingException e) {
										e.printStackTrace();
									}
									List<Object> productids = ss.createSQLQuery("select id from product where status=1 and productno='" +str+ "'").list();
									if(!productids.isEmpty()){
										sql1 += " and M.productid=" + productids.get(0).toString();
									}
									
								}else if(typeid.split("_")[i].indexOf("startdate")>-1){
									if(iFlag == 0){
										sql1 += " and date_format(N.purchasedate,'%Y-%m-%d')>=date_format('"+ typeid.split("_")[i].split("=")[1] +"','%Y-%m-%d')";
									}else{
										sql1 += " and convert(varchar(100),N.purchasedate,23)>=convert(varchar(100),'"+ typeid.split("_")[i].split("=")[1] +"',23)";
									}
									
								}else if(typeid.split("_")[i].indexOf("enddate")>-1){
									if(iFlag == 0){
										sql1 += " and date_format(N.purchasedate,'%Y-%m-%d')<=date_format('"+ typeid.split("_")[i].split("=")[1] +"','%Y-%m-%d')";
									}else{
										sql1 += " and convert(varchar(100),N.purchasedate,23)<=convert(varchar(100),'"+ typeid.split("_")[i].split("=")[1] +"',23)";
									}
									
								}
							}
							msql = "select date_format(purchasedate,'%Y-%m-%d') da ,M.price pri ,N.supplierid from purchasedetail M inner join purchase N on M.mainid=N.id where M.status=1 "+ sql1 +" order by date_format(purchasedate,'%Y-%m-%d')";
							
							ssql = "select convert(varchar(100),N.purchasedate,23) da ,M.price pri ,N.supplierid from purchasedetail M inner join purchase N on M.mainid=N.id where M.status=1 "+ sql1 +" order by convert(varchar(100),N.purchasedate,23)";
							if(iFlag == 0){
								statement = msql;
							}else{
								statement = ssql;
							}
							List<Object[]> o = ss.createSQLQuery(statement).list();
							if(!o.isEmpty()){
								int length = o.size();
								if(length<6){
									for(int j=0;j<length;j++){
										Purchase purchase = new Purchase();
										purchase.setZdy10(o.get(j)[0].toString());
										purchase.setZdy1("0");
										purchases.add(purchase);
									}
									for(int j=0;j<length;j++){
										for(int i=0;i<length;i++){
											if(o.get(i)[0].toString().equalsIgnoreCase(purchases.get(j).getZdy10())){
												purchases.get(j).setZdy1(o.get(i)[1].toString());
												break;
											}
										}
									}
								}else{
									for(int j=0;j<6;j++){
										Purchase purchase = new Purchase();
										purchase.setZdy10(o.get(j)[0].toString());
										purchase.setZdy1("0");
										purchases.add(purchase);
									}
									for(int j=0;j<6;j++){
										for(int i=0;i<6;i++){
											if(o.get(i)[0].toString().equalsIgnoreCase(purchases.get(j).getZdy10())){
												purchases.get(j).setZdy1(o.get(i)[1].toString());
												break;
											}
										}
									}
									
								}
								
							}else{
								purchases = this.commonGetPurchases();
							}
						}else{
							purchases = this.commonGetPurchases();
						}
					}
					
					
					if (purchases.isEmpty()){
						Purchase a = new Purchase();
						a.setZdy3(mmessage.nodata);
						a.setZdy1("1");
						a.setZdy2("");
						a.setZdy4("");					
						a.setId(0);
						purchases.add(a);
					}else{
						for(int i=0;i<purchases.size();i++){
							if(!idtype.equalsIgnoreCase("money")){
								if(purchases.get(i).getZdy5() != null){
									purchases.get(i).setZdy8(purchases.get(i).getZdy5());
								}
								List<Object> o3 = ss.createSQLQuery("select name from supplier where id="+ purchases.get(i).getSupplierid()).list();
								if(!o3.isEmpty()){
									purchases.get(i).setZdy4(o3.get(0).toString());
								}else{
									purchases.get(i).setZdy4("");
								}
								List<Object> o2 = ss.createSQLQuery("select name from users where id="+ purchases.get(i).getUserid()).list();
								if(!o2.isEmpty()){
									purchases.get(i).setZdy3(o2.get(0).toString());
								}else{
									purchases.get(i).setZdy3("");
								}
								if(purchases.get(i).getPurchasedate() != null){
									purchases.get(i).setZdy2(sformat.format(purchases.get(i).getPurchasedate()));
								}else{
									purchases.get(i).setZdy2("");
								}
								if(purchases.get(i).getCreatedate() != null){
									purchases.get(i).setZdy6(sformat.format(purchases.get(i).getCreatedate()));
								}else{
									purchases.get(i).setZdy6("");
								}
							}
						}
					}
				}else{
					purchases = new ArrayList<Purchase>();
					if (purchases.isEmpty()){
						Purchase a = new Purchase();
						a.setZdy3(mmessage.nopermission);
						a.setZdy1("1");
						a.setZdy2("");
						a.setZdy4("");
						a.setId(0);
						purchases.add(a);
					}
				}				
			}else{
				purchases = new ArrayList<Purchase>();
				if (purchases.isEmpty()){
					Purchase a = new Purchase();
					a.setZdy3(mmessage.notlogin);
					a.setZdy1("1");
					a.setZdy2("");
					a.setZdy4("");
					a.setId(0);
					purchases.add(a);
				}
			}
		}
		
		HibernateUtil_new.closeSession();
		return purchases;
	}
	
	
	public List<Purchase> commonGetPurchases(){
		List<Purchase> purchases = new ArrayList<Purchase>();
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
		Purchase p = new Purchase();
		p.setId(6);
		p.setZdy10(m6);
		p.setStatus(0);
		p.setZdy1("0");
		purchases.add(p);
		p = new Purchase();
		p.setId(5);
		p.setZdy10(m5);
		p.setStatus(0);
		purchases.add(p);
		p = new Purchase();
		p.setId(4);
		p.setZdy10(m4);
		p.setStatus(0);
		purchases.add(p);
		p = new Purchase();
		p.setId(3);
		p.setZdy10(m3);
		p.setStatus(0);
		purchases.add(p);
		p = new Purchase();
		p.setId(2);
		p.setZdy10(m2);
		p.setStatus(0);
		purchases.add(p);
		p = new Purchase();
		p.setId(1);
		p.setZdy10(m1);
		p.setStatus(0);
		purchases.add(p);
		return purchases;
	}
}
