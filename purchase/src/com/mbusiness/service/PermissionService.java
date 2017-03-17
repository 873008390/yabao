package com.mbusiness.service;

import java.util.List;

import com.mbusiness.dao.PermissionListDAO;
import com.mbusiness.dao.PermissionAddDAO;
import com.mbusiness.impl.PermissionListImpl;
import com.mbusiness.impl.PermissionAddImpl;
import com.mbusiness.model.Permission;
import com.mbusiness.model.Usersession;

public class PermissionService {

	private List<Permission> permissions;
	private PermissionListDAO permissionListDAO = new PermissionListImpl();
	
	public List<Permission> list(Usersession usersession, String idtype, String typeid) {
		// TODO Auto-generated method stub
		permissions = permissionListDAO.list(usersession, idtype, typeid);
		return permissions;
	}
	

	private String result;
	private PermissionAddDAO permissionAddDAO = new PermissionAddImpl();
	
	public String add(Usersession usersession, Permission permission) {
		// TODO Auto-generated method stub
		result = permissionAddDAO.add(usersession, permission);
		return result;
	}

}
