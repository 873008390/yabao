package com.mbusiness.impl;

import java.text.SimpleDateFormat;
import java.util.List;

import org.hibernate.Session;

import com.mbusiness.dao.DepartmentDeleteDAO;
import com.mbusiness.model.Department;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Logging;
import com.mbusiness.util.MMessage;

public class DepartmentDeleteImpl implements DepartmentDeleteDAO {
	
	private String result;
	private Session session;
	private MMessage mmessage = new MMessage();
	private Logging logging = new Logging();
	private HasPermission hasPermission = new HasPermission();
	//private DepartmentCorporationid departmentCorporationid = new DepartmentCorporationid();
	private SimpleDateFormat sformat = new SimpleDateFormat("yyyy-MM-dd");
	@Override
	public String delete(Usersession usersession, int departmentid) {
		session = HibernateUtil_new.currentSession();
		session.beginTransaction();
		if(usersession.getUsername().equalsIgnoreCase("")){
			result = mmessage.notlogin;
		}else{
			int flag = 0;		
			if(hasPermission.hasPermission(usersession.getUsername(), "department", "deletedata", session) == 0){
				if(usersession.getUsername().equalsIgnoreCase("admin")){
					flag = 1;	
				}else{
					result = mmessage.nopermission;
				}
			}else{
				flag = 1;
			}
			if(flag == 1){
				List<Department> departments = session.createSQLQuery("select * from department where status=1 and id="+ departmentid).addEntity(Department.class).list();
				if(departments.isEmpty()){
					result = mmessage.departmentinvalid;
				}else{
					departments.get(0).setStatus(0);
			        session.getTransaction().commit();	
			        result = mmessage.deletesuccess;					
				}				
			}						
		}
		HibernateUtil_new.closeSession();
		return result;
	}
}
