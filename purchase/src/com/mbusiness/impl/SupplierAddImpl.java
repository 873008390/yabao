package com.mbusiness.impl;

import java.util.Date;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.mbusiness.dao.SupplierAddDAO;
import com.mbusiness.model.Auditlog;
import com.mbusiness.model.Supplier;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.CheckPhoneno;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.MMessage;
import com.mbusiness.util.SequenceHelper;

public class SupplierAddImpl implements SupplierAddDAO {
	
	private String titleValid;
	private String result;
	private Session session;
	private MMessage mmessage = new MMessage();
	private HasPermission hasPermission = new HasPermission();
	//private SupplierCorporationid supplierCorporationid = new SupplierCorporationid();
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
					flag = 1;	
				}else{
					result = mmessage.nopermission;
				}
			}else{
				flag = 1;
			}
			if(flag == 1){			
				String details = supplier.getZdy10();
				
				supplier.setZdy10("");
				//System.out.println("========"+details);
				
				Gson gson = new Gson();
				List<Supplier> ps = gson.fromJson("["+ details +"]", new TypeToken<List<Supplier>>(){}.getType());
				Supplier s;
				int oldmanageruserid = 0;
				//System.out.println("========"+details);
				for(int i=0;i<ps.size();i++){
					HibernateUtil_new.closeSession();
					session = HibernateUtil_new.currentSession();
					session.beginTransaction();
					String no = "";
					String noname = "supplierno";
					int orgid = 0;
					int userid = 0;
					if(usersession.getUsername().equalsIgnoreCase("admin")){
						result = mmessage.adminnopermission;
						break;
					}else{
						List<Object[]> o1 = session.createSQLQuery("select orgid,id from users where status=1 and account='"+ usersession.getUsername() +"'").list();
						if(o1.isEmpty()){
							result = mmessage.orginvalid +"["+ usersession.getUsername() +"]";
							break;
						}else{
							orgid = Integer.parseInt(o1.get(0)[0].toString());
							userid = Integer.parseInt(o1.get(0)[1].toString());
						}
					}
					int provinceid = 0;
					List<Object> o11 = session.createSQLQuery("select id from province where status=1 and name='"+ ps.get(i).getZdy6() +"'").list();
					if(!o11.isEmpty()){
						provinceid = Integer.parseInt(o11.get(0).toString());
					}
					int cityid = 0;
					List<Object> o12 = session.createSQLQuery("select id from city where status=1 and name='"+ ps.get(i).getZdy7() +"'").list();
					if(!o12.isEmpty()){
						cityid = Integer.parseInt(o12.get(0).toString());
					}
					if(ps.get(i).getId() == 0){
						int loopnum = 0;
						while(true){
							SequenceHelper seq = new SequenceHelper();
							int value = seq.nextValue(noname, session);
							session.getTransaction().commit();
							HibernateUtil_new.closeSession();
							session = HibernateUtil_new.currentSession();
							session.beginTransaction();
							if(value>-1){
								Query q = session.createSQLQuery("select id from supplier where status=1 and type="+ ps.get(i).getType() +" and supplierno='"+ value +"'");
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
						if(ps.get(i).getPhoneno() != null && !ps.get(i).getPhoneno().equalsIgnoreCase("")){
							CheckPhoneno cp = new CheckPhoneno();
							if(!cp.check(ps.get(i).getPhoneno())){
								result = mmessage.phonenoinvalid +"["+ ps.get(i).getName() +"]";
								break;
							}
							List<Object> o5 = session.createSQLQuery("select id from supplier where status=1 and phoneno='"+ ps.get(i).getPhoneno() +"'").list();
							if(!o5.isEmpty()){
								result = mmessage.phonenoduplicate +"["+ ps.get(i).getName() +"]";
								break;
							}
						}
						if(ps.get(i).getName() != null && !ps.get(i).getName().equalsIgnoreCase("")){
							List<Object> o6 = session.createSQLQuery("select name from org where id=(select orgid from supplier where status=1 and name='"+ ps.get(i).getName() +"')").list();
							if(!o6.isEmpty()){
								result = mmessage.nameduplicate +"[机构："+ o6.get(0).toString() +"，名称："+ ps.get(i).getName() +"]";
								break;
							}
						}
						s = new Supplier();
						s.setCreatedate(new Date());
						s.setType(ps.get(i).getType());
						s.setSupplierno(no);
						s.setPhoneno(ps.get(i).getPhoneno());
						s.setTel(ps.get(i).getTel());
						s.setName(ps.get(i).getName());
						s.setContactperson(ps.get(i).getContactperson());
						s.setAddress(ps.get(i).getAddress());
						s.setStatus(1);
						s.setBank(ps.get(i).getBank());
						s.setBankaccount(ps.get(i).getBankaccount());
						s.setBankname(ps.get(i).getBankname());
						s.setCompanycode(ps.get(i).getCompanycode());
						s.setFax(ps.get(i).getFax());
						s.setInvoicetype(ps.get(i).getInvoicetype());
						s.setIscompany(ps.get(i).getIscompany());
						s.setTaxrate(ps.get(i).getTaxrate());
						s.setTaxtype(ps.get(i).getTaxtype());
						s.setOrgid(orgid);
						s.setProvinceid(provinceid);
						s.setCityid(cityid);
						s.setK3supplierno("");
						
						//查看是否有审核组
						Query q = session.createSQLQuery("select id from auditgroup where status=1 and orgid="+ orgid);
						if(!q.list().isEmpty()){
							s.setAuditstatus(0);
						}else{
							s.setAuditstatus(1);//无需审核
						}
						
						session.save(s);
					}else{
						List<Supplier> suppliers = session.createSQLQuery("select * from supplier where status=1 and id="+ ps.get(i).getId()).addEntity(Supplier.class).list();
						if(suppliers.isEmpty()){
							result = mmessage.datachange +"["+ ps.get(i).getName() +"]";
							break;
						}
						if(ps.get(i).getPhoneno() != null && !ps.get(i).getPhoneno().equalsIgnoreCase("")){
							CheckPhoneno cp = new CheckPhoneno();
							if(!cp.check(ps.get(i).getPhoneno())){
								result = mmessage.phonenoinvalid +"["+ ps.get(i).getName() +"]";
								break;
							}
							List<Object> o5 = session.createSQLQuery("select id from supplier where status=1 and phoneno='"+ ps.get(i).getPhoneno() +"' and id<>"+ ps.get(i).getId()).list();
							if(!o5.isEmpty()){
								result = mmessage.phonenoduplicate +"["+ ps.get(i).getName() +"]";
								break;
							}
						}
						if(ps.get(i).getName() != null && !ps.get(i).getName().equalsIgnoreCase("")){
							List<Object> o6 = session.createSQLQuery("select name from org where id=(select orgid from supplier where status=1 and name='"+ ps.get(i).getName() +"' and id<>"+ ps.get(i).getId() +")").list();
							if(!o6.isEmpty()){
								result = mmessage.nameduplicate +"[机构："+ o6.get(0).toString() +"，名称："+ ps.get(i).getName() +"]";
								break;
							}
						}
						String modifycontent = "";
						if(ps.get(i).getName() !=null && !ps.get(i).getName().equalsIgnoreCase(suppliers.get(0).getName())){
							suppliers.get(0).setName(ps.get(i).getName());
							modifycontent = modifycontent +",名称";
						}
						if(ps.get(i).getPhoneno() !=null && !ps.get(i).getPhoneno().equalsIgnoreCase(suppliers.get(0).getPhoneno())){
							suppliers.get(0).setPhoneno(ps.get(i).getPhoneno());
							modifycontent = modifycontent +",手机号";
						}
						if(ps.get(i).getTel() !=null && !ps.get(i).getTel().equalsIgnoreCase(suppliers.get(0).getTel())){
							suppliers.get(0).setTel(ps.get(i).getTel());
							modifycontent = modifycontent +",座机";
						}
						if(ps.get(i).getFax() !=null && !ps.get(i).getFax().equalsIgnoreCase(suppliers.get(0).getFax())){
							suppliers.get(0).setFax(ps.get(i).getFax());
							modifycontent = modifycontent +",传真";
						}
						if(ps.get(i).getContactperson() !=null && !ps.get(i).getContactperson().equalsIgnoreCase(suppliers.get(0).getContactperson())){
							suppliers.get(0).setContactperson(ps.get(i).getContactperson());
							modifycontent = modifycontent +",联系人";
						}
						if(ps.get(i).getAddress() !=null && !ps.get(i).getAddress().equalsIgnoreCase(suppliers.get(0).getAddress())){
							suppliers.get(0).setAddress(ps.get(i).getAddress());
							modifycontent = modifycontent +",详细地址";
						}
						if(ps.get(i).getBank() !=null && !ps.get(i).getBank().equalsIgnoreCase(suppliers.get(0).getBank())){
							suppliers.get(0).setBank(ps.get(i).getBank());
							modifycontent = modifycontent +",开户银行";
						}
						if(ps.get(i).getBankaccount() !=null && !ps.get(i).getBankaccount().equalsIgnoreCase(suppliers.get(0).getBankaccount())){
							suppliers.get(0).setBankaccount(ps.get(i).getBankaccount());
							modifycontent = modifycontent +",银行账号";
						}
						if(ps.get(i).getBankname() !=null && !ps.get(i).getBankname().equalsIgnoreCase(suppliers.get(0).getBankname())){
							suppliers.get(0).setBankname(ps.get(i).getBankname());
							modifycontent = modifycontent +",开户名称";
						}
						if(ps.get(i).getCompanycode() !=null && !ps.get(i).getCompanycode().equalsIgnoreCase(suppliers.get(0).getCompanycode())){
							suppliers.get(0).setCompanycode(ps.get(i).getCompanycode());
							modifycontent = modifycontent +",营业执照号";
						}
						if(ps.get(i).getInvoicetype() !=null && !ps.get(i).getInvoicetype().equalsIgnoreCase(suppliers.get(0).getInvoicetype())){
							suppliers.get(0).setInvoicetype(ps.get(i).getInvoicetype());
							modifycontent = modifycontent +",发票类型";
						}
						if(ps.get(i).getIscompany() != suppliers.get(0).getIscompany()){
							suppliers.get(0).setIscompany(ps.get(i).getIscompany());
							modifycontent = modifycontent +",参标类型";
						}
						if(ps.get(i).getTaxrate() != suppliers.get(0).getTaxrate()){
							suppliers.get(0).setTaxrate(ps.get(i).getTaxrate());
							modifycontent = modifycontent +",默认税率";
						}
						if(ps.get(i).getTaxtype() !=null && !ps.get(i).getTaxtype().equalsIgnoreCase(suppliers.get(0).getTaxtype())){
							suppliers.get(0).setTaxtype(ps.get(i).getTaxtype());
							modifycontent = modifycontent +",纳税类型";
						}
						if(provinceid != suppliers.get(0).getProvinceid()){
							suppliers.get(0).setProvinceid(provinceid);
							modifycontent = modifycontent +",省份";
						}
						if(cityid != suppliers.get(0).getCityid()){
							suppliers.get(0).setCityid(cityid);
							modifycontent = modifycontent +",城市";
						}
						suppliers.get(0).setAuditstatus(0);
						suppliers.get(0).setProvinceid(provinceid);
						suppliers.get(0).setCityid(cityid);
						
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
					}					
			        session.getTransaction().commit();											
			        result = mmessage.savesuccess;					
				}				
			}						
		}
		HibernateUtil_new.closeSession();
		return result;
	}
}
