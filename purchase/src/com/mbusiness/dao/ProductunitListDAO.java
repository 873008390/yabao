package com.mbusiness.dao;

import java.util.List;

import com.mbusiness.model.Productunit;
import com.mbusiness.model.Usersession;

public interface ProductunitListDAO {

	public List<Productunit> list(Usersession usersession, String idtype, String typeid, int start, int limit, int page);
}
