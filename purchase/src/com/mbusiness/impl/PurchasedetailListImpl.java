package com.mbusiness.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.hibernate.Session;

import com.mbusiness.dao.PurchasedetailListDAO;
import com.mbusiness.model.Purchasedetail;
import com.mbusiness.model.Supplier;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.CommonJudgeDB;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Inputverify;
import com.mbusiness.util.MMessage;

public class PurchasedetailListImpl implements PurchasedetailListDAO {
	
	private Session ss;
	private MMessage mmessage = new MMessage();
	private List<Purchasedetail> purchasedetails = new ArrayList<Purchasedetail>();
	private HasPermission hasPermission = new HasPermission();
	private Inputverify inputverify = new Inputverify();
	private String ssql;
	private String msql;
	private String statement;
	@Override
	public List<Purchasedetail> list(Usersession usersession, String idtype, String typeid, int start, int limit, int page) {
		//iFlag=0 mysql; iFlag=1 sqlserver
		int iFlag = CommonJudgeDB.judgeDB();
		HibernateUtil_new.closeSession();
		ss = HibernateUtil_new.currentSession();
		ss.beginTransaction();
		purchasedetails = new ArrayList<Purchasedetail>();
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
			Purchasedetail a = new Purchasedetail();
			a.setZdy3(mmessage.stringillegal);
			a.setZdy1("1");
			a.setZdy2("");
			a.setZdy4("");
			a.setId(0);
			purchasedetails.add(a);
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
						sql = " and orgid="+ o0.get(0)[0].toString();
					}else{
						sql = " and orgid=0";
					}
					if(idtype.equalsIgnoreCase("all")){
						purchasedetails = ss.createSQLQuery("select * from purchasedetail where status=1 order by id").addEntity(Purchasedetail.class).list();
						
						if(!purchasedetails.isEmpty()){
							purchasedetails.get(0).setZdy1(purchasedetails.size()+"");
						}
					}else if(idtype.equalsIgnoreCase("allwithlimit")){
						if(iFlag == 0){
							purchasedetails = ss.createSQLQuery("select * from purchasedetail where status=1 order by id limit "+ start +","+ limit).addEntity(Purchasedetail.class).list();
						}else{
							purchasedetails = ss.createSQLQuery( "select top "+ limit +"* from(select ROW_NUMBER() over( order by M.id) as rownumber,M.* from(" +
									"select * from purchasedetail where status=1) M) L where L.rownumber>" + start).addEntity(Purchasedetail.class).list();
						}
						if(!purchasedetails.isEmpty()){
							List<Object> o = ss.createSQLQuery("select id from purchasedetail where status=1 order by id ").list();
							purchasedetails.get(0).setZdy1(o.size()+"");
						}
					}else if(idtype.equalsIgnoreCase("search")){
						purchasedetails = ss.createSQLQuery("select * from purchasedetail where status=1 and (purchasedetailno like '%"+ typeid +"%' or type in(select value from keyvalue where status=1 and keyname like '%"+ typeid +"%')) order by id limit "+ start +","+ limit).addEntity(Purchasedetail.class).list();
						if(!purchasedetails.isEmpty()){
							List<Object> o = ss.createSQLQuery("select id from purchasedetail where status=1 and (title like '%"+ typeid +"%' or content like '%"+ typeid +"%')").list();
							purchasedetails.get(0).setZdy1(o.size()+"");
						}
					}else if(idtype.equalsIgnoreCase("userwithlimit")){
						if(iFlag == 0){
							purchasedetails = ss.createSQLQuery("select * from purchasedetail where status=1 and userid="+ typeid +" order by id limit "+ start +","+ limit).addEntity(Purchasedetail.class).list();
						}else{
							purchasedetails = ss.createSQLQuery( "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
									"select * from purchasedetail where status=1 and userid="+ typeid +") M) L where L.rownumber>" + start).addEntity(Purchasedetail.class).list();
						}
						if(!purchasedetails.isEmpty()){
							List<Object> o = ss.createSQLQuery("select id from purchasedetail where status=1 and userid="+ typeid).list();
							purchasedetails.get(0).setZdy1(o.size()+"");
						}
					}else if(idtype.equalsIgnoreCase("mainid")){
						purchasedetails = ss.createSQLQuery("select * from purchasedetail where status=1 and mainid="+ typeid).addEntity(Purchasedetail.class).list();
						if(!purchasedetails.isEmpty()){
							List<Object> o;
							if(iFlag == 0){
								o = ss.createSQLQuery("select DATE_FORMAT(purchasedate,'%Y-%m-%d') from purchase where id="+ typeid).list();
							}else{
								o = ss.createSQLQuery("select convert(varchar(100),purchasedate,23) from purchase where id="+ typeid).list();
							}
							if(!o.isEmpty()){
								purchasedetails.get(0).setZdy7(o.get(0).toString());
							}else{
								purchasedetails.get(0).setZdy7("");
							}
							purchasedetails.get(0).setZdy1(""+ purchasedetails.size());
						}
					}else if(idtype.equalsIgnoreCase("mywithlimit")){
						typeid = o0.get(0)[1].toString();
						purchasedetails = ss.createSQLQuery("select * from purchasedetail where status=1 and mainid in(select id from purchase where status=1 and userid="+ typeid +") order by -id limit "+ start +","+ limit).addEntity(Purchasedetail.class).list();
						if(!purchasedetails.isEmpty()){
							purchasedetails.get(0).setZdy1(""+ purchasedetails.size());
						}
					}else if(idtype.equalsIgnoreCase("last")){
						List<Object> o;
						if(iFlag == 0){
							o = ss.createSQLQuery("select id from purchase where status=1 "+ sql +" order by purchasedate desc limit 0,5").list();
						}else{
							
							o = ss.createSQLQuery("select top 5 L.id from(select ROW_NUMBER() over(order by M.purchasedate desc) as rownumber,M.* from(" +
									"select id,purchasedate from purchase where status=1 "+ sql +") M) L where L.rownumber>0").list();
						}
						
						if(!o.isEmpty()){
							String ids = "";
							for(int i=0;i<o.size();i++){
								ids =  ids +","+ o.get(i).toString();
							}
							if(iFlag == 0){
								purchasedetails = ss.createSQLQuery("select * from purchasedetail where status=1 and mainid in("+ ids.substring(1) +") order by productid limit 0,5").addEntity(Purchasedetail.class).list();
							}else{
								purchasedetails = ss.createSQLQuery("select top 5 * from(select ROW_NUMBER() over(order by M.productid) as rownumber,M.* from(" +
										"select * from purchasedetail where status=1 and mainid in("+ ids.substring(1) +")) M) L where L.rownumber>0").addEntity(Purchasedetail.class).list();
							}
							
							if(!purchasedetails.isEmpty()){
								purchasedetails.get(0).setZdy1("5");
								purchasedetails.get(0).setZdy2("");
								purchasedetails.get(0).setZdy3("");
								purchasedetails.get(0).setZdy5("");
								purchasedetails.get(0).setZdy6("");
								purchasedetails.get(0).setZdy7("");
							}
						}
					}else if(idtype.equalsIgnoreCase("id")){
						purchasedetails = ss.createSQLQuery("select * from purchasedetail where status=1 and mainid="+ typeid).addEntity(Purchasedetail.class).list();
						if(!purchasedetails.isEmpty()){
							purchasedetails.get(0).setZdy1(""+ purchasedetails.size());
						}
					}else if(idtype.equalsIgnoreCase("supplierproductprice")){
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
						Purchasedetail d = new Purchasedetail();
						d.setId(6);
						d.setZdy10(m6);
						d.setStatus(0);
						d.setZdy1("6");
						purchasedetails.add(d);
						d = new Purchasedetail();
						d.setId(5);
						d.setZdy10(m5);
						d.setStatus(0);
						purchasedetails.add(d);
						d = new Purchasedetail();
						d.setId(4);
						d.setZdy10(m4);
						d.setStatus(0);
						purchasedetails.add(d);
						d = new Purchasedetail();
						d.setId(3);
						d.setZdy10(m3);
						d.setStatus(0);
						purchasedetails.add(d);
						d = new Purchasedetail();
						d.setId(2);
						d.setZdy10(m2);
						d.setStatus(0);
						purchasedetails.add(d);
						d = new Purchasedetail();
						d.setId(1);
						d.setZdy10(m1);
						d.setStatus(0);
						purchasedetails.add(d);
						msql = "";
						
						ssql = "";
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						List<Object[]> o = ss.createSQLQuery(statement).list();
						if(!o.isEmpty()){
							for(int j=0;j<purchasedetails.size();j++){
								for(int i=0;i<o.size();i++){
									if(o.get(i)[0].toString().equalsIgnoreCase(purchasedetails.get(j).getZdy10())){
										purchasedetails.get(j).setStatus(Integer.parseInt(o.get(i)[1].toString()));
										break;
									}
								}
							}
						}
						
					}
					if (purchasedetails.isEmpty()){
						Purchasedetail a = new Purchasedetail();
						a.setZdy3(mmessage.nodata);
						a.setMainid(0);
						a.setZdy1("1");
						a.setZdy2("");
						a.setZdy4("");	
						a.setZdy3("");
						a.setZdy5("");
						a.setZdy6("");
						a.setZdy7("");
						a.setId(0);
						purchasedetails.add(a);
					}else{
						for(int i=0;i<purchasedetails.size();i++){
							List<Object[]> o1 = ss.createSQLQuery("select name,productno from product where status=1 and id="+ purchasedetails.get(i).getProductid()).list();
							if(!o1.isEmpty()){
								if(idtype.equalsIgnoreCase("mainid")){
									if(o1.get(0)[1] != null){
										purchasedetails.get(i).setZdy2(o1.get(0)[1].toString()+ "-" +o1.get(0)[0].toString());
									}else{
										purchasedetails.get(i).setZdy2(""+ "-" +o1.get(0)[0].toString());
									}
								}else{
									purchasedetails.get(i).setZdy2(o1.get(0)[0].toString());
								}
								
							}else{
								purchasedetails.get(i).setZdy2("");
							}
							List<Object> o2 = ss.createSQLQuery("select name from productspec where status=1 and id="+ purchasedetails.get(i).getProductspecid()).list();
							if(!o2.isEmpty()){
								purchasedetails.get(i).setZdy3(o2.get(0).toString());
							}else{
								purchasedetails.get(i).setZdy3("");
							}
							List<Object> o3 = ss.createSQLQuery("select name from productunit where status=1 and id="+ purchasedetails.get(i).getProductunitid()).list();
							if(!o3.isEmpty()){
								purchasedetails.get(i).setZdy4(o3.get(0).toString());
							}else{
								purchasedetails.get(i).setZdy4("");
							}
							if(iFlag == 0){
								
							}
							List<Object[]> o4;
							if(iFlag == 0){
								o4 = ss.createSQLQuery("select DATE_FORMAT(a.purchasedate,'%Y-%m-%d'),a.purchaseno,b.name from purchase a,supplier b where a.supplierid=b.id and a.id="+ purchasedetails.get(i).getMainid()).list();
							}else{
								o4 = ss.createSQLQuery("select convert(varchar(100),a.purchasedate,23),a.purchaseno,b.name from purchase a,supplier b where a.supplierid=b.id and a.id="+ purchasedetails.get(i).getMainid()).list();
							}
							
							if(!o4.isEmpty()){
								purchasedetails.get(i).setZdy5(o4.get(0)[0].toString());
								if(o4.get(0)[1] == null){
									purchasedetails.get(i).setZdy6("0");
								}else{
									purchasedetails.get(i).setZdy6(o4.get(0)[1].toString());
								}
								purchasedetails.get(i).setZdy7(o4.get(0)[2].toString());
							}else{
								purchasedetails.get(i).setZdy5("");
								purchasedetails.get(i).setZdy6("");
								purchasedetails.get(i).setZdy7("");
							}
						}
					}
				}else{
					purchasedetails = new ArrayList<Purchasedetail>();
					if (purchasedetails.isEmpty()){
						Purchasedetail a = new Purchasedetail();
						a.setZdy3(mmessage.nopermission);
						a.setZdy1("1");
						a.setZdy2("");
						a.setZdy4("");
						a.setId(0);
						purchasedetails.add(a);
					}
				}				
			}else{
				purchasedetails = new ArrayList<Purchasedetail>();
				if (purchasedetails.isEmpty()){
					Purchasedetail a = new Purchasedetail();
					a.setZdy3(mmessage.notlogin);
					a.setZdy1("1");
					a.setZdy2("");
					a.setZdy4("");
					a.setId(0);
					purchasedetails.add(a);
				}
			}
		}
		
		HibernateUtil_new.closeSession();
		return purchasedetails;
	}

}
