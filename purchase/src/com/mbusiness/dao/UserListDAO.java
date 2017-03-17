package com.mbusiness.dao;

import java.util.List;

import com.mbusiness.model.Users;
import com.mbusiness.model.Usersession;

public interface UserListDAO {

	public List<Users> list(Usersession usersession, String idtype, String typeid, int start, int limit, int page);
}
