package com.mbusiness.dao;

import com.mbusiness.model.Usersession;

public interface UserchangeauditstatusDAO {

	public String change(Usersession usersession, int userid);
}
