package com.mbusiness.dao;

import com.mbusiness.model.Supplier;
import com.mbusiness.model.Usersession;

public interface SupplierModifyDAO {

	public String modify(Usersession usersession, Supplier supplier, String idtype);
}
