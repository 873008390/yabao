package com.mbusiness.dao;

import java.util.List;

import com.mbusiness.model.Keyvalue;
import com.mbusiness.model.Usersession;

public interface KeyvalueListDAO {

	public List<Keyvalue> list(Usersession usersession, int type);
}
