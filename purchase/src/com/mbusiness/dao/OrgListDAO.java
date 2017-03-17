package com.mbusiness.dao;

import java.util.List;

import com.mbusiness.model.Org;
import com.mbusiness.model.Usersession;

public interface OrgListDAO {

	public List<Org> list(Usersession usersession, String idtype, String typeid, int start, int limit, int page);
}
