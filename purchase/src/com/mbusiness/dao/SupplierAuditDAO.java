package com.mbusiness.dao;

import com.mbusiness.model.Supplier;
import com.mbusiness.model.Usersession;

public interface SupplierAuditDAO {

	public String audit(Usersession usersession, Supplier supplier,	String idtype);
}
