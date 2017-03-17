package com.mbusiness.service;

import java.util.List;

import com.mbusiness.dao.ProducttypeListDAO;
import com.mbusiness.dao.ProducttypeAddDAO;
import com.mbusiness.dao.ProducttypeDeleteDAO;
import com.mbusiness.impl.ProducttypeListImpl;
import com.mbusiness.impl.ProducttypeAddImpl;
import com.mbusiness.impl.ProducttypeDeleteImpl;
import com.mbusiness.model.Producttype;
import com.mbusiness.model.Usersession;

public class ProducttypeService {

	private List<Producttype> producttypes;
	private ProducttypeListDAO producttypeListDAO = new ProducttypeListImpl();
	
	public List<Producttype> list(Usersession usersession, String idtype, String typeid, int start, int limit, int page) {
		// TODO Auto-generated method stub
		producttypes = producttypeListDAO.list(usersession, idtype, typeid, start, limit, page);
		return producttypes;
	}

	private String result;
	private ProducttypeAddDAO producttypeAddDAO = new ProducttypeAddImpl();
	
	public String add(Usersession usersession, Producttype producttype) {
		// TODO Auto-generated method stub
		result = producttypeAddDAO.add(usersession, producttype);
		return result;
	}

	private ProducttypeDeleteDAO producttypeDeleteDAO = new ProducttypeDeleteImpl();
	
	public String delete(Usersession usersession, int producttypeid) {
		// TODO Auto-generated method stub
		result = producttypeDeleteDAO.delete(usersession, producttypeid);
		return result;
	}

}
