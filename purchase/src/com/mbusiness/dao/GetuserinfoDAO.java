package com.mbusiness.dao;

import java.util.List;

import com.mbusiness.model.Users;
import com.mbusiness.model.Usersession;

public interface GetuserinfoDAO {

	public List<Users> list(Usersession usersession);
}
