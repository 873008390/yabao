package com.mbusiness.impl;

import java.util.Date;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;

import com.mbusiness.dao.SupplierAuditDAO;
import com.mbusiness.model.Auditlog;
import com.mbusiness.model.Supplier;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.CommonJudgeDB;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.MMessage;

public class SupplierAuditImpl implements SupplierAuditDAO {
	
	private String titleValid;
	private String result = "";
	private Session session;
	private MMessage mmessage = new MMessage();
	@Override
	public String audit(Usersession usersession, Supplier supplier, String idtype) {
		//iFlag=0 mysql; iFlag=1 sqlserver
		int iFlag = CommonJudgeDB.judgeDB();
		HibernateUtil_new.closeSession();
		session = HibernateUtil_new.currentSession();
		session.beginTransaction();
		if(usersession.getUsername().equalsIgnoreCase("")){
			result = mmessage.notlogin;
		}else{
			int orgid = 0;
			int userid = 0;
			List<Object[]> o0 = session.createSQLQuery("select orgid,id from users where status=1 and account='"+ usersession.getUsername() +"'").list();
			if(o0.isEmpty()){
				result = mmessage.notlogin;
			}else {
				orgid = Integer.parseInt(o0.get(0)[0].toString());
				userid = Integer.parseInt(o0.get(0)[1].toString());
				//确定该供应商非已审核
				List<Object> o00 = session.createSQLQuery("select auditstatus from supplier where auditstatus<>1 and status=1 and id="+ supplier.getId() +" and orgid="+ orgid).list();
				if(o00.isEmpty()){
					result = mmessage.audited;
				}else{
					int nextauditgroupid = 0;
					//确定当前审核环节
					if(Integer.parseInt(o00.get(0).toString()) == 0){
						List<Object> o1;
						if(iFlag == 0){
							o1 = session.createSQLQuery("select id from auditgroup where status=1 and orgid="+ orgid +" order by orderid,id limit 0,1").list();
						}else{
							o1 = session.createSQLQuery("select top 1 L.id from(select ROW_NUMBER() over( order by orderid,id) as rownumber,M.* from(" +
									"select id,orderid from auditgroup where status=1 and orgid="+ orgid +") M) L where L.rownumber>0").list();
						}
						
						if(o1.isEmpty()){
							result = mmessage.noaudits;
						}else{
							nextauditgroupid = Integer.parseInt(o1.get(0).toString());
						}
					}else{
						List<Object> o;
						if(iFlag == 0){
							o = session.createSQLQuery("select auditgroupid from auditlog where status=1 and supplierid="+ supplier.getId() +" and auditgroupid in (select id from auditgroup where status=1 and orgid="+ orgid +") order by -id limit 0,1").list();
						}else{
							o = session.createSQLQuery("select top 1 L.auditgroupid from(select ROW_NUMBER() over( order by id desc) as rownumber,M.* from(" +
									"select id,auditgroupid from auditlog where status=1 and supplierid="+ supplier.getId() +" and auditgroupid in (select id from auditgroup where status=1 and orgid="+ orgid +")) M) L where L.rownumber>0").list();
						}
						
						if(o.isEmpty()){
							List<Object> o1;
							if(iFlag == 0){
								o1 = session.createSQLQuery("select id from auditgroup where status=1 and orgid="+ orgid +" order by orderid,id limit 0,1").list();
							}else{
								o1 = session.createSQLQuery("select top 1 L.id from(select ROW_NUMBER() over( order by orderid,id) as rownumber,M.* from(" +
										"select orderid,id from auditgroup where status=1 and orgid="+ orgid +") M) L where L.rownumber>0").list();
							}
							
							if(o1.isEmpty()){
								result = mmessage.noaudits;
							}else{
								nextauditgroupid = Integer.parseInt(o1.get(0).toString());
							}
						}else{
							List<Object> o1 = session.createSQLQuery("select id from auditgroup where status=1 and orgid="+ orgid +" order by orderid,id").list();
							if(o1.isEmpty()){
								result = mmessage.noaudits;
							}else{
								for(int i=0;i<o1.size();i++){
									if(Integer.parseInt(o1.get(i).toString()) == Integer.parseInt(o.get(0).toString())){
										if(i<o1.size()-1){
											nextauditgroupid = Integer.parseInt(o1.get(i+1).toString());
										}else{
											result = mmessage.auditgroupinvalid +"[err=1]";
										}
										break;
									}else{
										result = mmessage.auditgroupinvalid +"[err=2]";
									}
								}							
							}
						}
					}
					if(nextauditgroupid > 0){
						//确定当前账号在本审核环节
						Query q1 = session.createSQLQuery("select id from auditgroupuser where status=1 and userid="+ userid +" and mainid="+ nextauditgroupid);
						if(q1.list().isEmpty()){
							result = mmessage.audituserinvalid;
						}else{
							//审核不通过
							if(supplier.getZdy3().equalsIgnoreCase("拒绝")){
								Query q2 = session.createSQLQuery("update supplier set auditstatus=0 where id="+ supplier.getId());
								q2.executeUpdate();
								
								Auditlog al = new Auditlog();
								al.setCreatedate(new Date());
								al.setAuditgroupid(nextauditgroupid);
								al.setMemo(supplier.getZdy2());
								al.setOperation(supplier.getZdy3());
								al.setStatus(1);
								al.setSupplierid(supplier.getId());
								al.setUserid(userid);
								session.save(al);
								session.getTransaction().commit();
								result = mmessage.auditsuccess;
							}else{
								//确定下一个审核环节
								List<Object> o1 = session.createSQLQuery("select id from auditgroup where status=1 and orgid="+ orgid +" order by orderid,id").list();
								if(!o1.isEmpty()){
									for(int i=0;i<o1.size();i++){
										if(Integer.parseInt(o1.get(i).toString()) == nextauditgroupid){
											//存在下一个审核环节
											if(i<o1.size()-1){
												Query q2 = session.createSQLQuery("update supplier set auditstatus=2 where id="+ supplier.getId());
												q2.executeUpdate();
												
												Auditlog al = new Auditlog();
												al.setCreatedate(new Date());
												al.setAuditgroupid(nextauditgroupid);
												al.setMemo(supplier.getZdy2());
												al.setOperation(supplier.getZdy3());
												al.setStatus(1);
												al.setSupplierid(supplier.getId());
												al.setUserid(userid);
												session.save(al);
												session.getTransaction().commit();
												result = mmessage.auditsuccess;
											}else{//已到审核终点
												Query q2 = session.createSQLQuery("update supplier set auditstatus=1 where id="+ supplier.getId());
												q2.executeUpdate();
												
												Auditlog al = new Auditlog();
												al.setCreatedate(new Date());
												al.setAuditgroupid(nextauditgroupid);
												al.setMemo(supplier.getZdy2());
												al.setOperation(supplier.getZdy3());
												al.setStatus(1);
												al.setSupplierid(supplier.getId());
												al.setUserid(userid);
												session.save(al);
												session.getTransaction().commit();
												result = mmessage.auditsuccess;
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		HibernateUtil_new.closeSession();
		return result;
	}
}
