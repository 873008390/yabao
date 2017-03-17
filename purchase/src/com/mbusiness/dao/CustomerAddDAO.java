package com.mbusiness.dao;

import com.mbusiness.model.Customer;
import com.mbusiness.model.Usersession;

public interface CustomerAddDAO {

	public String add(Usersession usersession, Customer customer);
}
