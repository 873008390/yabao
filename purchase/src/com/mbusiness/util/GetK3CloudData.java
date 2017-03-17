package com.mbusiness.util;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hibernate.Query;
import org.hibernate.Session;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.mbusiness.helper.InvokeHelper;
import com.mbusiness.model.City;
import com.mbusiness.model.Department;
import com.mbusiness.model.KArea;
import com.mbusiness.model.KDepartment;
import com.mbusiness.model.KMaterial;
import com.mbusiness.model.KOrg;
import com.mbusiness.model.KPurchaseOrder;
import com.mbusiness.model.KSupplier;
import com.mbusiness.model.Org;
import com.mbusiness.model.Product;
import com.mbusiness.model.Productspec;
import com.mbusiness.model.Productunit;
import com.mbusiness.model.Province;
import com.mbusiness.model.Purchase;
import com.mbusiness.model.Purchasedetail;
import com.mbusiness.model.Supplier;
import com.mbusiness.model.Town;

public class GetK3CloudData {
	public static String dbId = VariableUtil.dbId;
	public static String uid = VariableUtil.uid;
	public static String pwd = VariableUtil.pwd;
	public static int lang = 2052;
	
	/**
	 * 供应商添加、修改
	 * @param supplier
	 */
	public static void addAndUpdateData(List<Supplier> suppliers){
		String statement;
		String msql;
		String ssql;
		//iFlag=0 mysql; iFlag=1 sqlserver
		int iFlag = CommonJudgeDB.judgeDB(); 
		Session session = null;
		HibernateUtil_new.closeSession();
		session = HibernateUtil_new.currentSession();
		session.beginTransaction();
		
		SynConfirm synConfirm = new SynConfirm();
		int times = synConfirm.check("supplier", session);
		if(times > 0){
			
			String orgid = "";
		    try {
		    	if (InvokeHelper.Login(dbId, uid, pwd, lang)) {
		    		//设置同步中标志
			    	if(times == 1){
			    		msql = "insert into synrecord(tname,kid,syndate,rownum,enddate) values('supplier','0',NOW(),'0',null)";
						
						ssql = "insert into synrecord(tname,kid,syndate,rownum,enddate) values('supplier','0',GETDATE(),'0',null)";
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
			    		Query q = session.createSQLQuery(statement);
				    	q.executeUpdate();
			    	}else{
			    		msql = "update synrecord set syndate=NOW(),enddate=null where tname='supplier'";
						
						ssql = "update synrecord set syndate=GETDATE(),enddate=null where tname='supplier'";
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
			    		Query q = session.createSQLQuery(statement);
				    	q.executeUpdate();
			    	}
			    	session.getTransaction().commit();
			    	HibernateUtil_new.closeSession();
					session = HibernateUtil_new.currentSession();
					session.beginTransaction();
					
					for(int i=0;i<suppliers.size();i++){
					   
						//查询传进来的供应商的机构对应k3的机构id
						List<Object> orgids = session.createSQLQuery("select k3orgno from org where status=1 and id=" + suppliers.get(i).getOrgid()).list();
						//1.k3的机构id存在，将值取到
						if(orgids.indexOf(null) == -1 && !orgids.isEmpty()){
							if(!orgids.get(0).toString().equalsIgnoreCase("") && orgids.get(0).toString() != null){
				    			orgid = orgids.get(0).toString();
								String message = "test";
								String sql = "";
								//1.传进来的供应商不存在k3供应商id,将查询语句fSupplierId=0处理，为了防止报错
								//2.传进来的供应商存在k3供应商id,查询k3那边的数据
								if(suppliers.get(i).getK3supplierno() == null || suppliers.get(i).getK3supplierno().equalsIgnoreCase("")){
									sql ="select * from t_BD_Supplier where fSupplierId=0 and fNumber='" +suppliers.get(i).getSupplierno() +"' and fUseOrgId=" + orgid;
								}else{
									sql ="select * from t_BD_Supplier where fSupplierId="+suppliers.get(i).getK3supplierno() +" and fNumber='" +suppliers.get(i).getSupplierno() +"' and fUseOrgId=" + orgid;
								}
								
								String str = InvokeHelper.View(message, sql);
							    str = str.substring(9,str.length()-2);
							    //1.查询不到数据，就将供应商添加到k3那边去
							    //2.查询到数据，就修改k3那边的数据
							    if(str.isEmpty()){
							    	//判断是否是已审核的供应商
							    	if(suppliers.get(i).getAuditstatus() == 1){
							    		message="test";
								    	List<String> params = new ArrayList<String>();
								    	params.add(suppliers.get(i).getName());
								    	//存放FCreateOrgId
								    	String org = CommonJudgeDB.createOrg();
								    	sql = "select a.fOrgId from t_ORG_Organizations a left join t_ORG_Organizations_l b on a.fOrgId = b.fOrgId where b.fname='"+ org +"'";
								    	str = InvokeHelper.View(message, sql);
									    str = str.substring(9,str.length()-2);
									    String creaorgid = str.substring(str.length()-2, str.length()-1);
								    	params.add(creaorgid);
								    	//存放FUseOrgId
								    	params.add(orgid);
								    	params.add("1");
								    	params.add(suppliers.get(i).getSupplierno());
								    	//存放FLocNumber
								    	params.add(String.valueOf(suppliers.get(i).getProvinceid()));
								    	params.add("C");
								    	String id = InvokeHelper.Save(message, params);
								    	//将k3那边返回的供应商id存到供应商表的k3supplierno中
								    	if(id != null && !id.equalsIgnoreCase("") && id.indexOf("Id") > -1 && id.indexOf("error") ==-1){
								    		HibernateUtil_new.closeSession();
											session = HibernateUtil_new.currentSession();
											session.beginTransaction();
											List<Supplier> supps = session.createSQLQuery("select * from supplier where status=1 and id="+suppliers.get(i).getId()).addEntity(Supplier.class).list();
											supps.get(0).setK3supplierno(id.substring(6,id.length()-1));
											
											session.getTransaction().commit();
								    	}
							    	}
							    	
							    	
							    }else{
							    	//update supplier
							    	message="test";
							    	Map<String,String> params = new HashMap<String,String>();
							    	params.put("Id", suppliers.get(i).getK3supplierno());
									params.put("Name", suppliers.get(i).getName());
									params.put("Number", suppliers.get(i).getSupplierno());
									params.put("CreateOrgId_Id", orgid);
									params.put("UseOrgId_Id", orgid);
									String value ="";
									if(suppliers.get(i).getAuditstatus() == 1){
						    			value = "C";//已审核
						    		}else if(suppliers.get(i).getAuditstatus() == 0){
						    			value ="Z";
						    		}else{
						    			value ="B";
						    		}
									params.put("FDOCUMENTSTATUS", value);
									String modifyParam = "Name,Number,CreateOrgId_Id,UseOrgId_Id,FDOCUMENTSTATUS";
								   
									InvokeHelper.Update(message, params,modifyParam);
								    
							    }
							}
	
			    		}
						if(i == suppliers.size()-1){
							//把最后一个供应商的序号存到同步记录表中
			            	HibernateUtil_new.closeSession();
							session = HibernateUtil_new.currentSession();
							session.beginTransaction();
							msql = "update synrecord set enddate=NOW() where tname='supplier'";
							
							ssql = "update synrecord set enddate=GETDATE() where tname='supplier'";
							if(iFlag == 0){
								statement = msql;
							}else{
								statement = ssql;
							}
							session.createSQLQuery(statement).executeUpdate();
			        		session.getTransaction().commit();
			            	HibernateUtil_new.closeSession();
							session = HibernateUtil_new.currentSession();
							session.beginTransaction();
						}
						
					}
		    		
		    	}
			} catch (Exception e) {
				e.printStackTrace();
			}	
		}
	    HibernateUtil_new.closeSession();
	}
	/**
	 * 初始化时的供应商查询
	 * @param session
	 */
	public static void querySupplier(Session session){
		String statement;
		String msql;
		String ssql;
		//iFlag=0 mysql; iFlag=1 sqlserver
		int iFlag = CommonJudgeDB.judgeDB(); 
		HibernateUtil_new.closeSession();
		session = HibernateUtil_new.currentSession();
		session.beginTransaction();
		
		SynConfirm synConfirm = new SynConfirm();
		int times = synConfirm.check("supplierfirst", session);
		if(times == 1){
		
			 try {
			    if (InvokeHelper.Login(dbId, uid, pwd, lang)) {
			    	//设置同步中标志
			    	if(times == 1){
			    		msql = "insert into synrecord(tname,kid,syndate,rownum,enddate) values('supplierfirst','0',NOW(),'0',null)";
						
						ssql = "insert into synrecord(tname,kid,syndate,rownum,enddate) values('supplierfirst','0',GETDATE(),'0',null)";
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
			    		Query q = session.createSQLQuery(statement);
				    	q.executeUpdate();
			    	}else{
			    		msql = "update synrecord set syndate=NOW(),enddate=null where tname='supplierfirst'";
						
						ssql = "update synrecord set syndate=GETDATE(),enddate=null where tname='supplierfirst'";
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
			    		Query q = session.createSQLQuery(statement);
				    	q.executeUpdate();
			    	}
			    	session.getTransaction().commit();
			    	HibernateUtil_new.closeSession();
					session = HibernateUtil_new.currentSession();
					session.beginTransaction();
					
					int lastsupplierid = 0;
					int lastrownumber = 0;
			    	first:while(true){
			    		String message = "test";
						String sql= "select top 500* from (select  ROW_NUMBER() over(order by M.fSupplierId) as rownumber,M.* from (" +
								"select e.fSupplierId,e.fNumber,e.fName,e.fAddress,e.fDocumentStatus,f.fMobile,f.fTel,e.fUseOrgId from " +
								"(select c.fSupplierId,c.fNumber,c.fDocumentStatus,c.fName,d.fAddress,c.fUseOrgId from " +
								"(select a.fSupplierId,a.fNumber,a.fDocumentStatus,b.fName,a.fUseOrgId from t_BD_Supplier a " +
								"left join t_BD_Supplier_l b on a.fSupplierId=b.fSupplierId) c left join " +
								"(select a.fSupplierId,b.fAddress from t_BD_Supplier a " +
								"left join t_BD_SupplierBase b on a.fSupplierId=b.fSupplierId) d on c.fSupplierId=d.fSupplierId) e left join " +
								"(select a.fSupplierId,a.fMasterId,b.fMobile,b.fTel from t_BD_Supplier a left join t_BD_SupplierContact b" +
								" on a.fMasterId=b.fMasterId) f on e.fSupplierId=f.fSupplierId) M) L where L.rownumber>" + lastrownumber;
						 	
						 String str = InvokeHelper.View(message, sql);
						 String resultData = str.substring(8,str.length()-1);
						 str = str.substring(9,str.length()-2);
						 Gson gson = new Gson();
			             List<KSupplier> supp = gson.fromJson(resultData, new TypeToken<List<KSupplier>>(){}.getType());
			             Supplier supplier;
			             if(!supp.isEmpty()){
			            	 second:for(int i=0; i<supp.size(); i++){
			            		//暂存——Z,创建——A,审核中——B,已审核——C,重新审核——D
			 	                int auditstatus = -1;
			 		    		if(supp.get(i).getfDocumentStatus() != null && !supp.get(i).getfDocumentStatus().equalsIgnoreCase("")){
			 		    			if(supp.get(0).getfDocumentStatus().equalsIgnoreCase("C")){
			 			    			auditstatus = 1;//已审核
			 			    		}else{
			 			    			auditstatus = 0;
			 			    		}
			 		    		} 
			 		    		
						    	List<Supplier> supps = session.createSQLQuery("select * from supplier where status=1 and k3supplierno='" + supp.get(i).getfSupplierId()+ "'").addEntity(Supplier.class).list();
						    	//1.供应商表没有该k3供应商就进行添加供应商
						    	if(supps.isEmpty()){
						    		HibernateUtil_new.closeSession();
									session = HibernateUtil_new.currentSession();
									session.beginTransaction();
									//save Supplier
						    		supplier = new Supplier();
						    		supplier.setName(supp.get(i).getfName());
						    		supplier.setSupplierno(supp.get(i).getfNumber());
						    		supplier.setTel(supp.get(i).getFTel());
						    		supplier.setType(1);
						    		supplier.setPhoneno(supp.get(i).getFMobile());
						    		supplier.setCreatedate(new Date());
						    		supplier.setK3supplierno(String.valueOf(supp.get(i).getfSupplierId()));
						    		supplier.setStatus(1);
						    		supplier.setAddress(supp.get(i).getfAddress());
						    		supplier.setAuditstatus(auditstatus);
						    		List<Object> orgids = session.createSQLQuery("select id from org where status=1 and k3orgno='" + supp.get(i).getfUseOrgId() + "'").list();
						    		//判断该k3供应商的机构是否在机构表中有id;
						    		if(!orgids.isEmpty()){
						    			//1.存在就将该机构id添加到供应商中，
						    			supplier.setOrgid(Integer.parseInt(orgids.get(0).toString()));
						    		}else{
						    			session.createSQLQuery("update issyn set status=0 where tname='org'").executeUpdate();
						    			lastsupplierid = supp.get(i).getfSupplierId();
						    			lastrownumber = supp.get(i).getRownumber();
						    			break second;
						    		}
						    		session.save(supplier);
						    		session.getTransaction().commit();
					            	HibernateUtil_new.closeSession();
									session = HibernateUtil_new.currentSession();
									session.beginTransaction();
						    	}
						    	if(i == supp.size()-1){
						    		lastsupplierid = supp.get(i).getfSupplierId();
						    		lastrownumber = supp.get(i).getRownumber();
						    	}
			            	 }
			             }else{
			            	//把最后一个供应商的序号存到同步记录表中
			            	HibernateUtil_new.closeSession();
							session = HibernateUtil_new.currentSession();
							session.beginTransaction();
							msql = "update synrecord set kid='" + lastsupplierid + "',rownum='" + lastrownumber +"',enddate=NOW() where tname='supplierfirst'";
							
							ssql = "update synrecord set kid='" + lastsupplierid + "',rownum='" + lastrownumber +"',enddate=GETDATE() where tname='supplierfirst'";
							if(iFlag == 0){
								statement = msql;
							}else{
								statement = ssql;
							}
							session.createSQLQuery(statement).executeUpdate();
			        		session.getTransaction().commit();
			            	HibernateUtil_new.closeSession();
							session = HibernateUtil_new.currentSession();
							session.beginTransaction();
							break;
			             }  
				    }
			    }
			} catch (Exception e) {
				e.printStackTrace();
			}
			
		}
		HibernateUtil_new.closeSession();
	}
	/**
	 * 供应商删除
	 * @param supplierid
	 */
	public static void deleteData(int supplierid){
        
	    try {
	    	if (InvokeHelper.Login(dbId, uid, pwd, lang)) {
	    		String message = "test";
	    		String sql="delete from t_BD_Supplier where fSupplierId="+supplierid;
				InvokeHelper.View(message, sql);
				String str = InvokeHelper.View(message, sql);
				str = str.substring(9,str.length()-2);
				
				if(str.isEmpty()){//delete success
					
				}else{//delete fail
					
				}
	    	}
		} catch (Exception e) {
			e.printStackTrace();
		}	
	   
	}
	
