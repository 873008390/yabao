package com.mbusiness.dao;

import com.mbusiness.model.Product;
import com.mbusiness.model.Usersession;

public interface ProductAddDAO {

	public String add(Usersession usersession, Product product);
}
