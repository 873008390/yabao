package com.mbusiness.impl;


import java.util.List;

import org.hibernate.Session;

import com.mbusiness.dao.DepartmentsynDAO;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.GetK3CloudData;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.MMessage;

public class DepartmentsynImpl implements DepartmentsynDAO {
	private Session session;
	private String result = "";
	private MMessage mmessage = new MMessage();
	private HasPermission hasPermission = new HasPermission();
	@Override
	public String syn(Usersession usersession) {
		session = HibernateUtil_new.currentSession();
		
		if(usersession.getUsername().equalsIgnoreCase("")){
			result = mmessage.notlogin;
		}else{
			int flag = 0;		
			if(hasPermission.hasPermission(usersession.getUsername(), "department", "uploaddata", session) == 0){
				if(usersession.getUsername().equalsIgnoreCase("admin")){
					flag = 1;	
				}else{
					result = mmessage.nopermission;
				}
			}else{
				flag = 1;
			}
			if(flag == 1){	
				
				List<Object> status = session.createSQLQuery("select status from issyn where tname='org'").list();
				if(status.isEmpty()){
					result = mmessage.notsyn;
				}else if(Integer.parseInt(status.get(0).toString()) == 1){
					new Thread(new task()).start();
					result = mmessage.synsuccess;
				}else if(Integer.parseInt(status.get(0).toString()) == 0){
					result = mmessage.notsyn;
				}
			}
		}
		HibernateUtil_new.closeSession();
		return result;
	}
	public class task implements Runnable{
		@Override
		public void run() {
			GetK3CloudData.queryDepartment(session);
		}
		
	}
}
