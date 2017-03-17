package com.mbusiness.dao;

import java.util.List;

import com.mbusiness.model.Permission;
import com.mbusiness.model.Usersession;

public interface PermissionListDAO {

	public List<Permission> list(Usersession usersession, String idtype, String typeid);
}
