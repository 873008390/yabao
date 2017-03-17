package com.mbusiness.dao;

import java.util.List;

import com.mbusiness.model.Supplierfile;
import com.mbusiness.model.Usersession;

public interface SupplierfileListDAO {

	public List<Supplierfile> list(Usersession usersession,	String idtype, String typeid, int start, int limit, int page);
}
