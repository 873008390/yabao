package com.mbusiness.dao;

import java.util.List;

import com.mbusiness.model.Customer;
import com.mbusiness.model.Usersession;

public interface CustomerListDAO {

	public List<Customer> list(Usersession usersession, String idtype, String typeid, int start, int limit, int page);
}
