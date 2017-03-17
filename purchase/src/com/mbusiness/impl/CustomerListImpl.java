package com.mbusiness.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;

import com.mbusiness.dao.CustomerListDAO;
import com.mbusiness.model.Customer;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.CommonJudgeDB;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Inputverify;
import com.mbusiness.util.MMessage;

public class CustomerListImpl implements CustomerListDAO {
	
	private Session ss;
	private MMessage mmessage = new MMessage();
	private List<Customer> customers;
	private Inputverify inputverify = new Inputverify();
	private HasPermission hasPermission = new HasPermission();
	private String statement;
	private String msql;
	private String ssql;
	@Override
	public List<Customer> list(Usersession usersession, String idtype, String typeid, int start, int limit, int page) {
		//iFlag=0 mysql; iFlag=1 sqlserver
		int iFlag = CommonJudgeDB.judgeDB();
		HibernateUtil_new.closeSession();
		ss = HibernateUtil_new.currentSession();
		ss.beginTransaction();
		SimpleDateFormat sformat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		customers = new ArrayList<Customer>();
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
			Customer a = new Customer();
			a.setName(mmessage.stringillegal);
			a.setZdy1("0");
			a.setId(0);
			customers.add(a);
		}else{			
			if (!usersession.getUsername().equalsIgnoreCase("")){
				flag = 0;
				if(usersession.getUsername().equalsIgnoreCase("admin")){
					flag = 1;
				}else{					
					if(hasPermission.hasPermission(usersession.getUsername(), "customer", "searchdata", ss) == 1){
						flag = 1;						
					}else if(idtype.equalsIgnoreCase("user")){
						flag = 1;
					}
				}
				if(flag == 1){
					if(idtype.equalsIgnoreCase("allwithlimit")){
						if(typeid.equalsIgnoreCase("")){
							typeid = "1";
						}
						String sql = "";
						if(Integer.parseInt(typeid) > 0){
							sql = " and type="+ typeid;
						}
						if(usersession.getUsername().equalsIgnoreCase("admin")){
							msql = "select * from customer where status=1 "+ sql +" order by -id limit "+ start +","+ limit;
							
							ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id desc) as rownumber,M.* from(" +
									"select * from customer where status=1 "+ sql +") M) L where L.rownumber>" + start;
							if(iFlag == 0){
								statement = msql;
							}else{
								statement = ssql;
							}
							customers = ss.createSQLQuery(statement).addEntity(Customer.class).list();
							if(!customers.isEmpty()){
								List<Object> o = ss.createSQLQuery("select id from customer where status=1 "+ sql +" order by id").list();
								customers.get(0).setZdy1(o.size()+"");
							}
						}else{
							if(typeid.split("_")[0].equalsIgnoreCase("1")){
								GetmyAgent ga = new GetmyAgent();
								String salerids = ga.get(ss, usersession.getUsername());
								if(salerids.equalsIgnoreCase("")){
									salerids = "0";
								}
								List<Object> o =  ss.createSQLQuery("select id from users where status=1 and account='"+ usersession.getUsername() +"' and salestatus=1").list();
								if(!o.isEmpty()){
									msql = "select * from customer where status=1 "+ sql +" and (id in(select customerid from users where status=1 and id in("+ salerids +")) or (manageruserid in("+ salerids +") and saleuserid="+ o.get(0).toString() +")) order by id limit "+ start +","+ limit;
									
									ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
											"select * from customer where status=1 "+ sql +" and (id in(select customerid from users where status=1 and id in("+ salerids +")) or (manageruserid in("+ salerids +") and saleuserid="+ o.get(0).toString() +"))) M) L where L.rownumber>" + start;
									if(iFlag == 0){
										statement = msql;
									}else{
										statement = ssql;
									}
									customers = ss.createSQLQuery(statement).addEntity(Customer.class).list();
									if(!customers.isEmpty()){
										List<Object> o1 = ss.createSQLQuery("select * from customer where status=1 "+ sql +" and (id in(select customerid from users where status=1 and id in("+ salerids +")) or (manageruserid in("+ salerids +") and saleuserid="+ o.get(0).toString() +"))").list();
										customers.get(0).setZdy1(o1.size()+"");
									}
								}else{
									msql = "select * from customer where status=1 "+ sql +" and (id in(select customerid from users where status=1 and id in("+ salerids +")) or manageruserid in("+ salerids +")) order by id limit "+ start +","+ limit;
									
									ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
											"select * from customer where status=1 "+ sql +" and (id in(select customerid from users where status=1 and id in("+ salerids +")) or manageruserid in("+ salerids +"))) M) L where L.rownumber>" + start;
									if(iFlag == 0){
										statement = msql;
									}else{
										statement = ssql;
									}
									customers = ss.createSQLQuery(statement).addEntity(Customer.class).list();
									if(!customers.isEmpty()){
										List<Object> o1 = ss.createSQLQuery("select * from customer where status=1 "+ sql +" and (id in(select customerid from users where status=1 and id in("+ salerids +")) or manageruserid in("+ salerids +"))").list();
										customers.get(0).setZdy1(o1.size()+"");
									}
								}
							}else if(typeid.split("_")[0].equalsIgnoreCase("2")){
								GetmyAgent ga = new GetmyAgent();
								String salerids = ga.get(ss, usersession.getUsername());
								GetmyDoctor gd = new GetmyDoctor();
								String doctorids = gd.get(ss, salerids);	
								if(doctorids.equalsIgnoreCase("")){
									doctorids = "0";
								}
								msql = "select * from customer where status=1 "+ sql +" and id in(select customerid from users where status=1 and id in("+ doctorids +")) order by id limit "+ start +","+ limit;
								
								ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
										"select * from customer where status=1 "+ sql +" and id in(select customerid from users where status=1 and id in("+ doctorids +"))) M) L where L.rownumber>" + start;
								if(iFlag == 0){
									statement = msql;
								}else{
									statement = ssql;
								}
								customers = ss.createSQLQuery(statement).addEntity(Customer.class).list();
								if(!customers.isEmpty()){
									List<Object> o1 = ss.createSQLQuery("select * from customer where status=1 "+ sql +" and id in(select customerid from users where status=1 and id in("+ doctorids +"))").list();
									customers.get(0).setZdy1(o1.size()+"");
								}
							}else if(typeid.split("_")[0].equalsIgnoreCase("4")){
								GetmyAgent ga = new GetmyAgent();
								String salerids = ga.get(ss, usersession.getUsername());
								GetmyDoctor gd = new GetmyDoctor();
								String doctorids = gd.get(ss, salerids);	
								if(salerids.equalsIgnoreCase("")){
									salerids = "0";
								}	
								if(doctorids.equalsIgnoreCase("")){
									doctorids = "0";
								}
								msql = "select * from customer where status=1 "+ sql +" and salerid in("+ doctorids +","+ salerids +") order by id limit "+ start +","+ limit;
								
								ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
										"select * from customer where status=1 "+ sql +" and salerid in("+ doctorids +","+ salerids +")) M) L where L.rownumber>" + start;
								if(iFlag == 0){
									statement = msql;
								}else{
									statement = ssql;
								}
								customers = ss.createSQLQuery(statement).addEntity(Customer.class).list();
								if(!customers.isEmpty()){
									List<Object> o1 = ss.createSQLQuery("select * from customer where status=1 "+ sql +" and salerid in("+ doctorids +","+ salerids +")").list();
									customers.get(0).setZdy1(o1.size()+"");
								}
							}else if(typeid.split("_")[0].equalsIgnoreCase("3")){
								msql = "select * from customer where status=1 "+ sql +" order by id limit "+ start +","+ limit;
								
								ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
										"select * from customer where status=1 "+ sql +") M) L where L.rownumber>" + start;
								if(iFlag == 0){
									statement = msql;
								}else{
									statement = ssql;
								}
								customers = ss.createSQLQuery(statement).addEntity(Customer.class).list();
								if(!customers.isEmpty()){
									List<Object> o1 = ss.createSQLQuery("select * from customer where status=1 "+ sql).list();
									customers.get(0).setZdy1(o1.size()+"");
								}
							}else if(typeid.split("_")[0].equalsIgnoreCase("5")){
								msql = "select * from customer where status=1 "+ sql +" order by id limit "+ start +","+ limit;
								
								ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
										"select * from customer where status=1 "+ sql +") M) L where L.rownumber>" + start;
								if(iFlag == 0){
									statement = msql;
								}else{
									statement = ssql;
								}
								customers = ss.createSQLQuery(statement).addEntity(Customer.class).list();
								if(!customers.isEmpty()){
									List<Object> o1 = ss.createSQLQuery("select * from customer where status=1 "+ sql).list();
									customers.get(0).setZdy1(o1.size()+"");
								}
							}							
						}
					}else if(idtype.equalsIgnoreCase("all")){
						if(typeid.equalsIgnoreCase("")){
							typeid = "1";
						}
						String sql = "";
						if(Integer.parseInt(typeid) > 0){
							sql = " and type="+ typeid;
						}
						if(usersession.getUsername().equalsIgnoreCase("admin")){
							customers = ss.createSQLQuery("select * from customer where status=1 "+ sql +" order by id").addEntity(Customer.class).list();
							if(!customers.isEmpty()){
								customers.get(0).setZdy1(customers.size()+"");
							}
						}else{
							if(typeid.split("_")[0].equalsIgnoreCase("1")){
								GetmyAgent ga = new GetmyAgent();
								String salerids = ga.get(ss, usersession.getUsername());
								if(salerids.equalsIgnoreCase("")){
									salerids = "0";
								}
								List<Object> o =  ss.createSQLQuery("select id from users where status=1 and account='"+ usersession.getUsername() +"' and salestatus=1").list();
								if(!o.isEmpty()){
									msql = "select * from customer where status=1 "+ sql +" and (id in(select customerid from users where status=1 and id in("+ salerids +")) or (manageruserid in("+ salerids +") and saleuserid="+ o.get(0).toString() +")) order by id limit "+ start +","+ limit;
									
									ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
											"select * from customer where status=1 "+ sql +" and (id in(select customerid from users where status=1 and id in("+ salerids +")) or (manageruserid in("+ salerids +") and saleuserid="+ o.get(0).toString() +"))) M) L where L.rownumber>" + start;
									if(iFlag == 0){
										statement = msql;
									}else{
										statement = ssql;
									}
									customers = ss.createSQLQuery(statement).addEntity(Customer.class).list();
									if(!customers.isEmpty()){
										List<Object> o1 = ss.createSQLQuery("select * from customer where status=1 "+ sql +" and (id in(select customerid from users where status=1 and id in("+ salerids +")) or (manageruserid in("+ salerids +") and saleuserid="+ o.get(0).toString() +"))").list();
										customers.get(0).setZdy1(o1.size()+"");
									}
								}else{
									msql = "select * from customer where status=1 "+ sql +" and (id in(select customerid from users where status=1 and id in("+ salerids +")) or manageruserid in("+ salerids +")) order by id limit "+ start +","+ limit;
									
									ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
											"select * from customer where status=1 "+ sql +" and (id in(select customerid from users where status=1 and id in("+ salerids +")) or manageruserid in("+ salerids +"))) M) L where L.rownumber>" + start;
									if(iFlag == 0){
										statement = msql;
									}else{
										statement = ssql;
									}
									customers = ss.createSQLQuery(statement).addEntity(Customer.class).list();
									if(!customers.isEmpty()){
										List<Object> o1 = ss.createSQLQuery("select * from customer where status=1 "+ sql +" and (id in(select customerid from users where status=1 and id in("+ salerids +")) or manageruserid in("+ salerids +"))").list();
										customers.get(0).setZdy1(o1.size()+"");
									}
								}
							}else if(typeid.split("_")[0].equalsIgnoreCase("2")){
								GetmyAgent ga = new GetmyAgent();
								String salerids = ga.get(ss, usersession.getUsername());
								GetmyDoctor gd = new GetmyDoctor();
								String doctorids = gd.get(ss, salerids);	
								if(doctorids.equalsIgnoreCase("")){
									doctorids = "0";
								}
								customers = ss.createSQLQuery("select * from customer where status=1 "+ sql +" and id in(select customerid from users where status=1 and id in("+ doctorids +")) order by id ").addEntity(Customer.class).list();
								if(!customers.isEmpty()){
									List<Object> o1 = ss.createSQLQuery("select * from customer where status=1 "+ sql +" and id in(select customerid from users where status=1 and id in("+ doctorids +"))").list();
									customers.get(0).setZdy1(o1.size()+"");
								}
							}else if(typeid.split("_")[0].equalsIgnoreCase("4")){
								GetmyAgent ga = new GetmyAgent();
								String salerids = ga.get(ss, usersession.getUsername());
								GetmyDoctor gd = new GetmyDoctor();
								String doctorids = gd.get(ss, salerids);	
								if(salerids.equalsIgnoreCase("")){
									salerids = "0";
								}	
								if(doctorids.equalsIgnoreCase("")){
									doctorids = "0";
								}
								//System.err.println("select * from customer where status=1 "+ sql +" and salerid in("+ doctorids +","+ salerids +") order by id");
								customers = ss.createSQLQuery("select * from customer where status=1 "+ sql +" and salerid in("+ doctorids +","+ salerids +") order by id ").addEntity(Customer.class).list();
								if(!customers.isEmpty()){
									List<Object> o1 = ss.createSQLQuery("select * from customer where status=1 "+ sql +" and salerid in("+ doctorids +","+ salerids +")").list();
									customers.get(0).setZdy1(o1.size()+"");
								}
							}else if(typeid.split("_")[0].equalsIgnoreCase("3")){
								customers = ss.createSQLQuery("select * from customer where status=1 "+ sql +" order by id").addEntity(Customer.class).list();
								if(!customers.isEmpty()){
									List<Object> o1 = ss.createSQLQuery("select * from customer where status=1 "+ sql).list();
									customers.get(0).setZdy1(o1.size()+"");
								}
							}else if(typeid.split("_")[0].equalsIgnoreCase("5")){
								customers = ss.createSQLQuery("select * from customer where status=1 "+ sql +" order by id").addEntity(Customer.class).list();
								if(!customers.isEmpty()){
									List<Object> o1 = ss.createSQLQuery("select * from customer where status=1 "+ sql).list();
									customers.get(0).setZdy1(o1.size()+"");
								}
							}						
						}
					}else if(idtype.equalsIgnoreCase("search")){
						String sql = "";
						if(typeid.indexOf("_") > 0){
							String t1 = "";
							if(typeid.split("_").length == 2){
								t1 = typeid.split("_")[1];
							}
							sql = " and type="+ typeid.split("_")[0] +" and (name like '%"+ t1 +"%' or customerno like '%"+ t1 +"%' or phoneno like '%"+ t1 +"%' or tel like '%"+ t1 +"%' or salerid in(select id from users where status=1 and name like '%"+ t1 +"%' or phoneno like '%"+ t1 +"%') or provinceid in(select id from province where name like '%"+ t1 +"%') or cityid in(select id from city where name like '%"+ t1 +"%') or townid in(select id from town where name like '%"+ t1 +"%') or diagnosis like '%"+ t1 +"%')";
						}
						if(usersession.getUsername().equalsIgnoreCase("admin")){
							customers = ss.createSQLQuery("select * from customer where status=1 "+ sql +" order by id ").addEntity(Customer.class).list();
							if(!customers.isEmpty()){
								//List<Object> o = ss.createSQLQuery("select id from customer where status=1 "+ sql +" order by id").list();
								customers.get(0).setZdy1(customers.size()+"");
							}
						}else{
							if(typeid.split("_")[0].equalsIgnoreCase("1")){
								GetmyAgent ga = new GetmyAgent();
								String salerids = ga.get(ss, usersession.getUsername());
								if(salerids.equalsIgnoreCase("")){
									salerids = "0";
								}
								List<Object> o =  ss.createSQLQuery("select id from users where status=1 and account='"+ usersession.getUsername() +"' and salestatus=1").list();
								if(!o.isEmpty()){
									customers = ss.createSQLQuery("select * from customer where status=1 "+ sql +" and (id in(select customerid from users where status=1 and id in("+ salerids +")) or (manageruserid in("+ salerids +") and saleuserid="+ o.get(0).toString() +")) order by id ").addEntity(Customer.class).list();
									if(!customers.isEmpty()){
										//List<Object> o1 = ss.createSQLQuery("select * from customer where status=1 "+ sql +" and (id in(select customerid from user where status=1 and id in("+ salerids +")) or (manageruserid in("+ salerids +") and saleuserid="+ o.get(0).toString() +"))").list();
										customers.get(0).setZdy1(customers.size()+"");
									}
								}else{
									customers = ss.createSQLQuery("select * from customer where status=1 "+ sql +" and (id in(select customerid from users where status=1 and id in("+ salerids +")) or manageruserid in("+ salerids +")) order by id ").addEntity(Customer.class).list();
									if(!customers.isEmpty()){
										//List<Object> o1 = ss.createSQLQuery("select * from customer where status=1 "+ sql +" and (id in(select customerid from user where status=1 and id in("+ salerids +")) or manageruserid in("+ salerids +"))").list();
										customers.get(0).setZdy1(customers.size()+"");
									}
								}
								
							}else if(typeid.split("_")[0].equalsIgnoreCase("2")){
								GetmyAgent ga = new GetmyAgent();
								String salerids = ga.get(ss, usersession.getUsername());
								GetmyDoctor gd = new GetmyDoctor();
								String doctorids = gd.get(ss, salerids);	
								if(doctorids.equalsIgnoreCase("")){
									doctorids = "0";
								}
								customers = ss.createSQLQuery("select * from customer where status=1 "+ sql +" and id in(select customerid from users where status=1 and id in("+ doctorids +")) order by id").addEntity(Customer.class).list();
								if(!customers.isEmpty()){
									//List<Object> o1 = ss.createSQLQuery("select * from customer where status=1 "+ sql +" and id in(select customerid from user where status=1 and id in("+ doctorids +"))").list();
									customers.get(0).setZdy1(customers.size()+"");
								}
							}else if(typeid.split("_")[0].equalsIgnoreCase("4")){
								GetmyAgent ga = new GetmyAgent();
								String salerids = ga.get(ss, usersession.getUsername());
								GetmyDoctor gd = new GetmyDoctor();
								String doctorids = gd.get(ss, salerids);	
								if(salerids.equalsIgnoreCase("")){
									salerids = "0";
								}	
								if(doctorids.equalsIgnoreCase("")){
									doctorids = "0";
								}
								//System.err.println("select * from customer where status=1 "+ sql +" and salerid in("+ doctorids +","+ salerids +") order by id");
								customers = ss.createSQLQuery("select * from customer where status=1 "+ sql +" and salerid in("+ doctorids +","+ salerids +") order by id ").addEntity(Customer.class).list();
								if(!customers.isEmpty()){
									//List<Object> o1 = ss.createSQLQuery("select * from customer where status=1 "+ sql +" and salerid in("+ doctorids +","+ salerids +")").list();
									customers.get(0).setZdy1(customers.size()+"");
								}
							}else if(typeid.split("_")[0].equalsIgnoreCase("3")){
								customers = ss.createSQLQuery("select * from customer where status=1 "+ sql +" order by id ").addEntity(Customer.class).list();
								if(!customers.isEmpty()){
									//List<Object> o1 = ss.createSQLQuery("select * from customer where status=1 "+ sql).list();
									customers.get(0).setZdy1(customers.size()+"");
								}
							}else if(typeid.split("_")[0].equalsIgnoreCase("5")){
								customers = ss.createSQLQuery("select * from customer where status=1 "+ sql +" order by id").addEntity(Customer.class).list();
								if(!customers.isEmpty()){
									//List<Object> o1 = ss.createSQLQuery("select * from customer where status=1 "+ sql).list();
									customers.get(0).setZdy1(customers.size()+"");
								}
							}						
						}
					}else if(idtype.equalsIgnoreCase("hospital")){
						GetmyAgent ga = new GetmyAgent();
						customers = ss.createSQLQuery("select * from customer where status=1 and type=5 order by id").addEntity(Customer.class).list();
						if(!customers.isEmpty()){
							customers.get(0).setZdy1(customers.size()+"");
						}
					}else if(idtype.equalsIgnoreCase("outstock")){
						String sql = " and type in(1,3,4)";
						if(usersession.getUsername().equalsIgnoreCase("admin")){
							customers = ss.createSQLQuery("select * from customer where status=1 "+ sql +" order by id").addEntity(Customer.class).list();
							if(!customers.isEmpty()){
								customers.get(0).setZdy1(customers.size()+"");
							}
						}else{
							GetmyAgent ga = new GetmyAgent();
							String salerids = ga.get(ss, usersession.getUsername());
							GetmyDoctor gd = new GetmyDoctor();
							String doctorids = gd.get(ss, salerids);
							GetmyPatient gp = new GetmyPatient();
							String patientids = gp.get(ss, doctorids, salerids);
							sql = " and id in(select customerid from users where status=1 and id in("+ patientids +")";
							customers = ss.createSQLQuery("select * from customer where status=1 "+ sql +" order by id").addEntity(Customer.class).list();
							if(!customers.isEmpty()){
								customers.get(0).setZdy1(customers.size()+"");
							}							
						}
					}else if(idtype.equalsIgnoreCase("newdrugstore")){
						msql = "select * from customer where status=1 and type=3 order by -id limit "+ start +","+ limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id desc) as rownumber,M.* from(" +
								"select * from customer where status=1 and type=3) M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						customers = ss.createSQLQuery(statement).addEntity(Customer.class).list();
						if(!customers.isEmpty()){
							customers.get(0).setZdy1(customers.size()+"");
						}
					}else if(idtype.equalsIgnoreCase("searchdrugstore")){
						customers = ss.createSQLQuery("select * from customer where status=1 and type=3 and (name like '%"+ typeid +"%' or customerno like '%"+ typeid +"%' or phoneno like '%"+ typeid +"%' or tel like '%"+ typeid +"%') order by id ").addEntity(Customer.class).list();
						if(!customers.isEmpty()){
							customers.get(0).setZdy1(customers.size()+"");
						}
					}else if(idtype.equalsIgnoreCase("user")){
						customers = ss.createSQLQuery("select * from customer where status=1 and id=(select customerid from users where status=1 and account='"+ usersession.getUsername() +"')").addEntity(Customer.class).list();
						if(!customers.isEmpty()){
							if(customers.get(0).getId() == 0){
								List<Object[]> o = ss.createSQLQuery("select name,phoneno from users where status=1 and account='"+ usersession.getUsername() +"'").list();
								if(!o.isEmpty()){
									customers.get(0).setPhoneno(o.get(0)[1].toString());
									customers.get(0).setName(o.get(0)[0].toString());
								}
							}else{
								customers.get(0).setPhoneno(customers.get(0).getPhoneno().split("-")[0]);
							}
							customers.get(0).setZdy1(customers.size()+"");
						}
					}else if(idtype.equalsIgnoreCase("mywithlimit")){
						msql = "select * from customer where status=1 and type=4 and salerid=(select id from users where status=1 and account='"+ usersession.getUsername() +"') limit "+ start +","+ limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
								"select * from customer where status=1 and type=4 and salerid=(select id from users where status=1 and account='"+ usersession.getUsername() +"')) M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						customers = ss.createSQLQuery(statement).addEntity(Customer.class).list();
						if(!customers.isEmpty()){
							customers.get(0).setPhoneno(customers.get(0).getPhoneno().split("-")[0]);
							customers.get(0).setZdy1(customers.size()+"");
							for(int i=0;i<customers.size();i++){
								List<Object> o = ss.createSQLQuery("select auditstatus from users where status=1 and customerid="+ customers.get(i).getId()).list();
								if(!o.isEmpty()){
									customers.get(i).setStatus(Integer.parseInt(o.get(0).toString()));
								}else{
									customers.get(i).setStatus(0);
								}
							}
						}
					}else if(idtype.equalsIgnoreCase("searchmywithlimit")){
						msql = "select * from customer where status=1 and type=4 and (name like '%"+ typeid +"%' or phoneno like '%"+ typeid +"%') and salerid=(select id from users where status=1 and account='"+ usersession.getUsername() +"') limit "+ start +","+ limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
								"select * from customer where status=1 and type=4 and (name like '%"+ typeid +"%' or phoneno like '%"+ typeid +"%') and salerid=(select id from users where status=1 and account='"+ usersession.getUsername() +"')) M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						customers = ss.createSQLQuery(statement).addEntity(Customer.class).list();
						if(!customers.isEmpty()){
							customers.get(0).setPhoneno(customers.get(0).getPhoneno().split("-")[0]);
							customers.get(0).setZdy1(customers.size()+"");
							for(int i=0;i<customers.size();i++){
								List<Object> o = ss.createSQLQuery("select auditstatus from users where status=1 and customerid="+ customers.get(i).getId()).list();
								if(!o.isEmpty()){
									customers.get(i).setStatus(Integer.parseInt(o.get(0).toString()));
								}else{
									customers.get(i).setStatus(0);
								}
							}
						}
					}else if(idtype.equalsIgnoreCase("mywithlimittoday")){
						msql = "select * from customer where status=1 and type=4 and DATE_FORMAT(createdate,'%Y-%m-%d')=DATE_FORMAT(now(),'%Y-%m-%d') and salerid=(select id from users where status=1 and account='"+ usersession.getUsername() +"') limit "+ start +","+ limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
								"select * from customer where status=1 and type=4 and DATE_FORMAT(createdate,'%Y-%m-%d')=DATE_FORMAT(now(),'%Y-%m-%d') and salerid=(select id from users where status=1 and account='"+ usersession.getUsername() +"')) M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						customers = ss.createSQLQuery(statement).addEntity(Customer.class).list();
						if(!customers.isEmpty()){
							customers.get(0).setPhoneno(customers.get(0).getPhoneno().split("-")[0]);
							customers.get(0).setZdy1(customers.size()+"");
							for(int i=0;i<customers.size();i++){
								List<Object> o = ss.createSQLQuery("select auditstatus from users where status=1 and customerid="+ customers.get(i).getId()).list();
								if(!o.isEmpty()){
									customers.get(i).setStatus(Integer.parseInt(o.get(0).toString()));
								}else{
									customers.get(i).setStatus(0);
								}
							}
						}
					}else if(idtype.equalsIgnoreCase("mywithlimitthismonth")){
						msql = "select * from customer where status=1 and type=4 and DATE_FORMAT(createdate,'%Y-%m')=DATE_FORMAT(now(),'%Y-%m') and salerid=(select id from users where status=1 and account='"+ usersession.getUsername() +"') limit "+ start +","+ limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
								"select * from customer where status=1 and type=4 and DATE_FORMAT(createdate,'%Y-%m')=DATE_FORMAT(now(),'%Y-%m') and salerid=(select id from users where status=1 and account='"+ usersession.getUsername() +"')) M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						customers = ss.createSQLQuery(statement).addEntity(Customer.class).list();
						if(!customers.isEmpty()){
							customers.get(0).setPhoneno(customers.get(0).getPhoneno().split("-")[0]);
							customers.get(0).setZdy1(customers.size()+"");
							for(int i=0;i<customers.size();i++){
								List<Object> o = ss.createSQLQuery("select auditstatus from users where status=1 and customerid="+ customers.get(i).getId()).list();
								if(!o.isEmpty()){
									customers.get(i).setStatus(Integer.parseInt(o.get(0).toString()));
								}else{
									customers.get(i).setStatus(0);
								}
							}
						}
					}else if(idtype.equalsIgnoreCase("mypatient")){
						GetmyAgent ga = new GetmyAgent();
						String salerids = ga.get(ss, usersession.getUsername());
						GetmyDoctor gd = new GetmyDoctor();
						String doctorids = gd.get(ss, salerids);	
						if(salerids.equalsIgnoreCase("")){
							salerids = "0";
						}	
						if(doctorids.equalsIgnoreCase("")){
							doctorids = "0";
						}
						//System.err.println("select * from customer where status=1 and type=4 and salerid in("+ doctorids +","+ salerids +") order by id");
						customers = ss.createSQLQuery("select * from customer where status=1 and type=4 and (salerid in("+ doctorids +","+ salerids +") or salerid=(select id from users where status=1 and account='"+ usersession.getUsername() +"')) order by id ").addEntity(Customer.class).list();
						if(!customers.isEmpty()){
							List<Object> o1 = ss.createSQLQuery("select * from customer where status=1 and type=4 and salerid in("+ doctorids +","+ salerids +")").list();
							customers.get(0).setZdy1(o1.size()+"");
						}
					}else if(idtype.equalsIgnoreCase("mydoctorwithlimit")){
						GetmyAgent ga = new GetmyAgent();
						String salerids = ga.get(ss, usersession.getUsername());
						GetmyDoctor gd = new GetmyDoctor();
						String doctorids = gd.get(ss, salerids);	
						if(doctorids.equalsIgnoreCase("")){
							doctorids = "0";
						}
						customers = ss.createSQLQuery("select * from customer where status=1 and type=2 and id in(select customerid from users where status=1 and id in("+ doctorids +")) order by id ").addEntity(Customer.class).list();
						if(!customers.isEmpty()){
							List<Object> o1 = ss.createSQLQuery("select * from customer where status=1 and type=2 and id in(select customerid from users where status=1 and id in("+ doctorids +"))").list();
							customers.get(0).setZdy1(o1.size()+"");
						}
					}else if(idtype.equalsIgnoreCase("myhospital")){
						String doctorids = "";
						String salerids = "";
						GetmyAgent ga = new GetmyAgent();
						salerids = ga.get(ss, usersession.getUsername());
						GetmyDoctor gd = new GetmyDoctor();
						doctorids = gd.get(ss, salerids);
						List<Object> o = ss.createSQLQuery("select id from users where status=1 and account='"+ usersession.getUsername() +"'").list();
						if(!o.isEmpty()){
							String sql = " and salerid="+ o.get(0).toString();
							if(!doctorids.equalsIgnoreCase("")){
								sql = " and (salerid="+ o.get(0).toString() +" or id in(select hospitalid from customer where id in(select customerid from users where id in("+ doctorids +"))))";
							}
							msql = "select * from customer where status=1 and type=5 "+ sql  +" order by id limit "+ start +","+ limit;
							
							ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
									"select * from customer where status=1 and type=5 "+ sql  +") M) L where L.rownumber>" + start;
							if(iFlag == 0){
								statement = msql;
							}else{
								statement = ssql;
							}
							customers = ss.createSQLQuery(statement).addEntity(Customer.class).list();
							if(!customers.isEmpty()){
								customers.get(0).setZdy1(customers.size()+"");
							}
						}	
					}else if(idtype.equalsIgnoreCase("mydoctorinhospital")){
						List<Object> o = ss.createSQLQuery("select id from users where status=1 and account='"+ usersession.getUsername() +"'").list();
						if(!o.isEmpty()){
							msql = "select * from customer where status=1 and type=2 and salerid="+ o.get(0).toString() +" and hospitalid="+ typeid +" order by id limit "+ start +","+ limit;
							
							ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
									"select * from customer where status=1 and type=2 and salerid="+ o.get(0).toString() +" and hospitalid="+ typeid +") M) L where L.rownumber>" + start;
							if(iFlag == 0){
								statement = msql;
							}else{
								statement = ssql;
							}
							customers = ss.createSQLQuery(statement).addEntity(Customer.class).list();
							if(!customers.isEmpty()){
								customers.get(0).setZdy1(customers.size()+"");
							}
						}	
					}else if(idtype.equalsIgnoreCase("id")){
						customers = ss.createSQLQuery("select * from customer where status=1 and id="+ typeid).addEntity(Customer.class).list();
						if(!customers.isEmpty()){
							customers.get(0).setZdy1(customers.size()+"");
						}
					}else if(idtype.equalsIgnoreCase("salerwithlimit")){
						GetmyAgent ga = new GetmyAgent();
						String salerids = ga.get(ss, usersession.getUsername());
						GetmyDoctor gd = new GetmyDoctor();
						String doctorids = gd.get(ss, salerids);	
						if(salerids.equalsIgnoreCase("")){
							salerids = "0";
						}	
						if(doctorids.equalsIgnoreCase("")){
							doctorids = "0";
						}
						msql = "select * from customer where status=1 and type=4 and (salerid in("+ doctorids +","+ salerids +") or salerid=(select id from users where status=1 and account='"+ usersession.getUsername() +"')) and id>0 order by id limit "+ start +","+ limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
								"select * from customer where status=1 and type=4 and (salerid in("+ doctorids +","+ salerids +") or salerid=(select id from users where status=1 and account='"+ usersession.getUsername() +"')) and id>0) M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						customers = ss.createSQLQuery(statement).addEntity(Customer.class).list();
						if(!customers.isEmpty()){
							customers.get(0).setZdy1(customers.size()+"");
							customers.get(0).setPhoneno(customers.get(0).getPhoneno().split("-")[0]);
							for(int i=0;i<customers.size();i++){
								List<Object> o = ss.createSQLQuery("select auditstatus from users where status=1 and customerid="+ customers.get(i).getId()).list();
								if(!o.isEmpty()){
									customers.get(i).setStatus(Integer.parseInt(o.get(0).toString()));
								}else{
									customers.get(i).setStatus(0);
								}
							}
						}
					}else if(idtype.equalsIgnoreCase("salerwithlimittoday")){
						GetmyAgent ga = new GetmyAgent();
						String salerids = ga.get(ss, usersession.getUsername());
						GetmyDoctor gd = new GetmyDoctor();
						String doctorids = gd.get(ss, salerids);	
						if(salerids.equalsIgnoreCase("")){
							salerids = "0";
						}	
						if(doctorids.equalsIgnoreCase("")){
							doctorids = "0";
						}
						msql = "select * from customer where status=1 and type=4 and DATE_FORMAT(createdate,'%Y-%m-%d')=DATE_FORMAT(now(),'%Y-%m-%d') and (salerid in("+ doctorids +","+ salerids +") or salerid=(select id from users where status=1 and account='"+ usersession.getUsername() +"')) and id>0 order by id limit "+ start +","+ limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
								"select * from customer where status=1 and type=4 and DATE_FORMAT(createdate,'%Y-%m-%d')=DATE_FORMAT(now(),'%Y-%m-%d') and (salerid in("+ doctorids +","+ salerids +") or salerid=(select id from users where status=1 and account='"+ usersession.getUsername() +"')) and id>0) M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						customers = ss.createSQLQuery(statement).addEntity(Customer.class).list();
						if(!customers.isEmpty()){
							customers.get(0).setZdy1(customers.size()+"");
							customers.get(0).setPhoneno(customers.get(0).getPhoneno().split("-")[0]);
							for(int i=0;i<customers.size();i++){
								List<Object> o = ss.createSQLQuery("select auditstatus from users where status=1 and customerid="+ customers.get(i).getId()).list();
								if(!o.isEmpty()){
									customers.get(i).setStatus(Integer.parseInt(o.get(0).toString()));
								}else{
									customers.get(i).setStatus(0);
								}
							}
						}
					}else if(idtype.equalsIgnoreCase("salerwithlimitthismonth")){
						GetmyAgent ga = new GetmyAgent();
						String salerids = ga.get(ss, usersession.getUsername());
						GetmyDoctor gd = new GetmyDoctor();
						String doctorids = gd.get(ss, salerids);	
						if(salerids.equalsIgnoreCase("")){
							salerids = "0";
						}	
						if(doctorids.equalsIgnoreCase("")){
							doctorids = "0";
						}
						msql = "select * from customer where status=1 and type=4 and DATE_FORMAT(createdate,'%Y-%m')=DATE_FORMAT(now(),'%Y-%m') and (salerid in("+ doctorids +","+ salerids +") or salerid=(select id from users where status=1 and account='"+ usersession.getUsername() +"')) and id>0 order by id limit "+ start +","+ limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
								"select * from customer where status=1 and type=4 and DATE_FORMAT(createdate,'%Y-%m')=DATE_FORMAT(now(),'%Y-%m') and (salerid in("+ doctorids +","+ salerids +") or salerid=(select id from users where status=1 and account='"+ usersession.getUsername() +"')) and id>0 ) M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						customers = ss.createSQLQuery(statement).addEntity(Customer.class).list();
						if(!customers.isEmpty()){
							customers.get(0).setZdy1(customers.size()+"");
							customers.get(0).setPhoneno(customers.get(0).getPhoneno().split("-")[0]);
							for(int i=0;i<customers.size();i++){
								List<Object> o = ss.createSQLQuery("select auditstatus from users where status=1 and customerid="+ customers.get(i).getId()).list();
								if(!o.isEmpty()){
									customers.get(i).setStatus(Integer.parseInt(o.get(0).toString()));
								}else{
									customers.get(i).setStatus(0);
								}
							}
						}
					}else if(idtype.equalsIgnoreCase("searchsalerwithlimit")){
						GetmyAgent ga = new GetmyAgent();
						String salerids = ga.get(ss, usersession.getUsername());
						GetmyDoctor gd = new GetmyDoctor();
						String doctorids = gd.get(ss, salerids);	
						if(salerids.equalsIgnoreCase("")){
							salerids = "0";
						}	
						if(doctorids.equalsIgnoreCase("")){
							doctorids = "0";
						}
						msql = "select * from customer where status=1 and type=4 and (name like '%"+ typeid +"%' or phoneno like '%"+ typeid +"%') and (salerid in("+ doctorids +","+ salerids +") or salerid=(select id from users where status=1 and account='"+ usersession.getUsername() +"')) and id>0 order by id limit "+ start +","+ limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
								"select * from customer where status=1 and type=4 and (name like '%"+ typeid +"%' or phoneno like '%"+ typeid +"%') and (salerid in("+ doctorids +","+ salerids +") or salerid=(select id from users where status=1 and account='"+ usersession.getUsername() +"')) and id>0) M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						customers = ss.createSQLQuery(statement).addEntity(Customer.class).list();
						if(!customers.isEmpty()){
							customers.get(0).setPhoneno(customers.get(0).getPhoneno().split("-")[0]);
							customers.get(0).setZdy1(customers.size()+"");
							for(int i=0;i<customers.size();i++){
								List<Object> o = ss.createSQLQuery("select auditstatus from users where status=1 and customerid="+ customers.get(i).getId()).list();
								if(!o.isEmpty()){
									customers.get(i).setStatus(Integer.parseInt(o.get(0).toString()));
								}else{
									customers.get(i).setStatus(0);
								}
							}
						}
					}else if(idtype.equalsIgnoreCase("agentsale")){
						GetmyAgent ga = new GetmyAgent();
						String salerids = ga.get(ss, usersession.getUsername());
						if(!salerids.equalsIgnoreCase("")){
							salerids = " and id in(select customerid from users where id in("+ salerids +"))";
						}
						msql = "select provinceid,cityid,count(id) from customer where status=1 and type=1 "+ salerids +" group by provinceid,cityid limit "+ start +","+ limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
								"select provinceid,cityid,count(id) from customer where status=1 and type=1 "+ salerids +" group by provinceid,cityid) M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						List<Object[]> o = ss.createSQLQuery(statement).list();
						if(!o.isEmpty() && o.get(0)[0] != null){
							List<Object[]> o1 = ss.createSQLQuery("select provinceid,cityid,count(id) from customer where status=1 and type=1 "+ salerids +" group by provinceid,cityid").list();
							for(int i=0;i<o.size();i++){
								Customer c = new Customer();
								c.setId(i+1);
								c.setProvinceid(Integer.parseInt(o.get(i)[0].toString()));
								c.setCityid(Integer.parseInt(o.get(i)[1].toString()));
								c.setAge(Integer.parseInt(o.get(i)[2].toString()));
								customers.add(c);
							}
							customers.get(0).setZdy1(o1.size()+"");
						}
					}else if(idtype.equalsIgnoreCase("doctorsearchoutline")){
						GetmyAgent ga = new GetmyAgent();
						String salerids = ga.get(ss, usersession.getUsername());
						if(!salerids.equalsIgnoreCase("")){
							salerids = " and id in(select customerid from users where salerid in("+ salerids +"))";
						}
						msql = "select provinceid,cityid,count(id),hospitalid from customer where status=1 and type=2 "+ salerids +" group by provinceid,cityid,hospitalid limit "+ start +","+ limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
								"select provinceid,cityid,count(id),hospitalid from customer where status=1 and type=2 "+ salerids +" group by provinceid,cityid,hospitalid) M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						List<Object[]> o = ss.createSQLQuery(statement).list();
						if(!o.isEmpty() && o.get(0)[0] != null){
							List<Object[]> o1 = ss.createSQLQuery("select provinceid,cityid,count(id) from customer where status=1 and type=2 "+ salerids +" group by provinceid,cityid,hospitalid").list();
							for(int i=0;i<o.size();i++){
								Customer c = new Customer();
								c.setId(i+1);
								c.setProvinceid(Integer.parseInt(o.get(i)[0].toString()));
								c.setCityid(Integer.parseInt(o.get(i)[1].toString()));
								c.setAge(Integer.parseInt(o.get(i)[2].toString()));
								List<Object> o2 = ss.createSQLQuery("select name from customer where id="+ o.get(i)[3].toString()).list();
								if(!o2.isEmpty()){
									c.setZdy5(o2.get(0).toString());
								}else{
									c.setZdy5("");
								}
								customers.add(c);
							}
							customers.get(0).setZdy1(o1.size()+"");
						}
					}else if(idtype.equalsIgnoreCase("doctorsearch")){
						int provinceid = 0;
						int cityid = 0;
						int hospitalid = 0;
						if(typeid.split("_").length == 3){
							List<Object> o11 = ss.createSQLQuery("select id from province where status=1 and name='"+ typeid.split("_")[0] +"'").list();
							if(!o11.isEmpty()){
								provinceid = Integer.parseInt(o11.get(0).toString());
							}
							List<Object> o12 = ss.createSQLQuery("select id from city where status=1 and name='"+ typeid.split("_")[1] +"'").list();
							if(!o12.isEmpty()){
								cityid = Integer.parseInt(o12.get(0).toString());
							}
							List<Object> o13 = ss.createSQLQuery("select id from customer where status=1 and type=5 and name='"+ typeid.split("_")[2] +"'").list();
							if(!o13.isEmpty()){
								hospitalid = Integer.parseInt(o13.get(0).toString());
							}
						}
						GetmyAgent ga = new GetmyAgent();
						String salerids = ga.get(ss, usersession.getUsername());
						if(!salerids.equalsIgnoreCase("")){
							salerids = " and id in(select customerid from users where salerid in("+ salerids +"))";
						}
						msql = "select * from customer where status=1 and type=2 and provinceid="+ provinceid +" and cityid="+ cityid +" and hospitalid="+ hospitalid + salerids +" limit "+ start +","+ limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
								"select * from customer where status=1 and type=2 and provinceid="+ provinceid +" and cityid="+ cityid +" and hospitalid="+ hospitalid + salerids +") M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						customers = ss.createSQLQuery(statement).addEntity(Customer.class).list();
						if(!customers.isEmpty()){
							List<Object[]> o1 = ss.createSQLQuery("select id from customer where status=1 and type=2 "+ salerids).list();
							for(int i=0;i<customers.size();i++){
								List<Object> o2 = ss.createSQLQuery("select name from customer where id="+ customers.get(i).getHospitalid()).list();
								if(!o2.isEmpty()){
									customers.get(i).setZdy9(o2.get(0).toString());
								}else{
									customers.get(i).setZdy9("");
								}
							}
							customers.get(0).setZdy1(o1.size()+"");
						}
					}else if(idtype.equalsIgnoreCase("doctorpatientoutline")){
						GetmyAgent ga = new GetmyAgent();
						String salerids = ga.get(ss, usersession.getUsername());
						GetmyDoctor gd = new GetmyDoctor();
						String doctorids = gd.get(ss, salerids);
						if(!doctorids.equalsIgnoreCase("")){
							doctorids = " and id in(select customerid from users where salerid in("+ doctorids +"))";
						}
						msql = "select provinceid,cityid,count(id),salerid from customer where status=1 and type=4 "+ doctorids +" group by provinceid,cityid,salerid limit "+ start +","+ limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
								"select provinceid,cityid,count(id),salerid from customer where status=1 and type=4 "+ doctorids +" group by provinceid,cityid,salerid) M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						List<Object[]> o = ss.createSQLQuery(statement).list();
						if(!o.isEmpty() && o.get(0)[0] != null){
							List<Object[]> o1 = ss.createSQLQuery("select provinceid,cityid,count(id),salerid from customer where status=1 and type=4 "+ doctorids +" group by provinceid,cityid,salerid").list();
							for(int i=0;i<o.size();i++){
								Customer c = new Customer();
								c.setId(i+1);
								c.setProvinceid(Integer.parseInt(o.get(i)[0].toString()));
								c.setCityid(Integer.parseInt(o.get(i)[1].toString()));
								c.setAge(Integer.parseInt(o.get(i)[2].toString()));
								List<Object[]> o3 = ss.createSQLQuery("select name,hospitalid from customer where id=(select customerid from users where id="+ o.get(i)[3].toString() +")").list();
								if(!o3.isEmpty()){
									List<Object> o2 = ss.createSQLQuery("select name from customer where id="+ o3.get(0)[1].toString()).list();
									if(!o2.isEmpty()){
										c.setZdy5(o2.get(0).toString());
									}else{
										c.setZdy5("");
									}
									c.setZdy6(o3.get(0)[0].toString());
								}else{
									c.setZdy6("");
								}
								customers.add(c);
							}
							customers.get(0).setZdy1(o1.size()+"");
						}
					}else if(idtype.equalsIgnoreCase("doctorpatient")){
						int provinceid = 0;
						int cityid = 0;
						int doctorid = 0;
						if(typeid.split("_").length == 4){
							List<Object> o11 = ss.createSQLQuery("select id from province where status=1 and name='"+ typeid.split("_")[0] +"'").list();
							if(!o11.isEmpty()){
								provinceid = Integer.parseInt(o11.get(0).toString());
							}
							List<Object> o12 = ss.createSQLQuery("select id from city where status=1 and name='"+ typeid.split("_")[1] +"'").list();
							if(!o12.isEmpty()){
								cityid = Integer.parseInt(o12.get(0).toString());
							}
							GetmyAgent ga = new GetmyAgent();
							String salerids = ga.get(ss, usersession.getUsername());
							List<Object> o14 = ss.createSQLQuery("select id from customer where status=1 and type=2 and salerid in("+ salerids +") and name='"+ typeid.split("_")[3] +"'").list();
							if(!o14.isEmpty()){
								doctorid = Integer.parseInt(o14.get(0).toString());
							}
							customers = ss.createSQLQuery("select * from customer where status=1 and type=4 and provinceid="+ provinceid +" and cityid="+ cityid +" and salerid=(select id from users where customerid="+ doctorid +") limit "+ start +","+ limit).addEntity(Customer.class).list();
							if(!customers.isEmpty()){
								List<Object[]> o1 = ss.createSQLQuery("select id from customer where status=1 and type=4 and provinceid="+ provinceid +" and cityid="+ cityid +" and salerid=(select id from users where customerid="+ doctorid +")").list();
								customers.get(0).setZdy1(o1.size()+"");
							}
						}
					}else if(idtype.equalsIgnoreCase("patientsale")){
						GetmyAgent ga = new GetmyAgent();
						String salerids = ga.get(ss, usersession.getUsername());
						GetmyDoctor gd = new GetmyDoctor();
						String doctorids = gd.get(ss, salerids);
						GetmyPatient gp = new GetmyPatient();
						String patientids = gp.get(ss, doctorids, salerids);
						if(!patientids.equalsIgnoreCase("")){
							patientids = " and id in(select customerid from users where id in("+ patientids +"))";
						}
						msql = "select provinceid,cityid,count(id) from customer where status=1 and type=4 "+ patientids +" group by provinceid,cityid limit "+ start +","+ limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
								"select provinceid,cityid,count(id) from customer where status=1 and type=4 "+ patientids +" group by provinceid,cityid) M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						List<Object[]> o = ss.createSQLQuery(statement).list();
						if(!o.isEmpty() && o.get(0)[0] != null){
							List<Object[]> o1 = ss.createSQLQuery("select provinceid,cityid,count(id) from customer where status=1 and type=4 "+ patientids +" group by provinceid,cityid").list();
							for(int i=0;i<o.size();i++){
								Customer c = new Customer();
								c.setId(i+1);
								c.setProvinceid(Integer.parseInt(o.get(i)[0].toString()));
								c.setCityid(Integer.parseInt(o.get(i)[1].toString()));
								c.setAge(Integer.parseInt(o.get(i)[2].toString()));
								customers.add(c);
							}
							customers.get(0).setZdy1(o1.size()+"");
						}
					}else if(idtype.equalsIgnoreCase("patientsearch")){
						int provinceid = 0;
						int cityid = 0;
						if(typeid.split("_").length == 2){
							List<Object> o11 = ss.createSQLQuery("select id from province where status=1 and name='"+ typeid.split("_")[0] +"'").list();
							if(!o11.isEmpty()){
								provinceid = Integer.parseInt(o11.get(0).toString());
							}
							List<Object> o12 = ss.createSQLQuery("select id from city where status=1 and name='"+ typeid.split("_")[1] +"'").list();
							if(!o12.isEmpty()){
								cityid = Integer.parseInt(o12.get(0).toString());
							}
						}
						GetmyAgent ga = new GetmyAgent();
						String salerids = ga.get(ss, usersession.getUsername());
						GetmyDoctor gd = new GetmyDoctor();
						String doctorids = gd.get(ss, salerids);
						GetmyPatient gp = new GetmyPatient();
						String patientids = gp.get(ss, doctorids, salerids);
						if(!patientids.equalsIgnoreCase("")){
							patientids = " and id in(select customerid from users where id in("+ patientids +"))";
						}
						msql = "select * from customer where status=1 and type=4 and provinceid="+ provinceid +" and cityid="+ cityid + patientids +" limit "+ start +","+ limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
								"select * from customer where status=1 and type=4 and provinceid="+ provinceid +" and cityid="+ cityid + patientids +") M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						customers = ss.createSQLQuery(statement).addEntity(Customer.class).list();
						if(!customers.isEmpty()){
							List<Object[]> o1 = ss.createSQLQuery("select * from customer where status=1 and type=4 and provinceid="+ provinceid +" and cityid="+ cityid + patientids).list();
							customers.get(0).setZdy1(o1.size()+"");
						}
					}else if(idtype.equalsIgnoreCase("photo")){
						msql = "select url,type,id from customerphoto where status=1 and customerid="+ typeid +" order by id limit "+ start +","+ limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
								"select url,type,id from customerphoto where status=1 and customerid="+ typeid +") M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						List<Object[]> o0 = ss.createSQLQuery(statement).list();
						if(!o0.isEmpty()){
							for(int i=0;i<o0.size();i++){
								Customer a = new Customer();
								a.setZdy3(o0.get(i)[0].toString());
								a.setType(Integer.parseInt(o0.get(i)[1].toString()));
								a.setId(Integer.parseInt(o0.get(i)[2].toString()));
								customers.add(a);
							}
							List<Object> o00 = ss.createSQLQuery("select url from customerphoto where status=1 and customerid="+ typeid).list();
							customers.get(0).setZdy1(""+ o00.size());
						}
					}
					if (customers.isEmpty()){
						Customer a = new Customer();
						a.setName(mmessage.nodata);	
						a.setZdy1("0");
						a.setId(0);
						customers.add(a);
					}else{
						for(int i=0;i<customers.size();i++){
							if(!idtype.equalsIgnoreCase("photo")){
								List<Object> o1 = ss.createSQLQuery("select name from province where id="+ customers.get(i).getProvinceid()).list();
								if(!o1.isEmpty()){
									customers.get(i).setZdy3(o1.get(0).toString());
								}else{
									customers.get(i).setZdy3("");
								}
								List<Object> o2 = ss.createSQLQuery("select name from city where id="+ customers.get(i).getCityid()).list();
								if(!o2.isEmpty()){
									customers.get(i).setZdy4(o2.get(0).toString());
								}else{
									customers.get(i).setZdy4("");
								}
								if(!idtype.equalsIgnoreCase("agentsale") && !idtype.equalsIgnoreCase("patientsale") && !idtype.equalsIgnoreCase("doctorsearchoutline") && !idtype.equalsIgnoreCase("doctorpatientoutline")){
									List<Object> o3 = ss.createSQLQuery("select name from town where id="+ customers.get(i).getTownid()).list();
									if(!o3.isEmpty()){
										customers.get(i).setZdy5(o3.get(0).toString());
									}else{
										customers.get(i).setZdy5("");
									}
									List<Object> o4;
									if(typeid.equalsIgnoreCase("1") || typeid.indexOf("1_")>-1){
										o4= ss.createSQLQuery("select name from users where id="+ customers.get(i).getManageruserid()).list();
									}else{
										o4= ss.createSQLQuery("select name from users where id="+ customers.get(i).getSalerid()).list();
									}
									if(!o4.isEmpty()){
										customers.get(i).setZdy2(o4.get(0).toString());
									}else{
										customers.get(i).setZdy2("");
									}
									List<Object> o5 = ss.createSQLQuery("select name from customer where (type=5 and id="+ customers.get(i).getHospitalid() +") or (type=1 and id="+ customers.get(i).getUppercustomerid() +")").list();
									if(!o5.isEmpty()){
										customers.get(i).setZdy6(o5.get(0).toString());
									}else{
										if(customers.get(i).getZdy6() == null){
											customers.get(i).setZdy6("");
										}
									}
									if(customers.get(i).getCreatedate() != null){
										customers.get(i).setZdy7(sformat.format(customers.get(i).getCreatedate()));
									}else{
										customers.get(i).setZdy7("");
									}
									if(customers.get(i).getType() == 1){
										o4= ss.createSQLQuery("select name from users where id="+ customers.get(i).getSaleuserid()).list();
										if(!o4.isEmpty()){
											if(o4.get(0) != null && !o4.get(0).toString().equalsIgnoreCase("0")){
												customers.get(i).setZdy8(o4.get(0).toString());
											}else{
												customers.get(i).setZdy8("");
											}
										}else{
											customers.get(i).setZdy8("");
										}
									}else{
										if(customers.get(i).getChangedate() != null){
											customers.get(i).setZdy8(sformat.format(customers.get(i).getChangedate()));
										}else{
											customers.get(i).setZdy8("");
										}
									}
									List<Object> o6 = ss.createSQLQuery("select keyname from keyvalue where type=22 and value="+ customers.get(i).getSex()).list();
									if(!o6.isEmpty()){
										customers.get(i).setZdy9(o6.get(0).toString());
									}else{
										customers.get(i).setZdy9("");
									}
									List<Object> o8 = ss.createSQLQuery("select id from customerphoto where status=1 and url<>'' and customerid="+ customers.get(i).getId()).list();
									if(!o8.isEmpty()){
										customers.get(i).setZdy11(o8.size()+"");
									}else{
										customers.get(i).setZdy11("0");
									}
								}
							}
						}
					}
				}else{
					customers = new ArrayList<Customer>();
					if (customers.isEmpty()){
						Customer a = new Customer();
						a.setName(mmessage.nopermission);	
						a.setZdy1("0");
						a.setId(0);
						customers.add(a);
					}
				}
			}else{
				customers = new ArrayList<Customer>();
				if (customers.isEmpty()){
					Customer a = new Customer();
					a.setName(mmessage.notlogin);	
					a.setZdy1("0");
					a.setId(0);
					customers.add(a);
				}
			}
		}
		
		HibernateUtil_new.closeSession();
		return customers;
	}

}
