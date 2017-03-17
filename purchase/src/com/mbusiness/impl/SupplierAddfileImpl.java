package com.mbusiness.impl;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.mbusiness.dao.SupplierAddfileDAO;
import com.mbusiness.model.Auditlog;
import com.mbusiness.model.Supplier;
import com.mbusiness.model.Supplierfile;
import com.mbusiness.model.Supplierfile;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Inputverify;
import com.mbusiness.util.MMessage;

public class SupplierAddfileImpl implements SupplierAddfileDAO {
	
	private String result;
	private Session session;
	private MMessage mmessage = new MMessage();
	private Inputverify inputverify = new Inputverify();
	private HasPermission hasPermission = new HasPermission();
	//private SupplierCorporationid supplierCorporationid = new SupplierCorporationid();
	@Override
	public String add(Usersession usersession, Supplierfile supplierfile, File file, String path, String oldfilename) {
		HibernateUtil_new.closeSession();
		session = HibernateUtil_new.currentSession();
		session.beginTransaction();
		int flag = 1;	
		if(supplierfile != null){
			if(supplierfile.getZdy1() != null){
				flag = inputverify.check(supplierfile.getZdy1());
			}else if(supplierfile.getZdy2() != null){
				flag = inputverify.check(supplierfile.getZdy2());
			}else if(supplierfile.getZdy3() != null){
				flag = inputverify.check(supplierfile.getZdy3());
			}else if(supplierfile.getZdy4() != null){
				flag = inputverify.check(supplierfile.getZdy4());
			}else if(supplierfile.getZdy5() != null){
				flag = inputverify.check(supplierfile.getZdy5());
			}else if(supplierfile.getZdy6() != null){
				flag = inputverify.check(supplierfile.getZdy6());
			}else if(supplierfile.getZdy7() != null){
				flag = inputverify.check(supplierfile.getZdy7());
			}else if(supplierfile.getZdy8() != null){
				flag = inputverify.check(supplierfile.getZdy8());
			}else if(supplierfile.getZdy9() != null){
				flag = inputverify.check(supplierfile.getZdy9());
			}else if(supplierfile.getZdy10() != null){
				flag = inputverify.check(supplierfile.getZdy10());
			}
		}else{
			supplierfile = new Supplierfile();
		}
		if(flag != 1){
			result = mmessage.dataillegal;
		}else{
			if(file != null){
				File fdir = new File(path);
				if(!fdir.exists()){
					fdir.mkdir();
				}
				Date now = new Date();
				SimpleDateFormat df=new SimpleDateFormat("yyyyMMddhhmmssSSS");	
				String prefix = oldfilename.substring(oldfilename.lastIndexOf(".")+1);;
				String newfilename = df.format(now).toString() +"."+ prefix;
				FileOutputStream fos;
				FileInputStream fis;
				try {
					fos = new FileOutputStream(path +"\\"+ newfilename); 
			        fis = new FileInputStream(file); 
			        byte[] buffer=new byte[1024]; 
			        int len=0; 	        
					while((len=fis.read(buffer))>0){ 
					    fos.write(buffer, 0, len); 
					}
				} catch (IOException e) {			
//					e.printStackTrace();
				} finally{
					fos = null;
					fis = null;
				}
				supplierfile.setUrl("upload/"+ newfilename);
				List<Supplier> suppliers = session.createSQLQuery("select * from supplier where id="+ supplierfile.getSupplierid()).addEntity(Supplier.class).list();
				if(!suppliers.isEmpty()){
					suppliers.get(0).setFilenum(suppliers.get(0).getFilenum() +1);
					suppliers.get(0).setAuditstatus(0);
					
					supplierfile.setCreatedate(new Date());
					supplierfile.setOldfilename(oldfilename);
					supplierfile.setStatus(1);
					try {
						supplierfile.setZdy10(URLDecoder.decode(supplierfile.getZdy10(),"UTF-8"));
					} catch (UnsupportedEncodingException e) {
						e.printStackTrace();
					}
					session.save(supplierfile);
					session.getTransaction().commit();	
					HibernateUtil_new.closeSession();
					session = HibernateUtil_new.currentSession();
					session.beginTransaction();
					
					//log
					int userid = 0;
					List<Object[]> o1 = session.createSQLQuery("select orgid,id from users where status=1 and account='"+ usersession.getUsername() +"'").list();
					if(!o1.isEmpty()){
						userid = Integer.parseInt(o1.get(0)[1].toString());
					}
					String modifycontent = "Ôö¼Ó¸½¼þ£º"+ supplierfile.getZdy10();
					if(userid>0){
						Auditlog al = new Auditlog();
						al.setCreatedate(new Date());
						al.setAuditgroupid(0);
						al.setMemo("");
						al.setOperation("");
						al.setStatus(1);
						al.setSupplierid(suppliers.get(0).getId());
						al.setUserid(userid);
						al.setModifycontent(modifycontent);
						session.save(al);
					}
					
					session.getTransaction().commit();						
				}
		        result = mmessage.savesuccess +"_"+ "upload/"+ newfilename;
			}else{
				result = mmessage.datachange;
			}
		}
		HibernateUtil_new.closeSession();
		return result;
	}
}
