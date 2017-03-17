package com.mbusiness.dao;

import com.mbusiness.model.Permission;
import com.mbusiness.model.Usersession;

public interface PermissionAddDAO {

	public String add(Usersession usersession, Permission permission);
}