	/**
	 * 采购订单同步
	 * @param session
	 */
	public static void queryPurchaseOrder(Session session){
		String statement;
		String msql;
		String ssql;
		//iFlag=0 mysql; iFlag=1 sqlserver
		int iFlag = CommonJudgeDB.judgeDB(); 
		HibernateUtil_new.closeSession();
		 session = HibernateUtil_new.currentSession();
		 session.beginTransaction();
		 
		 SynConfirm synConfirm = new SynConfirm();
		 int times = synConfirm.check("purchase", session);
		 if(times > 0){
		 
	         Purchase purchase = null;
		     Purchasedetail purchasedetail = null;
		     Supplier supplier = null;
		     Productunit productunit = null;
		     Productspec productspec = null;
		     Product product = null;
		     int supplierid = 0;
		     int purchaseid = 0;
		     int productid = 0;
		     int productunitid = 0;
		     int productspecid = 0;
		     String message = "";
		     String sql = "";
		     String str = "";
		     String resultData = "";
		    try {
		    	if (InvokeHelper.Login(dbId, uid, pwd, lang)) {
		    		 //设置同步中标志
			    	 if(times == 1){
			    		msql = "insert into synrecord(tname,kid,syndate,rownum,enddate) values('purchase','0',NOW(),'0',null)";
							
						ssql = "insert into synrecord(tname,kid,syndate,rownum,enddate) values('purchase','0',GETDATE(),'0',null)";
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
			    		Query q = session.createSQLQuery(statement);
				    	q.executeUpdate();
			    	 }else{
			    		msql = "update synrecord set syndate=NOW(),enddate=null where tname='purchase'";
							
						ssql = "update synrecord set syndate=GETDATE(),enddate=null where tname='purchase'";
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
			    		Query q = session.createSQLQuery(statement);
				    	q.executeUpdate();
				    	
			    	 }
			    	 session.getTransaction().commit();
			    	 HibernateUtil_new.closeSession();
					 session = HibernateUtil_new.currentSession();
					 session.beginTransaction();
		    		 //当同步完后k3那边原来未审核的变成已审核时，也要同步过来
					 msql = "select date_format(syndate,'%Y-%m-%d'),kid from synrecord where tname='purchase'";
						
					 ssql = "select convert(varchar(100),syndate,23),kid from synrecord where tname='purchase'";
					 if(iFlag == 0){
						 statement = msql;
					 }else{
						 statement = ssql;
					 }
		    		 List<Object[]>	record = session.createSQLQuery(statement).list();
					 if(!record.isEmpty()){
						 message = "test";
			    		 sql = "/*dialect*/ "+"select R.fId,R.fPurchaserId,R.fSupplierId,R.fDate,R.fBillNo,x.fMaterialId, x.fProductType," +
						     		"x.fUnitId,x.fQty,y.fPrice,y.FALLAMOUNT,n.fName,x.fEntryId,R.FAPPROVEDATE from t_PUR_POOrder R " +
						     		"inner join t_PUR_POOrderEntry x on r.fid=x.fid " +
						     		"inner join t_PUR_POOrderEntry_f y on r.fid=y.fid and x.FENTRYID=y.FENTRYID " +
						     		"inner join T_BD_MATERIAL_l N on x.FMATERIALID=n.FMATERIALID " +
						     		"where r.FDOCUMENTSTATUS='C' and convert(varchar(100),R.FAPPROVEDATE,23)>=convert(varchar(100),'"+ record.get(0)[0].toString() +"',23)" +
						     		" and R.fId<" + record.get(0)[1];
			    		 str = InvokeHelper.View(message, sql);
					     resultData = str.substring(8,str.length()-1);
					     str = str.substring(9,str.length()-2);
					     if(!str.isEmpty() && !str.equalsIgnoreCase("")){
					    	 Gson gson = new Gson();
				             List<KPurchaseOrder> ps = gson.fromJson(resultData, new TypeToken<List<KPurchaseOrder>>(){}.getType());
				             modifyAddPurchase(session, ps, message, sql, str, resultData, gson, purchase, purchasedetail, supplier, 
				            		 productunit, productspec, product, supplierid, purchaseid, productid, productunitid, productspecid);
					     }
					 }
			    	//当k3已审核改为未审核
			    	message = "test";
		   		 	sql = "select R.fId,R.fPurchaserId,R.fSupplierId,R.fDate,R.fBillNo,x.fMaterialId, x.fProductType," +
					     		"x.fUnitId,x.fQty,y.fPrice,y.FALLAMOUNT,n.fName,x.fEntryId,R.FAPPROVEDATE from t_PUR_POOrder R " +
					     		"inner join t_PUR_POOrderEntry x on r.fid=x.fid " +
					     		"inner join t_PUR_POOrderEntry_f y on r.fid=y.fid and x.FENTRYID=y.FENTRYID " +
					     		"inner join T_BD_MATERIAL_l N on x.FMATERIALID=n.FMATERIALID " +
					     		"where r.FDOCUMENTSTATUS!='C'";
		   		 	
			   		 str = InvokeHelper.View(message, sql);
				     resultData = str.substring(8,str.length()-1);
				     str = str.substring(9,str.length()-2);
				     if(!str.isEmpty()){
				    	 Gson gson = new Gson();
			             List<KPurchaseOrder> ps = gson.fromJson(resultData, new TypeToken<List<KPurchaseOrder>>(){}.getType());
			             for(int i=0; i<ps.size(); i++){
			            	 HibernateUtil_new.closeSession();
			     			 session = HibernateUtil_new.currentSession();
			     			 session.beginTransaction();
			            	 List<Object> purids = session.createSQLQuery("select id from purchase where status=1 and k3purchaseno='" + ps.get(i).getfId() + "'").list(); 
			            	 if(!purids.isEmpty()){
			            		 session.createSQLQuery("update purchase set status=0 where id=" + purids.get(0).toString()).executeUpdate();
			 		    		 session.createSQLQuery("update purchasedetail set status=0 where mainid=" + purids.get(0).toString()).executeUpdate();
			 		    		 session.getTransaction().commit();
			            	 }
			             }
				    	 
				     }
					 
			        int lastpurchaseid = 0;
					int lastrownumber = 0;
			        //获取上次同步的最后一个序号
			        List<Object> rownum = session.createSQLQuery("select rownum from synrecord where tname='purchase'").list();
			        if(!rownum.isEmpty()){
			        	lastrownumber = Integer.parseInt(rownum.get(0).toString());
			        }
			    	first:while(true){
			    		 message = "test";
			    		 //查询大于上次同步的序号，查询500条
			    		 sql = "select top 500* from (select  ROW_NUMBER() over(order by M.fId) as rownumber,M.* from " +
						     		"(select R.fId,R.fPurchaserId,R.fSupplierId,R.fDate,R.fBillNo,x.fMaterialId, x.fProductType," +
						     		"x.fUnitId,x.fQty,y.fPrice,y.FALLAMOUNT,n.fName,x.fEntryId,R.FAPPROVEDATE from t_PUR_POOrder R " +
						     		"inner join t_PUR_POOrderEntry x on r.fid=x.fid " +
						     		"inner join t_PUR_POOrderEntry_f y on r.fid=y.fid and x.FENTRYID=y.FENTRYID " +
						     		"inner join T_BD_MATERIAL_l N on x.FMATERIALID=n.FMATERIALID " +
						     		"where r.FDOCUMENTSTATUS='C' " +
						     		") M) L where L.rownumber>" + lastrownumber;
			    		
					     str = InvokeHelper.View(message, sql);
					     resultData = str.substring(8,str.length()-1);
					     str = str.substring(9,str.length()-2);
					     
						if(!str.isEmpty()){
					    	Gson gson = new Gson();
			                List<KPurchaseOrder> ps = gson.fromJson(resultData, new TypeToken<List<KPurchaseOrder>>(){}.getType());
			                NormalAddPurchase normalAddPurchase = new NormalAddPurchase();
			                int i = normalAddPurchase.execute(session, ps, message, sql, str, resultData, gson, purchase, purchasedetail, supplier, productunit, productspec, 
						    		product, supplierid, purchaseid, productid, productunitid, productspecid, lastrownumber);
						    lastrownumber = Integer.parseInt(ps.get(i).getRownumber());
						    lastpurchaseid = ps.get(i).getfId();
					    }else{
			            	HibernateUtil_new.closeSession();
							session = HibernateUtil_new.currentSession();
							session.beginTransaction();
							msql = "update synrecord set kid='" + lastpurchaseid + "',rownum='" + lastrownumber +"',enddate=NOW() where tname='purchase'";
							
							ssql = "update synrecord set kid='" + lastpurchaseid + "',rownum='" + lastrownumber +"',enddate=GETDATE() where tname='purchase'";
							if(iFlag == 0){
								statement = msql;
							}else{
								statement = ssql;
							}
							session.createSQLQuery(statement).executeUpdate();
			        		session.getTransaction().commit();
			            	HibernateUtil_new.closeSession();
							session = HibernateUtil_new.currentSession();
							session.beginTransaction();
							break;
			             }
			    	}
		    	}
			} catch (Exception e) {
				e.printStackTrace();
			}
		 }
	    HibernateUtil_new.closeSession();
	}	
	
