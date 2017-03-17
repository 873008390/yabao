package com.mbusiness.service;

import java.util.List;

import com.mbusiness.dao.ProductListDAO;
import com.mbusiness.dao.ProductAddDAO;
import com.mbusiness.dao.ProductDeleteDAO;
import com.mbusiness.dao.ProductsynDAO;
import com.mbusiness.impl.ProductListImpl;
import com.mbusiness.impl.ProductAddImpl;
import com.mbusiness.impl.ProductDeleteImpl;
import com.mbusiness.impl.ProductsynImpl;
import com.mbusiness.model.Product;
import com.mbusiness.model.Usersession;

public class ProductService {

	private List<Product> products;
	private ProductListDAO productListDAO = new ProductListImpl();
	
	public List<Product> list(Usersession usersession, String idtype, String typeid, int start, int limit, int page) {
		// TODO Auto-generated method stub
		products = productListDAO.list(usersession, idtype, typeid, start, limit, page);
		return products;
	}

	private String result;
	private ProductAddDAO productAddDAO = new ProductAddImpl();
	
	public String add(Usersession usersession, Product product) {
		// TODO Auto-generated method stub
		result = productAddDAO.add(usersession, product);
		return result;
	}

	private ProductDeleteDAO productDeleteDAO = new ProductDeleteImpl();
	
	public String delete(Usersession usersession, int productid) {
		// TODO Auto-generated method stub
		result = productDeleteDAO.delete(usersession, productid);
		return result;
	}

	private ProductsynDAO productsynDAO = new ProductsynImpl();
	
	public String syn(Usersession usersession) {
		// TODO Auto-generated method stub
		result = productsynDAO.syn(usersession);
		return result;
	}

}
