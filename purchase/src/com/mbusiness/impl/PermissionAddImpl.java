package com.mbusiness.impl;

import java.util.List;

import org.hibernate.Session;
import org.springframework.web.context.request.SessionScope;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.mbusiness.dao.PermissionAddDAO;
import com.mbusiness.model.Permission;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Logging;
import com.mbusiness.util.MMessage;

public class PermissionAddImpl implements PermissionAddDAO {
	
	private String titleValid;
	private String result;
	private Session session;
	private MMessage mmessage = new MMessage();
	private Logging logging = new Logging();
	private HasPermission hasPermission = new HasPermission();
	//private PermissionCorporationid permissionCorporationid = new PermissionCorporationid();
	@Override
	public String add(Usersession usersession, Permission permission) {
		session = HibernateUtil_new.currentSession();
		session.beginTransaction();
		if(usersession.getUsername().equalsIgnoreCase("")){
			result = mmessage.notlogin;
		}else{
			int flag = 0;		
			if(hasPermission.hasPermission(usersession.getUsername(), "permission", "adddata", session) == 0){
				if(usersession.getUsername().equalsIgnoreCase("admin")){
					flag = 1;	
				}else{
					result = mmessage.nopermission;
				}
			}else{
				flag = 1;
			}
			if(flag == 1){			
				String details = permission.getZdy10();
				
				permission.setZdy10("");
				//System.out.println("========"+details);
				
				Gson gson = new Gson();
				List<Permission> ps = gson.fromJson("["+ details +"]", new TypeToken<List<Permission>>(){}.getType());
				Permission s;
				//System.out.println("========"+details);
				for(int i=0;i<ps.size();i++){
					if(ps.get(i).getStatus() == 1){
						HibernateUtil_new.closeSession();
						session = HibernateUtil_new.currentSession();
						session.beginTransaction();
						int userid=0;
						String pname = ps.get(i).getPermission();
						List<Object> o = session.createSQLQuery("select id from users where status=1 and name='"+ ps.get(i).getZdy2() +"'").list();
						if(!o.isEmpty()){
							userid = Integer.parseInt(o.get(0).toString());
						}
//						List<Object> o1 = session.createSQLQuery("select shortname from catalog where status=1 and name='"+ ps.get(i).getZdy3() +"'").list();
//						if(!o1.isEmpty()){
//							pname = o1.get(0).toString();
//						}
						List<Permission> permissions = session.createSQLQuery("select * from permission where status=1 and userid="+ userid +" and permission='"+ pname +"'").addEntity(Permission.class).list();
						if(permissions.isEmpty()){
							s = new Permission();
							s.setUserid(userid);
							s.setPermission(pname);
							s.setStatus(ps.get(i).getStatus());
							s.setAdddata(ps.get(i).getAdddata());
							s.setDeletedata(ps.get(i).getDeletedata());
							s.setModifydata(ps.get(i).getModifydata());
							s.setSearchdata(ps.get(i).getSearchdata());
							s.setUploaddata(ps.get(i).getUploaddata());
							s.setType(ps.get(i).getType());						
							session.save(s);
						}else{
							permissions.get(0).setUserid(userid);
							permissions.get(0).setPermission(pname);
							permissions.get(0).setStatus(ps.get(i).getStatus());
							permissions.get(0).setAdddata(ps.get(i).getAdddata());
							permissions.get(0).setDeletedata(ps.get(i).getDeletedata());
							permissions.get(0).setModifydata(ps.get(i).getModifydata());
							permissions.get(0).setSearchdata(ps.get(i).getSearchdata());
							permissions.get(0).setUploaddata(ps.get(i).getUploaddata());
						}					
				        session.getTransaction().commit();	
				        result = mmessage.savesuccess;	
					}
				}				
			}						
		}
		HibernateUtil_new.closeSession();
		return result;
	}
}
