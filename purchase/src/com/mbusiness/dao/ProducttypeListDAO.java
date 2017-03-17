package com.mbusiness.dao;

import java.util.List;

import com.mbusiness.model.Producttype;
import com.mbusiness.model.Usersession;

public interface ProducttypeListDAO {

	public List<Producttype> list(Usersession usersession, String idtype, String typeid, int start, int limit, int page);
}
