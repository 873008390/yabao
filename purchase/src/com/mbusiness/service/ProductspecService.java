package com.mbusiness.service;

import java.util.List;

import com.mbusiness.dao.ProductspecListDAO;
import com.mbusiness.dao.ProductspecAddDAO;
import com.mbusiness.dao.ProductspecDeleteDAO;
import com.mbusiness.impl.ProductspecListImpl;
import com.mbusiness.impl.ProductspecAddImpl;
import com.mbusiness.impl.ProductspecDeleteImpl;
import com.mbusiness.model.Productspec;
import com.mbusiness.model.Usersession;

public class ProductspecService {

	private List<Productspec> productspecs;
	private ProductspecListDAO productspecListDAO = new ProductspecListImpl();
	
	public List<Productspec> list(Usersession usersession, String idspec, String specid, int start, int limit, int page) {
		// TODO Auto-generated method stub
		productspecs = productspecListDAO.list(usersession, idspec, specid, start, limit, page);
		return productspecs;
	}

	private String result;
	private ProductspecAddDAO productspecAddDAO = new ProductspecAddImpl();
	
	public String add(Usersession usersession, Productspec productspec) {
		// TODO Auto-generated method stub
		result = productspecAddDAO.add(usersession, productspec);
		return result;
	}

	private ProductspecDeleteDAO productspecDeleteDAO = new ProductspecDeleteImpl();
	
	public String delete(Usersession usersession, int productspecid) {
		// TODO Auto-generated method stub
		result = productspecDeleteDAO.delete(usersession, productspecid);
		return result;
	}

}
