package com.mbusiness.service;

import java.util.List;

import com.mbusiness.dao.CatalogListDAO;
import com.mbusiness.impl.CatalogListImpl;
import com.mbusiness.model.Catalog;
import com.mbusiness.model.Usersession;

public class CatalogService {

	private CatalogListDAO catalogListDAO = new CatalogListImpl();	
	private List<Catalog> catalogs;
	
	public List<Catalog> list(Usersession usersession, String type){
		catalogs = catalogListDAO.list(usersession, type);
		return catalogs;
	}
	
}
