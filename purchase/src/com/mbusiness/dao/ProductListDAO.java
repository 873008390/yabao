package com.mbusiness.dao;

import java.util.List;

import com.mbusiness.model.Product;
import com.mbusiness.model.Usersession;

public interface ProductListDAO {

	public List<Product> list(Usersession usersession, String idtype, String typeid, int start, int limit, int page);
}
