package com.mbusiness.impl;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.Date;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.mbusiness.dao.DepartmentAddDAO;
import com.mbusiness.model.Department;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Logging;
import com.mbusiness.util.MMessage;

public class DepartmentAddImpl implements DepartmentAddDAO {
	
	private String titleValid;
	private String result;
	private Session session;
	private MMessage mmessage = new MMessage();
	private Logging logging = new Logging();
	private HasPermission hasPermission = new HasPermission();
	@Override
	public String add(Usersession usersession, Department department) {
		session = HibernateUtil_new.currentSession();
		session.beginTransaction();
		if(usersession.getUsername().equalsIgnoreCase("")){
			result = mmessage.notlogin;
		}else{
			int flag = 0;		
			if(hasPermission.hasPermission(usersession.getUsername(), "department", "adddata", session) == 0){
				if(usersession.getUsername().equalsIgnoreCase("admin")){
					flag = 1;	
				}else{
					result = mmessage.nopermission;
				}
			}else{
				flag = 1;
			}
			if(flag == 1){			
				String details = department.getZdy10();
				
				department.setZdy10("");
				//System.out.println("========"+details);
				
				Gson gson = new Gson();
				List<Department> ps = gson.fromJson("["+ details +"]", new TypeToken<List<Department>>(){}.getType());
				Department s;
				//System.out.println("========"+details);
				for(int i=0;i<ps.size();i++){
					HibernateUtil_new.closeSession();
					session = HibernateUtil_new.currentSession();
					session.beginTransaction();
					int upperid = 0;
					int orgid = 0;
					int manageruserid = 0;
					if(ps.get(i).getZdy2() != null && !ps.get(i).getZdy2().equalsIgnoreCase("")){
						List<Object[]> o = session.createSQLQuery("select id,orgid from department where status=1 and name='"+ ps.get(i).getZdy2()+"'").list();
						if(o.isEmpty()){
							result = mmessage.upperdepartmentinvalid;
							break;
						}else{
							upperid = Integer.parseInt(o.get(0)[0].toString());
						}
					}else{
						List<Object> o = session.createSQLQuery("select id from org where status=1 and name='"+ ps.get(i).getZdy4()+"'").list();
						if(o.isEmpty()){
							result = mmessage.orginvalid;
							break;
						}else{
							orgid = Integer.parseInt(o.get(0).toString());
						}
					}
					if(ps.get(0).getZdy3() != null && !ps.get(0).getZdy3().equalsIgnoreCase("")){
						List<Object> o = session.createSQLQuery("select id from users where status=1 and name='"+ ps.get(i).getZdy3()+"'").list();
						if(o.isEmpty()){
							result = mmessage.userinvalid;
							break;
						}else{
							manageruserid = Integer.parseInt(o.get(0).toString());
						}
					}
					if(ps.get(i).getId() == 0){
						Query q = session.createSQLQuery("select id from department where status=1 and orgid="+ orgid +" and name='"+ ps.get(i).getName() +"' and upperid="+ upperid +" and orgid="+ orgid);
						if(q.list().isEmpty()){
							s = new Department();
							s.setCreatedate(new Date());
							try {
								s.setName(URLDecoder.decode(ps.get(i).getName(),"UTF-8"));
								s.setZdy10(URLDecoder.decode(ps.get(i).getZdy10(),"UTF-8"));
							} catch (UnsupportedEncodingException e) {
								e.printStackTrace();
							}
							s.setUpperid(upperid);
							s.setOrgid(orgid);
							s.setManageruserid(manageruserid);
							s.setStatus(1);
							
							session.save(s);
						}else{
							result = mmessage.dataduplicate;
							break;
						}
					}else{
						List<Department> departments = session.createSQLQuery("select * from department where status=1 and id="+ ps.get(i).getId()).addEntity(Department.class).list();
						if(departments.isEmpty()){
							result = mmessage.datachange;
							break;
						}else{
							/*try {
								departments.get(0).setName(URLDecoder.decode(ps.get(i).getName(),"UTF-8"));
								departments.get(0).setZdy10(URLDecoder.decode(ps.get(i).getZdy10(),"UTF-8"));
							} catch (UnsupportedEncodingException e) {
								e.printStackTrace();
							}*/
							departments.get(0).setName(ps.get(i).getName());
							departments.get(0).setZdy10(ps.get(i).getZdy10());
							departments.get(0).setUpperid(upperid);
							departments.get(0).setOrgid(orgid);
							departments.get(0).setManageruserid(manageruserid);
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
