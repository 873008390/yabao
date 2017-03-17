package com.mbusiness.dao;

import java.util.List;

import com.mbusiness.model.Productspec;
import com.mbusiness.model.Usersession;

public interface ProductspecListDAO {

	public List<Productspec> list(Usersession usersession, String idspec, String specid, int start, int limit, int page);
}