	/**
	 * k3未审核改为已审核
	 */
	public static void modifyAddPurchase(Session session,List<KPurchaseOrder> ps,String message,
			String sql,String str,String resultData,Gson gson,Purchase purchase,Purchasedetail purchasedetail,Supplier supplier,Productunit productunit,Productspec productspec,
			Product product,int supplierid,int purchaseid,int productid, int productunitid,int productspecid) throws Exception{
		for(int i=0;i<ps.size();i++){
	    	HibernateUtil_new.closeSession();
			session = HibernateUtil_new.currentSession();
			session.beginTransaction();
			//1.当是第一条数据时，判断采购单是否存在，如果采购单存在，就删除
			//2.当不是第一条数据时，当前这条数据的采购单号与上一条数据的采购单号不相同时，判断采购单是否存在，如果存在，就删除
			if(i == 0){
				List<Object> pids = session.createSQLQuery("select id from purchase where status=1 and purchaseno='"+ ps.get(i).getfBillNo() + "'").list();
		    	if(!pids.isEmpty()){
		    		session.createSQLQuery("update purchase set status=0 where id=" + pids.get(0).toString()).executeUpdate();
		    		session.createSQLQuery("update purchasedetail set status=0 where mainid=" + pids.get(0).toString()).executeUpdate();
		    		session.getTransaction().commit();
		    		HibernateUtil_new.closeSession();
					session = HibernateUtil_new.currentSession();
					session.beginTransaction();
		    	}
			}else{
				if(!ps.get(i).getfBillNo().equalsIgnoreCase(ps.get(i-1).getfBillNo()) ){
					List<Object> pids = session.createSQLQuery("select id from purchase where status=1 and purchaseno='"+ ps.get(i).getfBillNo() + "'").list();
			    	if(!pids.isEmpty()){
			    		session.createSQLQuery("update purchase set status=0 where id=" + pids.get(0).toString()).executeUpdate();
			    		session.createSQLQuery("update purchasedetail set status=0 where mainid=" + pids.get(0).toString()).executeUpdate();
			    		session.getTransaction().commit();
			    		HibernateUtil_new.closeSession();
						session = HibernateUtil_new.currentSession();
						session.beginTransaction();
			    	}
				}
			}
			
	    	//查询采购单
			List<Purchase> purchases = session.createSQLQuery("select * from purchase where status=1 and k3purchaseno='" + ps.get(i).getfEntryId() +"'").addEntity(Purchase.class).list();
	    	//结果为空，就添加采购单
			if(purchases.isEmpty()){
	    		
		    	//select supplier
		    	message = "test";
				sql= "select g.fSupplierId,g.fNumber,g.fName,g.fAddress,g.fDocumentStatus,g.fMobile,g.fTel,g.fUseOrgId from " +
					"(select e.fSupplierId,e.fNumber,e.fName,e.fAddress,e.fDocumentStatus,f.fMobile,f.fTel,e.fUseOrgId from " +
					"(select c.fSupplierId,c.fNumber,c.fDocumentStatus,c.fName,d.fAddress,c.fUseOrgId from " +
					"(select a.fSupplierId,a.fNumber,a.fDocumentStatus,b.fName,a.fUseOrgId from t_BD_Supplier a " +
					"left join t_BD_Supplier_l b on a.fSupplierId=b.fSupplierId) c left join " +
					"(select a.fSupplierId,b.fAddress from t_BD_Supplier a " +
					"left join t_BD_SupplierBase b on a.fSupplierId=b.fSupplierId) d on c.fSupplierId=d.fSupplierId) e left join " +
					"(select a.fSupplierId,a.fMasterId,b.fMobile,b.fTel from t_BD_Supplier a left join t_BD_SupplierContact b" +
					" on a.fMasterId=b.fMasterId) f on e.fSupplierId=f.fSupplierId) g where g.fSupplierId=" + ps.get(i).getfSupplierId();
				
			    str = InvokeHelper.View(message, sql);
			    resultData = str.substring(8,str.length()-1);
			    str = str.substring(9,str.length()-2);
			    gson = new Gson();
	            List<KSupplier> supp = gson.fromJson(resultData, new TypeToken<List<KSupplier>>(){}.getType());
		    	List<Object> orgids = null;
	            //k3该供应商存在，就将k3的供应商添加到供应商表中，取得供应商的id，如果供应商表有k3的这个供应商，就直接取id
	            if(!supp.isEmpty()){
	            	 //暂存——Z,创建——A,审核中——B,已审核——C,重新审核——D
	                int auditstatus = -1;
		    		if(supp.get(0).getfDocumentStatus() != null && !supp.get(0).getfDocumentStatus().equalsIgnoreCase("")){
		    			if(supp.get(0).getfDocumentStatus().equalsIgnoreCase("C")){
			    			auditstatus = 1;//已审核
			    		}else{
			    			auditstatus = 0;
			    		}
		    		}
	                //save Supplier
			    	List<Object> supplierids;
			    	supplierids = session.createSQLQuery("select id from supplier where status=1 and k3supplierno='" + ps.get(i).getfSupplierId()+ "'").list();
			    	if(supplierids.isEmpty()){
			    		HibernateUtil_new.closeSession();
						session = HibernateUtil_new.currentSession();
						session.beginTransaction();
						
			    		supplier = new Supplier();
			    		supplier.setName(supp.get(0).getfName());
			    		supplier.setSupplierno(supp.get(0).getfNumber());
			    		supplier.setTel(supp.get(0).getFTel());
			    		supplier.setType(1);
			    		supplier.setPhoneno(supp.get(0).getFMobile());
			    		supplier.setCreatedate(new Date());
			    		supplier.setK3supplierno(String.valueOf(ps.get(i).getfSupplierId()));
			    		supplier.setStatus(1);
			    		supplier.setAddress(supp.get(0).getfAddress());
			    		supplier.setAuditstatus(auditstatus);
			    		orgids = session.createSQLQuery("select id from org where status=1 and k3orgno='" + supp.get(0).getfUseOrgId() +"'").list();
			    		//判断该k3供应商的机构是否在机构表中存在
			    		if(!orgids.isEmpty()){
			    			//1.存在取得该机构id并添加供应商中
			    			supplier.setOrgid(Integer.parseInt(orgids.get(0).toString()));
			    		}else{
			    			//2.不存在就先提示同步机构起
			    			session.createSQLQuery("update issyn set status=0 where tname='org'").executeUpdate();
			    			break;
			    		}
			    		session.save(supplier);
			    		session.getTransaction().commit();
			    	}
		    		supplierids = session.createSQLQuery("select id from supplier where status=1 and k3supplierno='" + ps.get(i).getfSupplierId()+ "'").list();
		    		if(!supplierids.isEmpty()){
		    			supplierid = Integer.parseInt(supplierids.get(0).toString());
		    		}
	            }
				//save Purchase
				//  /Date(1407427200000+0800)/ Transformation Date 
				String dateStr = ps.get(i).getfDate().substring(6, ps.get(i).getfDate().length()-2);
				String time = dateStr.substring(0,dateStr.length()-5);
				Date date = new Date(Long.parseLong(time));
				HibernateUtil_new.closeSession();
				session = HibernateUtil_new.currentSession();
				session.beginTransaction();
				
				purchase = new Purchase();
				purchase.setCreatedate(new Date());
				purchase.setK3purchaseno(String.valueOf(ps.get(i).getfEntryId()));
				purchase.setPurchaseno(ps.get(i).getfBillNo());
				purchase.setSupplierid(supplierid);
				purchase.setPurchasedate(date);
				purchase.setStatus(1);
				orgids = session.createSQLQuery("select orgid from supplier where status=1 and id=" + supplierid +"").list();
				purchase.setOrgid(Integer.parseInt(orgids.get(0).toString()));
				
				session.save(purchase);
				session.getTransaction().commit();
				
				List<Object> purchaseids = session.createSQLQuery("select id from purchase where status=1 and k3purchaseno='" + ps.get(i).getfEntryId()+ "'").list();
				purchaseid = Integer.parseInt(purchaseids.get(0).toString());
				
				
				//save productunit
				message = "test";
	    		sql = "select fName from T_BD_UNIT_L where fUnitId=" + ps.get(i).getfUnitId();
	    		String name = "";
	    		if(InvokeHelper.View(message, sql) != null && !InvokeHelper.View(message, sql).equalsIgnoreCase("")){
	    	
	    			name = InvokeHelper.View(message, sql).substring(8,InvokeHelper.View(message, sql).length()-1);
	    			if(name.length() == 2){
	    				name = "";
	    			}else{
	    				name = InvokeHelper.View(message, sql).substring(19,InvokeHelper.View(message, sql).length()-4);
	    			}
	    		}
	    		
	    		List<Object> productunitids;
				productunitids = session.createSQLQuery("select id from productunit where status=1 and k3materialunitno='" + ps.get(i).getfUnitId() +"'").list();
				if(productunitids.isEmpty()){
					HibernateUtil_new.closeSession();
					session = HibernateUtil_new.currentSession();
					session.beginTransaction();
					
					productunit = new Productunit();
	    			productunit.setK3materialunitno(String.valueOf(ps.get(i).getfUnitId()));
	    			productunit.setName(name);
	    			productunit.setTotal(0);
	    			productunit.setDownid(0);
	    			productunit.setIsbase(1);
	    			productunit.setStatus(1);
	    			
	    			session.save(productunit);
	    			session.getTransaction().commit();
				}
				productunitids = session.createSQLQuery("select id from productunit where status=1 and k3materialunitno='" + ps.get(i).getfUnitId() +"'").list();
				if(!productunitids.isEmpty()){
					productunitid = Integer.parseInt(productunitids.get(0).toString());
				}
				message = "test";
				sql= "select g.fMaterialId,g.fName,g.fSpecification,g.fMaterialGroup,g.fTypeID, g.fErpClsID," +
						"g.fBaseUnitId,g.fCategoryID,g.fExpUnit,g.fExpPeriod,g.fOnlineLife,g.fStoreUnitID from " +
						"(select e.fMaterialId,e.fName,e.fSpecification,e.fMaterialGroup,e.fTypeID, e.fErpClsID," +
			       		"e.fBaseUnitId,e.fCategoryID,f.fExpUnit,f.fExpPeriod,f.fOnlineLife,f.fStoreUnitID" +
			       		" from (select c.fMaterialId,c.fName,c.fSpecification,c.fMaterialGroup,d.fTypeID, d.fErpClsID," +
			       		"d.fBaseUnitId,d.fCategoryID from " +
			       		"(select a.fMaterialId,b.fName,b.fSpecification,a.fMaterialGroup from t_BD_MATERIAL a " +
			       		"left join  t_BD_MATERIAL_l b " +
			       		"on a.fMaterialId = b.fMaterialId) c " +
			       		"left join t_BD_MaterialBase d on c.fMaterialId = d.fMaterialId) e " +
			       		"left join t_BD_MaterialStock f on e.fMaterialId = f.fMaterialId) g where g.fMaterialId=" + ps.get(i).getfMaterialId();
				str = InvokeHelper.View(message, sql);
				resultData = str.substring(8,str.length()-1);
			    str = str.substring(9,str.length()-2);
			    gson = new Gson();
	            List<KMaterial> materials = gson.fromJson(resultData, new TypeToken<List<KMaterial>>(){}.getType());
	            
	            
	            //save productspec
	            if(!materials.isEmpty()){
	            	List<Object> productspecids;
			    	productspecids = session.createSQLQuery("select id from productspec where status=1 and k3materialspecno='" +ps.get(i).getfMaterialId()+ "'").list();
		    		if(productspecids.isEmpty()){
		    			HibernateUtil_new.closeSession();
		    			session = HibernateUtil_new.currentSession();
				    	session.beginTransaction();
			    		productspec = new Productspec();
		    			productspec.setK3materialspecno(String.valueOf(ps.get(i).getfMaterialId()));
		    			productspec.setName(materials.get(0).getfSpecification());
		    			productspec.setStatus(1);
		    			
		    			session.save(productspec);
		    			session.getTransaction().commit();
		    		}
		    		productspecids = session.createSQLQuery("select id from productspec where status=1 and k3materialspecno='" +ps.get(i).getfMaterialId()+ "'").list();
	    			if(!productspecids.isEmpty()){
	    				productspecid = Integer.parseInt(productspecids.get(0).toString());
	    			}
		    		
	    			//save product
	    			List<Object> productids;
					productids = session.createSQLQuery("select id from product where status=1 and k3materialno='" + ps.get(i).getfMaterialId() +"'").list();
					if(productids.isEmpty()){
						HibernateUtil_new.closeSession();
						session = HibernateUtil_new.currentSession();
						session.beginTransaction();
						
						product = new Product();
			    		product.setK3materialno(String.valueOf(ps.get(i).getfMaterialId()));
			    		product.setName(materials.get(0).getfName());
			    		product.setPeriodofvalidity(materials.get(0).getfExpPeriod());
			    		product.setProductspecid(productspecid);
			    		product.setProducttypeid(0);
			    		product.setStatus(1);
			    		
			    		session.save(product);
			    		session.getTransaction().commit();
					}
					productids = session.createSQLQuery("select id from product where status=1 and k3materialno='" + ps.get(i).getfMaterialId() +"'").list();
					if(!productids.isEmpty()){
						productid = Integer.parseInt(productids.get(0).toString());
					}
					
	            }
	            
				
				//save Purchasedetail
				List<Purchasedetail> purchasedetails = session.createSQLQuery("select * from purchasedetail where status=1 and mainid=" + purchaseid).addEntity(Purchasedetail.class).list();
				if(purchasedetails.isEmpty()){
					HibernateUtil_new.closeSession();
					session = HibernateUtil_new.currentSession();
					session.beginTransaction();
					
					purchasedetail = new Purchasedetail();
					purchasedetail.setMainid(purchaseid);
					purchasedetail.setProductid(productid);
					purchasedetail.setProducttypeid(0);
					purchasedetail.setProductunitid(productunitid);
					purchasedetail.setMoney(ps.get(i).getfPrice());
					purchasedetail.setQuantity(ps.get(i).getfQty());
					purchasedetail.setPrice(ps.get(i).getfPrice());
					purchasedetail.setStatus(1);
					
					session.save(purchasedetail);
					session.getTransaction().commit();
				}
		    	
	    	}
		}
	}
	
