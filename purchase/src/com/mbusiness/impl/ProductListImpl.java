package com.mbusiness.impl;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;

import com.mbusiness.dao.ProductListDAO;
import com.mbusiness.model.Product;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.CommonJudgeDB;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Inputverify;
import com.mbusiness.util.MMessage;

public class ProductListImpl implements ProductListDAO {
	
	private Session ss;
	private MMessage mmessage = new MMessage();
	private List<Product> products = new ArrayList<Product>();
	private Inputverify inputverify = new Inputverify();
	private HasPermission hasPermission = new HasPermission();
	private String statement;
	private String msql;
	private String ssql;
	@Override
	public List<Product> list(Usersession usersession, String idtype, String typeid, int start, int limit, int page) {
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
			Product a = new Product();
			a.setName(mmessage.stringillegal);
			a.setZdy1("1");
			a.setZdy2("");
			a.setZdy3("");
			a.setId(0);
			products.add(a);
		}else{
			if (!usersession.getUsername().equalsIgnoreCase("")){
				flag = 0;
				if(usersession.getUsername().equalsIgnoreCase("admin")){
					flag = 1;
				}else{					
					if (hasPermission.hasPermission(usersession.getUsername(), "product", "searchdata", ss) == 1){
						flag = 1;						
					}
				}
				if(flag == 1){
					if(idtype.equalsIgnoreCase("all")){
						msql = "select * from product where status=1 order by id limit " + start + "," + limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
								"select * from product where status=1) M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						products = ss.createSQLQuery(statement).addEntity(Product.class).list();
						if(!products.isEmpty()){
							List<Object> o = ss.createSQLQuery("select id from product where status=1 order by id").list();
							products.get(0).setZdy1(o.size()+"");
							for(int m=0; m<products.size(); m++){
								products.get(m).setName(products.get(m).getProductno()+ "-" +products.get(m).getName());
							}
						}
					}else if(idtype.equalsIgnoreCase("allwithlimit")){
						msql = "select * from product where status=1 order by id limit "+ start +","+ limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
								"select * from product where status=1) M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						products = ss.createSQLQuery(statement).addEntity(Product.class).list();
						if(!products.isEmpty()){
							List<Object> o = ss.createSQLQuery("select id from product where status=1 order by id ").list();
							products.get(0).setZdy1(o.size()+"");
						}
					}else if(idtype.equalsIgnoreCase("search")){
						try {
							msql = "select * from product where status=1 and (name like '%"+ URLDecoder.decode(typeid,"UTF-8") +"%' or productno like '%"+ URLDecoder.decode(typeid,"UTF-8") +"%') order by id limit "+ start +","+ limit;
							ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
									"select * from product where status=1 and (name like '%"+ URLDecoder.decode(typeid,"UTF-8") +"%' or productno like '%"+ URLDecoder.decode(typeid,"UTF-8") +"%')) M) L where L.rownumber>" + start;
						} catch (UnsupportedEncodingException e) {
							e.printStackTrace();
						}
						
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						products = ss.createSQLQuery(statement).addEntity(Product.class).list();
						if(!products.isEmpty()){
							List<Object> o = ss.createSQLQuery("select id from product where status=1 and (name like '%"+ typeid +"%')").list();
							products.get(0).setZdy1(o.size()+"");
						}
					}else if(idtype.equalsIgnoreCase("spec")){
						msql = "select * from product where status=1 and productspecid="+ typeid +" order by id limit "+ start +","+ limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
								"select * from product where status=1 and productspecid="+ typeid +") M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						products = ss.createSQLQuery(statement).addEntity(Product.class).list();
						if(!products.isEmpty()){
							List<Object> o = ss.createSQLQuery("select id from product where status=1 and productspecid="+ typeid ).list();
							products.get(0).setZdy1(o.size()+"");
						}
					}else if(idtype.equalsIgnoreCase("type")){
						msql = "select * from product where status=1 and producttypeid="+ typeid +" order by id limit "+ start +","+ limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
								"select * from product where status=1 and producttypeid="+ typeid +") M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						products = ss.createSQLQuery(statement).addEntity(Product.class).list();
						if(!products.isEmpty()){
							List<Object> o = ss.createSQLQuery("select id from product where status=1 and producttypeid="+ typeid ).list();
							products.get(0).setZdy1(o.size()+"");
						}
					}else if(idtype.equalsIgnoreCase("new")){
						msql = "select * from product where status=1 and type=1 order by -id limit "+ start +","+ limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id desc) as rownumber,M.* from(" +
								"select * from product where status=1 and type=1) M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						products = ss.createSQLQuery(statement).addEntity(Product.class).list();
						if(!products.isEmpty()){
							List<Object> o = ss.createSQLQuery("select id from product where status=1 order by id ").list();
							products.get(0).setZdy1(o.size()+"");
						}
					}else if(idtype.equalsIgnoreCase("id")){
						products = ss.createSQLQuery("select * from product where status=1 and type=1 and id="+ typeid).addEntity(Product.class).list();
						if(!products.isEmpty()){
							products.get(0).setZdy1("1");
						}
					}else if(idtype.equalsIgnoreCase("exchange")){
						msql = "select * from product where status=1 and id in(select productid from pointrule where status=1) and productspecid in(select productspecid from pointrule where status=1) order by -id limit "+ start +","+ limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id desc) as rownumber,M.* from(" +
								"select * from product where status=1 and id in(select productid from pointrule where status=1) and productspecid in(select productspecid from pointrule where status=1)) M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						products = ss.createSQLQuery(statement).addEntity(Product.class).list();
						if(!products.isEmpty()){
							List<Object> o = ss.createSQLQuery("select id from product where status=1 order by id ").list();
							products.get(0).setZdy1(o.size()+"");
						}
					}else if(idtype.equalsIgnoreCase("exchangeid")){
						products = ss.createSQLQuery("select * from product where status=1 and id="+ typeid).addEntity(Product.class).list();
						if(!products.isEmpty()){
							products.get(0).setZdy1("1");
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
								if(typeid.split("_")[i].indexOf("producttype")>-1){
									String name = "";
									try {
										name = URLDecoder.decode(typeid.split("_")[i].split("=")[1],"UTF-8");
									} catch (UnsupportedEncodingException e) {
										e.printStackTrace();
									}
									List<Object> producttypeids = ss.createSQLQuery("select id from producttype where status=1 and " +
											"name like '%"+ name +"%'").list();
									String str = "";
									for(int m=0; m<producttypeids.size(); m++){
										str = str + producttypeids.get(m).toString() + ",";
									}
									str = str.substring(0, str.length()-1);
									sql1 += " and producttypeid in("+ str +")";
								}
								if(typeid.split("_")[i].indexOf("productspec")>-1){
									List<Object> productspecids = ss.createSQLQuery("select id from productspec where status=1 and " +
											"name like '%"+ typeid.split("_")[i].split("=")[1] +"%'").list();
									String str = "";
									for(int m=0; m<productspecids.size(); m++){
										str = str + productspecids.get(m).toString() + ",";
									}
									if(!str.equalsIgnoreCase("")){
										str = str.substring(0, str.length()-1);
										sql1 += " and productspecid in("+ str +")";
									}
									
								}
							}
						}
						msql = "select * from product where status=1 " + sql1 +" order by -id limit " + start + "," + limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id desc) as rownumber,M.* from(" +
								"select * from product where status=1 " + sql1 +") M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						products = ss.createSQLQuery(statement).addEntity(Product.class).list();
						if(!products.isEmpty()){
							List<Object> o = ss.createSQLQuery("select id from product where status=1 " + sql1 +" order by id ").list();
							products.get(0).setZdy1(o.size()+"");
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
								if(typeid.split("_")[i].indexOf("producttype")>-1){
									String name = "";
									try {
										name = URLDecoder.decode(typeid.split("_")[i].split("=")[1],"UTF-8");
									} catch (UnsupportedEncodingException e) {
										e.printStackTrace();
									}
									List<Object> producttypeids = ss.createSQLQuery("select id from producttype where status=1 and " +
											"name like '%"+ name +"%'").list();
									String str = "";
									for(int m=0; m<producttypeids.size(); m++){
										str = str + producttypeids.get(m).toString() + ",";
									}
									str = str.substring(0, str.length()-1);
									sql1 += " and producttypeid in("+ str +")";
								}
								if(typeid.split("_")[i].indexOf("productspec")>-1){
									List<Object> productspecids = ss.createSQLQuery("select id from productspec where status=1 and " +
											"name like '%"+ typeid.split("_")[i].split("=")[1] +"%'").list();
									String str = "";
									for(int m=0; m<productspecids.size(); m++){
										str = str + productspecids.get(m).toString() + ",";
									}
									if(!str.equalsIgnoreCase("")){
										str = str.substring(0, str.length()-1);
										sql1 += " and producttypeid in("+ str +")";
									}
									
								}
							}
						}
						msql = "select * from product where status=1 " + sql1 +" order by -id limit 0,500";
						
						ssql = "select top 500* from(select ROW_NUMBER() over(order by M.id desc) as rownumber,M.* from(" +
								"select * from product where status=1 " + sql1 +") M) L where L.rownumber>0";
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						products = ss.createSQLQuery(statement).addEntity(Product.class).list();
						if(!products.isEmpty()){
							List<Object> o = ss.createSQLQuery("select id from product where status=1 " + sql1 +" order by id ").list();
							products.get(0).setZdy1(o.size()+"");
						}
					}
					
					
					if (products.isEmpty()){
						Product a = new Product();
						a.setName(mmessage.nodata);	
						a.setZdy1("1");
						a.setZdy2("");
						a.setZdy3("");
						a.setId(0);
						products.add(a);
					}else{
						for(int i=0;i<products.size();i++){
							List<Object> o = ss.createSQLQuery("select name from productspec where id="+ products.get(i).getProductspecid()).list();
							if(!o.isEmpty()){
								products.get(i).setZdy2(o.get(0).toString());
							}
							List<Object> o1 = ss.createSQLQuery("select name from producttype where id="+ products.get(i).getProducttypeid()).list();
							if(!o1.isEmpty()){
								products.get(i).setZdy3(o1.get(0).toString());
							} 
						}
					}
				}else{
					products = new ArrayList<Product>();
					if (products.isEmpty()){
						Product a = new Product();
						a.setName(mmessage.nopermission);
						a.setZdy1("1");
						a.setZdy2("");
						a.setZdy3("");
						a.setId(0);
						products.add(a);
					}
				}				
			}else{
				products = new ArrayList<Product>();
				if (products.isEmpty()){
					Product a = new Product();
					a.setName(mmessage.notlogin);
					a.setZdy1("1");
					a.setZdy2("");
					a.setZdy3("");
					a.setId(0);
					products.add(a);
				}
			}
		}
		
		HibernateUtil_new.closeSession();
		return products;
	}

}
