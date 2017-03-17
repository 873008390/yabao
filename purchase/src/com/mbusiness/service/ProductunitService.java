package com.mbusiness.service;

import java.util.List;

import com.mbusiness.dao.ProductunitListDAO;
import com.mbusiness.dao.ProductunitAddDAO;
import com.mbusiness.dao.ProductunitDeleteDAO;
import com.mbusiness.impl.ProductunitListImpl;
import com.mbusiness.impl.ProductunitAddImpl;
import com.mbusiness.impl.ProductunitDeleteImpl;
import com.mbusiness.model.Productunit;
import com.mbusiness.model.Usersession;

public class ProductunitService {

	private List<Productunit> productunits;
	private ProductunitListDAO productunitListDAO = new ProductunitListImpl();
	
	public List<Productunit> list(Usersession usersession, String idtype, String typeid, int start, int limit, int page) {
		// TODO Auto-generated method stub
		productunits = productunitListDAO.list(usersession, idtype, typeid, start, limit, page);
		return productunits;
	}

	private String result;
	private ProductunitAddDAO productunitAddDAO = new ProductunitAddImpl();
	
	public String add(Usersession usersession, Productunit productunit) {
		// TODO Auto-generated method stub
		result = productunitAddDAO.add(usersession, productunit);
		return result;
	}

	private ProductunitDeleteDAO productunitDeleteDAO = new ProductunitDeleteImpl();
	
	public String delete(Usersession usersession, int productunitid) {
		// TODO Auto-generated method stub
		result = productunitDeleteDAO.delete(usersession, productunitid);
		return result;
	}

}