	/**
	 * 机构同步
	 * @param session
	 */
	public static void queryOrg(Session session){
		String statement;
		String msql;
		String ssql;
		//iFlag=0 mysql; iFlag=1 sqlserver
		int iFlag = CommonJudgeDB.judgeDB();
		HibernateUtil_new.closeSession();
		session = HibernateUtil_new.currentSession();
		session.beginTransaction();
		SynConfirm synConfirm = new SynConfirm();
		int times = synConfirm.check("org", session);
		if(times > 0){
		    try {
		    	if (InvokeHelper.Login(dbId, uid, pwd, lang)) {
		    		//设置同步中标志
			    	if(times == 1){
			    		msql = "insert into synrecord(tname,kid,syndate,rownum,enddate) values('org','0',NOW(),'0',null)";
						
						ssql = "insert into synrecord(tname,kid,syndate,rownum,enddate) values('org','0',GETDATE(),'0',null)";
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
			    		Query q = session.createSQLQuery(statement);
				    	q.executeUpdate();
			    	}else{
			    		msql = "update synrecord set syndate=NOW(),enddate=null where tname='org'";
						
						ssql = "update synrecord set syndate=GETDATE(),enddate=null where tname='org'";
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
			    		Query q = session.createSQLQuery(statement);
				    	q.executeUpdate();
			    	}
			    	
			    	session.getTransaction().commit();
			    	HibernateUtil_new.closeSession();
					session = HibernateUtil_new.currentSession();
					session.beginTransaction();
		    		String message = "test";
				    String sql= "select distinct a.fOrgId,a.fParentId,b.fName,a.fNumber from t_ORG_Organizations a left join t_ORG_Organizations_l b " +
		    				"on a.fOrgId = b.fOrgId";
				       
				    String str = InvokeHelper.View(message, sql);
				    String resultData = str.substring(8,str.length()-1);
				    str = str.substring(9,str.length()-2);
					if(!str.isEmpty()){
				    	Gson gson = new Gson();
		                List<KOrg> ps = gson.fromJson(resultData, new TypeToken<List<KOrg>>(){}.getType());
		                Org org;
					    for(int i=0;i<ps.size();i++){
					    	HibernateUtil_new.closeSession();
							session = HibernateUtil_new.currentSession();
							session.beginTransaction();
							String number = ps.get(i).getfNumber();
							if(number.indexOf(".") == -1){
								number = "0";
							}else{
								number = number.substring(0, number.lastIndexOf("."));
							}
							List<Object> upperids = session.createSQLQuery("select id from org where status=1 and zdy2='" + number + "'").list();
							//判断是否有上级机构id
							if(!upperids.isEmpty()){
								List<Org> orgs = session.createSQLQuery("select * from org where status=1 and k3orgno='" + ps.get(i).getfOrgId() +"'").addEntity(Org.class).list();
						    	//1.不存在就添加机构
								//2.存在就修改机构
								if(orgs.isEmpty()){
						    		org = new Org();
						    		org.setCreatedate(new Date());
						    		org.setK3orgno(String.valueOf(ps.get(i).getfOrgId()));
						    		org.setName(ps.get(i).getfName());
						    		org.setUpperid(Integer.parseInt(upperids.get(0).toString()));
						    		org.setManageruserid(0);
						    		org.setStatus(1);
						    		org.setZdy2(ps.get(i).getfNumber());
						    		session.save(org);
						    	}else{
						    		orgs.get(0).setName(ps.get(i).getfName());
						    		orgs.get(0).setUpperid(Integer.parseInt(upperids.get(0).toString()));
						    		orgs.get(0).setZdy2(ps.get(i).getfNumber());
						    	}
						    	session.getTransaction().commit();	
							}else{
								//判断是否是一级机构,不是一级机构就就不添加
								if(ps.get(i).getfNumber().indexOf(".") == -1){
									List<Org> orgs = session.createSQLQuery("select * from org where status=1 and k3orgno='" + ps.get(i).getfOrgId() +"'").addEntity(Org.class).list();
									//1.不存在就添加机构
									//2.存在就修改机构
									if(orgs.isEmpty()){
							    		org = new Org();
							    		org.setCreatedate(new Date());
							    		org.setK3orgno(String.valueOf(ps.get(i).getfOrgId()));
							    		org.setName(ps.get(i).getfName());
							    		org.setUpperid(0);
							    		org.setManageruserid(0);
							    		org.setStatus(1);
							    		org.setZdy2(ps.get(i).getfNumber());
							    		session.save(org);
							    	}else{
							    		orgs.get(0).setName(ps.get(i).getfName());
							    		orgs.get(0).setUpperid(0);
							    		orgs.get(0).setZdy2(ps.get(i).getfNumber());
							    	}
							    	session.getTransaction().commit();
								}
							}
							//同步完成后将issyn表的status改为1
					    	if(i == ps.size()-1){
					    		HibernateUtil_new.closeSession();
								session = HibernateUtil_new.currentSession();
								session.beginTransaction();
								List<Object> name = session.createSQLQuery("select tname from issyn where tname='org'").list();
								if(name.isEmpty()){
									msql = "insert into issyn values('org',1,NOW())";
									
									ssql = "insert into issyn values('org',1,GETDATE())";
									if(iFlag == 0){
										statement = msql;
									}else{
										statement = ssql;
									}
									session.createSQLQuery(statement).executeUpdate();
								}else{
									msql = "update issyn set syndate=NOW() where tname='org'";
									
									ssql = "update issyn set syndate=GETDATE() where tname='org'";
									if(iFlag == 0){
										statement = msql;
									}else{
										statement = ssql;
									}
									session.createSQLQuery(statement).executeUpdate();
								}
								
								
		                		session.getTransaction().commit();
		                		//把最后一个供应商的序号存到同步记录表中
				            	HibernateUtil_new.closeSession();
								session = HibernateUtil_new.currentSession();
								session.beginTransaction();
								msql = "update synrecord set enddate=NOW() where tname='org'";
								
								ssql = "update synrecord set enddate=GETDATE() where tname='org'";
								if(iFlag == 0){
									statement = msql;
								}else{
									statement = ssql;
								}
								session.createSQLQuery(statement).executeUpdate();
				        		session.getTransaction().commit();
				            	HibernateUtil_new.closeSession();
								session = HibernateUtil_new.currentSession();
								session.beginTransaction();
		                	}
							
					    }
				    }
		    	}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	    HibernateUtil_new.closeSession();
	}
	
	/**
	 * 物料同步
	 * @param session
	 */
	public static void queryMaterial(Session session){
		String statement;
		String msql;
		String ssql;
		//iFlag=0 mysql; iFlag=1 sqlserver
		int iFlag = CommonJudgeDB.judgeDB();
		HibernateUtil_new.closeSession();
		session = HibernateUtil_new.currentSession();
		session.beginTransaction();
		SynConfirm synConfirm = new SynConfirm();
		int times = synConfirm.check("product", session);
		if(times > 0){
		    try {
		    	if (InvokeHelper.Login(dbId, uid, pwd, lang)) {
		    		//设置同步中标志
			    	if(times == 1){
			    		msql = "insert into synrecord(tname,kid,syndate,rownum,enddate) values('product','0',NOW(),'0',null)";
						
						ssql = "insert into synrecord(tname,kid,syndate,rownum,enddate) values('product','0',GETDATE(),'0',null)";
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
			    		Query q = session.createSQLQuery(statement);
				    	q.executeUpdate();
			    	}else{
			    		msql = "update synrecord set syndate=NOW(),enddate=null where tname='product'";
						
						ssql = "update synrecord set syndate=GETDATE(),enddate=null where tname='product'";
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
			    		Query q = session.createSQLQuery(statement);
				    	q.executeUpdate();
			    	}
			    	session.getTransaction().commit();
			    	HibernateUtil_new.closeSession();
					session = HibernateUtil_new.currentSession();
					session.beginTransaction();
					
					
		    		String message = "test";
		    		String sql= "select e.fMaterialId,e.fNumber,e.fName,e.fSpecification,e.fMaterialGroup,e.fTypeID, e.fErpClsID," +
				       		"e.fBaseUnitId,e.fCategoryID,f.fExpUnit,f.fExpPeriod,f.fOnlineLife,f.fStoreUnitID" +
				       		" from (select c.fMaterialId,c.fNumber,c.fName,c.fSpecification,c.fMaterialGroup,d.fTypeID, d.fErpClsID," +
				       		"d.fBaseUnitId,d.fCategoryID from " +
				       		"(select a.fMaterialId,a.fNumber,b.fName,b.fSpecification,a.fMaterialGroup from t_BD_MATERIAL a " +
				       		"left join  t_BD_MATERIAL_l b " +
				       		"on a.fMaterialId = b.fMaterialId) c " +
				       		"left join t_BD_MaterialBase d on c.fMaterialId = d.fMaterialId) e " +
				       		"left join t_BD_MaterialStock f on e.fMaterialId = f.fMaterialId";
				    String str = InvokeHelper.View(message, sql);
				    String resultData = str.substring(8,str.length()-1);
				    str = str.substring(9,str.length()-2);
					if(!str.isEmpty()){
				    	Gson gson = new Gson();
		                List<KMaterial> ps = gson.fromJson(resultData, new TypeToken<List<KMaterial>>(){}.getType());
		                Product product;
		                Productspec productspec;
		                Productunit productunit;
		                int productspecid = 0;
		                int producttypeid = 0;
					    for(int i=0;i<ps.size();i++){
					    	
				    		//先保存productspec
					    	HibernateUtil_new.closeSession();
					    	session = HibernateUtil_new.currentSession();
					    	session.beginTransaction();
				    		List<Productspec> productspecs = session.createSQLQuery("select * from productspec where status=1 and k3materialspecno='" +ps.get(i).getfMaterialId()+ "'").addEntity(Productspec.class).list();
				    		if(!productspecs.isEmpty()){
				    			//update productspec
				    			productspecid = productspecs.get(0).getId();
				    			productspecs.get(0).setName(ps.get(i).getfSpecification());
				    		}else{
				    			//save productspec
				    			productspec = new Productspec();
				    			productspec.setK3materialspecno(String.valueOf(ps.get(i).getfMaterialId()));
				    			productspec.setName(ps.get(i).getfSpecification());
				    			productspec.setStatus(1);
				    			session.save(productspec);
				    		}
				    		session.getTransaction().commit();
				    		
				    		
				    		session = HibernateUtil_new.currentSession();
				    		session.beginTransaction();
				    		
			    			List<Object> productspecids = session.createSQLQuery("select id from productspec where status=1 and k3materialspecno='" +ps.get(i).getfMaterialId()+ "'").list();
			    			productspecid = Integer.parseInt(productspecids.get(0).toString());
				    		
				    		message = "test";
				    		sql = "select fName from T_BD_UNIT_L where fUnitId=" + ps.get(i).getfBaseUnitId();
				    		String name = InvokeHelper.View(message, sql);
				    		name = name.substring(19,name.length()-4);
				    		//先保存productunit
				    		List<Productunit> productunits = session.createSQLQuery("select * from productunit where status=1 and k3materialunitno='" +ps.get(i).getfBaseUnitId()+ "'").addEntity(Productunit.class).list();
				    		if(productunits.isEmpty()){
				    			//save productunit
				    			productunit = new Productunit();
				    			productunit.setK3materialunitno(String.valueOf(ps.get(i).getfBaseUnitId()));
				    			productunit.setName(name);
				    			productunit.setTotal(0);
				    			productunit.setDownid(0);
				    			productunit.setIsbase(1);
				    			productunit.setStatus(1);
				    			session.save(productunit);
				    		}else{
				    			//update productunit
				    			productunits.get(0).setName(name);
				    			productunits.get(0).setTotal(0);
				    			productunits.get(0).setDownid(0);
				    			productunits.get(0).setIsbase(1);
				    		}
				    		session.getTransaction().commit();
				    		//最后保存product
				    		session = HibernateUtil_new.currentSession();
				    		session.beginTransaction();
				    		List<Object> productids = session.createSQLQuery("select id from product where status=1 and k3materialno='" +ps.get(i).getfMaterialId()+ "'").list();
					    	if(productids.isEmpty()){
					    		//save product
					    		product = new Product();
					    		product.setK3materialno(String.valueOf(ps.get(i).getfMaterialId()));
					    		product.setName(ps.get(i).getfName());
					    		product.setPeriodofvalidity(ps.get(i).getfExpPeriod());
					    		product.setProductspecid(productspecid);
					    		product.setProducttypeid(producttypeid);
					    		product.setStatus(1);
					    		product.setProductno(ps.get(i).getfNumber());
					    		session.save(product);
					    		
					    	}else{
					    		//update product
					    		List<Product> products = session.createSQLQuery("select * from product where status=1 and k3materialno='" +ps.get(i).getfMaterialId()+ "'").addEntity(Product.class).list();
					    		products.get(0).setName(ps.get(i).getfName());
					    		products.get(0).setPeriodofvalidity(ps.get(i).getfExpPeriod());
					    		products.get(0).setProductspecid(productspecid);
					    		products.get(0).setProducttypeid(producttypeid);
					    		products.get(0).setProductno(ps.get(i).getfNumber());
					    	}
					    	session.getTransaction().commit();	
					    	if(i == ps.size()-1){
					    		//把最后一个物料的序号存到同步记录表中
				            	HibernateUtil_new.closeSession();
								session = HibernateUtil_new.currentSession();
								session.beginTransaction();
								msql = "update synrecord set enddate=NOW() where tname='product'";
								
								ssql = "update synrecord set enddate=GETDATE() where tname='product'";
								if(iFlag == 0){
									statement = msql;
								}else{
									statement = ssql;
								}
								session.createSQLQuery(statement).executeUpdate();
				        		session.getTransaction().commit();
				            	HibernateUtil_new.closeSession();
								session = HibernateUtil_new.currentSession();
								session.beginTransaction();
					    	}
					    	
					    }
				    }
		    	}
		    	
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	    HibernateUtil_new.closeSession();
	}
	
	/**
	 * 部门同步
	 * @param session
	 */
	public static void queryDepartment(Session session){
		String statement;
		String msql;
		String ssql;
		//iFlag=0 mysql; iFlag=1 sqlserver
		int iFlag = CommonJudgeDB.judgeDB();
		HibernateUtil_new.closeSession();
		session = HibernateUtil_new.currentSession();
		session.beginTransaction();
		SynConfirm synConfirm = new SynConfirm();
		int times = synConfirm.check("department", session);
		if(times > 0){
		    try {
		    	if (InvokeHelper.Login(dbId, uid, pwd, lang)) {
		    		//设置同步中标志
			    	if(times == 1){
			    		msql = "insert into synrecord(tname,kid,syndate,rownum,enddate) values('department','0',NOW(),'0',null)";
						
						ssql = "insert into synrecord(tname,kid,syndate,rownum,enddate) values('department','0',GETDATE(),'0',null)";
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
			    		Query q = session.createSQLQuery(statement);
				    	q.executeUpdate();
			    	}else{
			    		msql = "update synrecord set syndate=NOW(),enddate=null where tname='department'";
						
						ssql = "update synrecord set syndate=GETDATE(),enddate=null where tname='department'";
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
			    		Query q = session.createSQLQuery(statement);
				    	q.executeUpdate();
			    	}
			    	session.getTransaction().commit();
			    	HibernateUtil_new.closeSession();
					session = HibernateUtil_new.currentSession();
					session.beginTransaction();
		    		String message = "test";
		    		String sql = "select a.fDeptId,b.fName,a.fParentId,a.fCreatorId,a.fUseOrgId " +
				       		"from t_BD_Department a left join t_BD_Department_l b on a.fDeptId = b.fDeptId";
				    String str = InvokeHelper.View(message, sql);
				    String resultData = str.substring(8,str.length()-1);
				    str = str.substring(9,str.length()-2);
					if(!str.isEmpty()){
				    	Gson gson = new Gson();
		                List<KDepartment> ps = gson.fromJson(resultData, new TypeToken<List<KDepartment>>(){}.getType());
		                int orgid = 0;
		                Department depart;
					    for(int i=0;i<ps.size();i++){
						    HibernateUtil_new.closeSession();
							session = HibernateUtil_new.currentSession();
							session.beginTransaction();
					    	List<Object> orgids = session.createSQLQuery("select id from org where status=1 and k3orgno='" + ps.get(i).getfUseOrgId() +"'").list();
					    	//机构id不存在就结束添加部门
					    	if(!orgids.isEmpty()){
					    		orgid = Integer.valueOf(orgids.get(0).toString());
					    	}else{
					    		session.createSQLQuery("update issyn set status=0 where tname='org'").executeUpdate();
					    		break;
					    	}
					    	List<Object> upperids = session.createSQLQuery("select id from department where status=1 and zdy2='" + ps.get(i).getfParentId() + "'").list();
					    	if(upperids.isEmpty()){
					    		List<Object> ids = session.createSQLQuery("select id from department where status=1 and k3departmentno='" + ps.get(i).getfDeptId() +"'").list();
						    	if(ids.isEmpty()){
						    		//save department
							    	depart = new Department();
							    	depart.setCreatedate(new Date());
							    	depart.setName(ps.get(i).getfName());
							    	depart.setK3departmentno(String.valueOf(ps.get(i).getfDeptId()));
							    	depart.setUpperid(0);
							    	depart.setOrgid(orgid);
							    	depart.setManageruserid(0);
							    	depart.setStatus(1);
							    	depart.setZdy2(String.valueOf(ps.get(i).getfParentId()));
							    	session.save(depart);
						    	}else{
						    		//update department
						    		List<Department> obj = session.createSQLQuery("select * from department where status=1 and k3departmentno='" + ps.get(i).getfDeptId() +"'").addEntity(Department.class).list();
						    		obj.get(0).setName(ps.get(i).getfName());
						    		obj.get(0).setK3departmentno(String.valueOf(ps.get(i).getfDeptId()));
						    		obj.get(0).setUpperid(0);
						    		obj.get(0).setZdy2(String.valueOf(ps.get(i).getfParentId()));
						    		obj.get(0).setOrgid(orgid);
						    	}
					    	}else{
					    		List<Object> ids = session.createSQLQuery("select id from department where status=1 and k3departmentno='" + ps.get(i).getfDeptId() +"'").list();
						    	if(ids.isEmpty()){
						    		//save department
							    	depart = new Department();
							    	depart.setCreatedate(new Date());
							    	depart.setName(ps.get(i).getfName());
							    	depart.setK3departmentno(String.valueOf(ps.get(i).getfDeptId()));
							    	depart.setUpperid(Integer.parseInt(upperids.get(0).toString()));
							    	depart.setOrgid(orgid);
							    	depart.setManageruserid(0);
							    	depart.setStatus(1);
							    	depart.setZdy2(String.valueOf(ps.get(i).getfParentId()));
							    	session.save(depart);
						    	}else{
						    		//update department
						    		List<Department> obj = session.createSQLQuery("select * from department where status=1 and k3departmentno='" + ps.get(i).getfDeptId() +"'").addEntity(Department.class).list();
						    		obj.get(0).setName(ps.get(i).getfName());
						    		obj.get(0).setK3departmentno(String.valueOf(ps.get(i).getfDeptId()));
						    		obj.get(0).setUpperid(Integer.parseInt(upperids.get(0).toString()));
						    		obj.get(0).setZdy2(String.valueOf(ps.get(i).getfParentId()));
						    		obj.get(0).setOrgid(orgid);
						    	}
					    	}
					    	
					    	session.getTransaction().commit();
					    	if(i == ps.size()-1){
					    		//把最后一个供应商的序号存到同步记录表中
				            	HibernateUtil_new.closeSession();
								session = HibernateUtil_new.currentSession();
								session.beginTransaction();
								msql = "update synrecord set enddate=NOW() where tname='department'";
								
								ssql = "update synrecord set enddate=GETDATE() where tname='department'";
								if(iFlag == 0){
									statement = msql;
								}else{
									statement = ssql;
								}
								session.createSQLQuery(statement).executeUpdate();
				        		session.getTransaction().commit();
				            	HibernateUtil_new.closeSession();
								session = HibernateUtil_new.currentSession();
								session.beginTransaction();
					    	}
					    }
				    }
		    	}
			} catch (Exception e) {
				e.printStackTrace();
			}	
		}
	    HibernateUtil_new.closeSession();
	}
	
	/**
	 * 地区同步
	 * @param session
	 */
	public static void queryArea(Session session){
		HibernateUtil_new.closeSession();
		session = HibernateUtil_new.currentSession();
		session.beginTransaction();
		
	    try {
	    	if (InvokeHelper.Login(dbId, uid, pwd, lang)) {
	    		String message = "test";
	    		String sql ="select e.fId,e.fEntryId,e.fParentId,e.fNumber," +
						"e.fName,e.parentId,e.fDataValue from (select c.fId,c.fEntryId,d.fParentId,d.fNumber,d.fName," +
						"c.fParentId parentId,c.fDataValue from " +
						"(select a.fId,a.fEntryId,a.fNumber,a.fParentId,b.fDataValue from T_BAS_ASSISTANTDATAENTRY a left join" +
						" T_BAS_ASSISTANTDATAENTRY_l b on a.fEntryId = b.fEntryId) c left join " +
						"(select x.fId,x.fParentId,x.fNumber,y.fName,y.fDescription from T_BAS_ASSISTANTDATA x " +
						"left join T_BAS_ASSISTANTDATA_l y on x.fId = y.fId) d " +
						"on c.fId = d.fId) e where e.fEntryId like '%CRM%'";
			    String str = InvokeHelper.View(message, sql);
			    String resultData = str.substring(8,str.length()-1);
			    str = str.substring(9,str.length()-2);
				if(!str.isEmpty()){
			    	Gson gson = new Gson();
	                List<KArea> ps = gson.fromJson(resultData, new TypeToken<List<KArea>>(){}.getType());
	                Province province;
	                City city;
	                Town town;
	                int provinceid = 0;
	                int cityid = 0;
				    for(int i=0;i<ps.size();i++){
				    	HibernateUtil_new.closeSession();
						session = HibernateUtil_new.currentSession();
						session.beginTransaction();
						
				    	if(ps.get(i).getfName().equalsIgnoreCase("省份")){
				    		List<Province> provinces = session.createSQLQuery("select * from province where status=1 and zdy10='" + ps.get(i).getfEntryId() + "'").addEntity(Province.class).list();
				    		if(provinces.isEmpty()){
				    			province = new Province();
				    			province.setK3provinceno(ps.get(i).getfId());
				    			province.setName(ps.get(i).getfDataValue());
				    			province.setShortname("");
				    			province.setStatus(1);
				    			province.setZdy10(ps.get(i).getfEntryId());
				    			session.save(province);
				    		}else{
				    			provinces.get(0).setName(ps.get(i).getfDataValue());
				    		}
				    		session.getTransaction().commit();
				    	}else{
				    		List<City> citys = session.createSQLQuery("select * from city where status=1 and zdy10='" + ps.get(i).getfEntryId() + "'").addEntity(City.class).list();
				    		if(citys.isEmpty()){
				    			city = new City();
				    			city.setK3cityno(ps.get(i).getfId());
				    			city.setName(ps.get(i).getfDataValue());
				    			List<Object> provinceids = session.createSQLQuery("select id from province where status=1 and k3provinceno='" + ps.get(i).getfParentId() +"'").list();
				    			if(!provinceids.isEmpty()){
				    				provinceid = Integer.parseInt(provinceids.get(0).toString());
				    			}
				    			city.setProvinceid(provinceid);
				    			city.setShortname("");
				    			city.setStatus(1);
				    			city.setZdy10(ps.get(i).getfEntryId());
				    			session.save(city);
				    		}else{
				    			citys.get(0).setK3cityno(ps.get(i).getfId());
				    			citys.get(0).setName(ps.get(i).getfDataValue());
				    			citys.get(0).setName(ps.get(i).getfDataValue());
				    			List<Object> provinceids = session.createSQLQuery("select id from province where status=1 and k3provinceno='" + ps.get(i).getfParentId() +"'").list();
				    			if(!provinceids.isEmpty()){
				    				provinceid = Integer.parseInt(provinceids.get(0).toString());
				    			}
				    			citys.get(0).setProvinceid(provinceid);
				    		}
				    		session.getTransaction().commit();
				    	}
				    }
			    }
	    	}
		} catch (Exception e) {
			e.printStackTrace();
		}	
	    HibernateUtil_new.closeSession();
	}
}
