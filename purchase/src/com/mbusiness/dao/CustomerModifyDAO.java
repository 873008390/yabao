package com.mbusiness.dao;

import com.mbusiness.model.Customer;
import com.mbusiness.model.Usersession;

public interface CustomerModifyDAO {

	public String modify(Usersession usersession, Customer customer, String idtype);
}
