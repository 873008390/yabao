package com.mbusiness.dao;

import java.util.List;

import com.mbusiness.model.Supplier;
import com.mbusiness.model.Usersession;

public interface SupplierListDAO {

	public List<Supplier> list(Usersession usersession, String idtype, String typeid, int start, int limit, int page);
}
