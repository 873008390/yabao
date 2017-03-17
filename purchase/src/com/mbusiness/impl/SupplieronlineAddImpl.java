package com.mbusiness.impl;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.Date;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;

import com.mbusiness.dao.SupplieronlineAddDAO;
import com.mbusiness.model.Auditlog;
import com.mbusiness.model.Supplier;
import com.mbusiness.model.Supplierfile;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.CheckPhoneno;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.MMessage;
import com.mbusiness.util.SequenceHelper;

public class SupplieronlineAddImpl implements SupplieronlineAddDAO {
	
	private String titleValid;
	private String result = "";
	private Session session;
	private MMessage mmessage = new MMessage();
	private HasPermission hasPermission = new HasPermission();
	@Override
	public String add(Usersession usersession, Supplier supplier) {
		HibernateUtil_new.closeSession();
		session = HibernateUtil_new.currentSession();
		session.beginTransaction();
		if(usersession.getUsername().equalsIgnoreCase("")){
			result = mmessage.notlogin;
		}else{
			int flag = 0;		
			if(hasPermission.hasPermission(usersession.getUsername(), "supplier", "adddata", session) == 0){
				if(usersession.getUsername().equalsIgnoreCase("admin")){
					result = mmessage.adminnopermission;	
				}else{
					result = mmessage.nopermission;
				}
			}else{
				flag = 1;
			}
			if(flag == 1){
				int orgid = 0;
				int userid = 0;
				List<Object[]> o1 = session.createSQLQuery("select orgid,id from users where status=1 and account='"+ usersession.getUsername() +"'").list();
				if(o1.isEmpty()){
					result = mmessage.orginvalid +"["+ usersession.getUsername() +"]";
				}else{
					orgid = Integer.parseInt(o1.get(0)[0].toString());
					userid = Integer.parseInt(o1.get(0)[1].toString());
				}
				if(supplier.getId() == 0){
					String no = "";
					String noname = "supplierno";
					int loopnum = 0;
					while(true){
						SequenceHelper seq = new SequenceHelper();
						int value = seq.nextValue(noname, session);
						session.getTransaction().commit();
						HibernateUtil_new.closeSession();
						session = HibernateUtil_new.currentSession();
						session.beginTransaction();
						if(value>-1){
							Query q = session.createSQLQuery("select id from supplier where status=1 and supplierno='"+ value +"'");
							if(q.list().isEmpty()){
								no = ""+ value;
								break;
							}else{
								loopnum += 1;
								if(loopnum > 50){
									break;
								}
							}
						}else{
							loopnum += 1;
							if(loopnum > 50){
								break;
							}
						}
					}
					if(supplier.getPhoneno() != null && !supplier.getPhoneno().equalsIgnoreCase("")){
						CheckPhoneno cp = new CheckPhoneno();
						if(!cp.check(supplier.getPhoneno())){
							result = mmessage.phonenoinvalid +"["+ supplier.getName() +"]";
						}
						List<Object> o5 = session.createSQLQuery("select id from supplier where status=1 and phoneno='"+ supplier.getPhoneno() +"'").list();
						if(!o5.isEmpty()){
							result = mmessage.phonenoduplicate +"["+ supplier.getName() +"]";
						}
					}
					if(supplier.getName() != null && !supplier.getName().equalsIgnoreCase("")){
						List<Object> o6 = session.createSQLQuery("select name from org where id=(select orgid from supplier where status=1 and name='"+ supplier.getName() +"')").list();
						if(!o6.isEmpty()){
							result = mmessage.nameduplicate +"[机构："+ o6.get(0).toString() +"，名称："+ supplier.getName() +"]";
						}
					}
					if(result.equalsIgnoreCase("")){
						try {
							supplier.setName(URLDecoder.decode(supplier.getName(),"UTF-8"));
							supplier.setAddress(URLDecoder.decode(supplier.getAddress(),"UTF-8"));
							supplier.setContactperson(URLDecoder.decode(supplier.getContactperson(),"UTF-8"));
							supplier.setBank(URLDecoder.decode(supplier.getBank(),"UTF-8"));
							supplier.setBankname(URLDecoder.decode(supplier.getBankname(),"UTF-8"));
							supplier.setInvoicetype(URLDecoder.decode(supplier.getInvoicetype(),"UTF-8"));
							supplier.setTaxtype(URLDecoder.decode(supplier.getTaxtype(),"UTF-8"));
							supplier.setZdy9(URLDecoder.decode(supplier.getZdy9(),"UTF-8"));
						} catch (UnsupportedEncodingException e1) {
							e1.printStackTrace();
						}
						supplier.setCreatedate(new Date());
						supplier.setSupplierno(no);
						supplier.setStatus(1);
						supplier.setOrgid(orgid);
						
						//查看是否有审核组
						Query q = session.createSQLQuery("select id from auditgroup where status=1 and orgid="+ orgid);
						if(!q.list().isEmpty()){
							supplier.setAuditstatus(0);
						}else{
							supplier.setAuditstatus(1);//无需审核
						}
						
						session.save(supplier);
						session.getTransaction().commit();
						
						//insert supplierfile
						if(!supplier.getZdy10().equalsIgnoreCase("")){
							int len = supplier.getZdy10().split(";").length;
							try {
								String memos = URLDecoder.decode(supplier.getZdy9(),"UTF-8");
								for(int i=0;i<len;i++){
									HibernateUtil_new.closeSession();
									session = HibernateUtil_new.currentSession();
									session.beginTransaction();
									List<Supplier> suppliers = session.createSQLQuery("select * from supplier where status=1 and supplierno='"+ no +"'").addEntity(Supplier.class).list();
									if(!suppliers.isEmpty()){
										suppliers.get(0).setFilenum(suppliers.get(0).getFilenum() +1);
										
										Supplierfile supplierfile = new Supplierfile();
										supplierfile.setSupplierid(suppliers.get(0).getId());
										supplierfile.setCreatedate(new Date());
										supplierfile.setOldfilename("");
										supplierfile.setUrl(supplier.getZdy10().split(";")[i]);
										supplierfile.setZdy10(memos.split(";")[i]);
										supplierfile.setStatus(1);
										session.save(supplierfile);
										
										session.getTransaction().commit();						
									}
								}
							} catch (UnsupportedEncodingException e) {
							}
						}
						
						result = mmessage.savesuccess;
					}
				}else{
					List<Supplier> suppliers = session.createSQLQuery("select * from supplier where status=1 and id="+ supplier.getId()).addEntity(Supplier.class).list();
					if(suppliers.isEmpty()){
						result = mmessage.datachange +"["+ supplier.getName() +"]";
					}
					if(supplier.getPhoneno() != null && !supplier.getPhoneno().equalsIgnoreCase("")){
						CheckPhoneno cp = new CheckPhoneno();
						if(!cp.check(supplier.getPhoneno())){
							result = mmessage.phonenoinvalid +"["+ supplier.getName() +"]";
						}
						List<Object> o5 = session.createSQLQuery("select id from supplier where status=1 and phoneno='"+ supplier.getPhoneno() +"' and id<>"+ supplier.getId()).list();
						if(!o5.isEmpty()){
							result = mmessage.phonenoduplicate +"["+ supplier.getName() +"]";
						}
					}
					if(supplier.getName() != null && !supplier.getName().equalsIgnoreCase("")){
						List<Object> o6 = session.createSQLQuery("select name from org where id=(select orgid from supplier where status=1 and name='"+ supplier.getName() +"' and id<>"+ supplier.getId() +")").list();
						if(!o6.isEmpty()){
							result = mmessage.nameduplicate +"[机构："+ o6.get(0).toString() +"，名称："+ supplier.getName() +"]";
						}
					}
					if(result.equalsIgnoreCase("")){
						String modifycontent = "";
						if(supplier.getName() !=null && !supplier.getName().equalsIgnoreCase(suppliers.get(0).getName())){
							try {
								suppliers.get(0).setName(URLDecoder.decode(supplier.getName(),"UTF-8"));
								modifycontent = modifycontent +",名称";
							} catch (UnsupportedEncodingException e) {
								e.printStackTrace();
							}
							
						}
						if(supplier.getPhoneno() !=null && !supplier.getPhoneno().equalsIgnoreCase(suppliers.get(0).getPhoneno())){
							suppliers.get(0).setPhoneno(supplier.getPhoneno());
							modifycontent = modifycontent +",手机号";
						}
						if(supplier.getTel() !=null && !supplier.getTel().equalsIgnoreCase(suppliers.get(0).getTel())){
							suppliers.get(0).setTel(supplier.getTel());
							modifycontent = modifycontent +",座机";
						}
						if(supplier.getFax() !=null && !supplier.getFax().equalsIgnoreCase(suppliers.get(0).getFax())){
							suppliers.get(0).setFax(supplier.getFax());
							modifycontent = modifycontent +",传真";
						}
						if(supplier.getContactperson() !=null && !supplier.getContactperson().equalsIgnoreCase(suppliers.get(0).getContactperson())){
							try {
								suppliers.get(0).setContactperson(URLDecoder.decode(supplier.getContactperson(),"UTF-8"));
								modifycontent = modifycontent +",联系人";
							} catch (UnsupportedEncodingException e) {
								e.printStackTrace();
							}
							
						}
						if(supplier.getAddress() !=null && !supplier.getAddress().equalsIgnoreCase(suppliers.get(0).getAddress())){
							try {
								suppliers.get(0).setAddress(URLDecoder.decode(supplier.getAddress(),"UTF-8"));
								modifycontent = modifycontent +",详细地址";
							} catch (UnsupportedEncodingException e) {
								e.printStackTrace();
							}
							
						}
						if(supplier.getBank() !=null && !supplier.getBank().equalsIgnoreCase(suppliers.get(0).getBank())){
							try {
								suppliers.get(0).setBank(URLDecoder.decode(supplier.getBank(),"UTF-8"));
								modifycontent = modifycontent +",开户银行";
							} catch (UnsupportedEncodingException e) {
								e.printStackTrace();
							}
							
						}
						if(supplier.getBankaccount() !=null && !supplier.getBankaccount().equalsIgnoreCase(suppliers.get(0).getBankaccount())){
							suppliers.get(0).setBankaccount(supplier.getBankaccount());
							modifycontent = modifycontent +",银行账号";
						}
						if(supplier.getBankname() !=null && !supplier.getBankname().equalsIgnoreCase(suppliers.get(0).getBankname())){
							try {
								suppliers.get(0).setBankname(URLDecoder.decode(supplier.getBankname(),"UTF-8"));
								modifycontent = modifycontent +",开户名称";
							} catch (UnsupportedEncodingException e) {
								e.printStackTrace();
							}
							
						}
						if(supplier.getCompanycode() !=null && !supplier.getCompanycode().equalsIgnoreCase(suppliers.get(0).getCompanycode())){
							suppliers.get(0).setCompanycode(supplier.getCompanycode());
							modifycontent = modifycontent +",营业执照号";
						}
						if(supplier.getInvoicetype() !=null && !supplier.getInvoicetype().equalsIgnoreCase(suppliers.get(0).getInvoicetype())){
							try {
								suppliers.get(0).setInvoicetype(URLDecoder.decode(supplier.getInvoicetype(),"UTF-8"));
								modifycontent = modifycontent +",发票类型";
							} catch (UnsupportedEncodingException e) {
								e.printStackTrace();
							}
							
						}
						if(supplier.getIscompany() != suppliers.get(0).getIscompany()){
							suppliers.get(0).setIscompany(supplier.getIscompany());
							modifycontent = modifycontent +",参标类型";
						}
						if(supplier.getTaxrate() != suppliers.get(0).getTaxrate()){
							suppliers.get(0).setTaxrate(supplier.getTaxrate());
							modifycontent = modifycontent +",默认税率";
						}
						if(supplier.getTaxtype() !=null && !supplier.getTaxtype().equalsIgnoreCase(suppliers.get(0).getTaxtype())){
							try {
								suppliers.get(0).setTaxtype(URLDecoder.decode(supplier.getTaxtype(),"UTF-8"));
								modifycontent = modifycontent +",纳税类型";
							} catch (UnsupportedEncodingException e) {
								e.printStackTrace();
							}
							
						}
						if(supplier.getProvinceid() != suppliers.get(0).getProvinceid()){
							suppliers.get(0).setProvinceid(supplier.getProvinceid());
							modifycontent = modifycontent +",省份";
						}
						if(supplier.getCityid() != suppliers.get(0).getCityid()){
							suppliers.get(0).setCityid(supplier.getCityid());
							modifycontent = modifycontent +",城市";
						}
						suppliers.get(0).setAuditstatus(0);
						
						if(!modifycontent.equalsIgnoreCase("")){
							Auditlog al = new Auditlog();
							al.setCreatedate(new Date());
							al.setAuditgroupid(0);
							al.setMemo("");
							al.setOperation("");
							al.setStatus(1);
							al.setSupplierid(suppliers.get(0).getId());
							al.setUserid(userid);
							al.setModifycontent(modifycontent.substring(1));
							session.save(al);
						}
						session.getTransaction().commit();
						result = mmessage.modifysuccess;
					}
				}
			}
		}
		HibernateUtil_new.closeSession();
		return result;
	}
}
