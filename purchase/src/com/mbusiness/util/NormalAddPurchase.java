package com.mbusiness.util;

import java.util.Date;
import java.util.List;

import org.hibernate.Session;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.mbusiness.helper.InvokeHelper;
import com.mbusiness.model.KMaterial;
import com.mbusiness.model.KPurchaseOrder;
import com.mbusiness.model.KSupplier;
import com.mbusiness.model.Product;
import com.mbusiness.model.Productspec;
import com.mbusiness.model.Productunit;
import com.mbusiness.model.Purchase;
import com.mbusiness.model.Purchasedetail;
import com.mbusiness.model.Supplier;

public class NormalAddPurchase {

	/**
	 * 正常添加采购单
	 */
	public int execute(Session session,List<KPurchaseOrder> ps,String message,
			String sql,String str,String resultData,Gson gson,Purchase purchase,Purchasedetail purchasedetail,
			Supplier supplier,Productunit productunit,Productspec productspec,Product product,int supplierid,
			int purchaseid,int productid, int productunitid,int productspecid,int startrecord) throws Exception{
		int result = 0;
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
			    			result = i;
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
	    	
	    	if(i == ps.size()-1){
	    		result = i;
        	}
	    }
		return result;
	}
	
}
