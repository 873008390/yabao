package com.mbusiness.dao;

import java.util.List;

import com.mbusiness.model.Catalog;
import com.mbusiness.model.Usersession;

public interface CatalogListDAO {

	public List<Catalog> list(Usersession usersession, String type);	
}
