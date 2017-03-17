package com.mbusiness.impl;

import java.util.List;

import org.hibernate.Session;

import com.mbusiness.util.CommonJudgeDB;

public class ListMyAuditingSupplier {

	private String supplierids = "";
	private String statement;
	private String msql;
	private String ssql;
	public String list(Session session, String account){
		//iFlag=0 mysql; iFlag=1 sqlserver
		int iFlag = CommonJudgeDB.judgeDB();
		int userid = 0;
		int orgid = 0;
		List<Object[]> o = session.createSQLQuery("select id,orgid from users where status=1 and account='"+ account +"'").list();
		if(!o.isEmpty()){
			userid = Integer.parseInt(o.get(0)[0].toString());
			orgid = Integer.parseInt(o.get(0)[1].toString());
			String auditgroupids = "";
			List<Object[]> o1 = session.createSQLQuery("select a.mainid,b.orgid from auditgroupuser a,auditgroup b where a.mainid=b.id and a.status=1 and a.userid="+ userid).list();
			if(!o1.isEmpty()){
				for(int i=0;i<o1.size();i++){
					msql = "select id from auditgroup where status=1 and orderid <(select orderid from auditgroup where id="+ o1.get(i)[0].toString() +" and orgid="+ o1.get(i)[1].toString() +") and orgid="+ o1.get(i)[1].toString() +" order by -orderid limit 0,1";
					
					ssql = "select top 1 L.id from(select ROW_NUMBER() over(order by M.orderid desc) as rownumber,M.* from(" +
							"select id,orderid from auditgroup where status=1 and orderid <(select orderid from auditgroup where id="+ o1.get(i)[0].toString() +" and orgid="+ o1.get(i)[1].toString() +") and orgid="+ o1.get(i)[1].toString() +") M) L where L.rownumber>0";
					if(iFlag == 0){
						statement = msql;
					}else{
						statement = ssql;
					}
					List<Object> o2 = session.createSQLQuery(statement).list();
					if(o2.isEmpty()){//第一个审核环节
						List<Object> o3 = session.createSQLQuery("select id from supplier where status=1 and orgid="+ orgid +" and auditstatus=0").list();
						if(!o3.isEmpty()){
							for(int j=0;j<o3.size();j++){
								if(supplierids.equalsIgnoreCase("")){
									supplierids = o3.get(j).toString();
								}else{
									supplierids = supplierids +","+ o3.get(j).toString();
								}
							}
						}
					}else{
						List<Object> o3 = session.createSQLQuery("select supplierid from auditlog where status=1 and operation='同意' and auditgroupid="+ o2.get(0).toString()).list();
						if(!o3.isEmpty()){
							for(int j=0;j<o3.size();j++){
								if(supplierids.equalsIgnoreCase("")){
									supplierids = o3.get(j).toString();
								}else{
									supplierids = supplierids +","+ o3.get(j).toString();
								}
							}
						}
					}
				}
			}
		}
		if(supplierids.equalsIgnoreCase("")){
			supplierids = "0";
		}
		return supplierids;
	}
}
