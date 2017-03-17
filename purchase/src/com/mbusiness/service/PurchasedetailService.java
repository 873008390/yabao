package com.mbusiness.service;

import java.util.List;

import com.mbusiness.dao.PurchasedetailListDAO;
import com.mbusiness.dao.PurchasedetailAddDAO;
import com.mbusiness.dao.PurchasedetailDeleteDAO;
import com.mbusiness.impl.PurchasedetailListImpl;
import com.mbusiness.impl.PurchasedetailAddImpl;
import com.mbusiness.impl.PurchasedetailDeleteImpl;
import com.mbusiness.model.Purchasedetail;
import com.mbusiness.model.Usersession;

public class PurchasedetailService {

	private List<Purchasedetail> purchasedetails;
	private PurchasedetailListDAO purchasedetailListDAO = new PurchasedetailListImpl();
	
	public List<Purchasedetail> list(Usersession usersession, String idtype, String typeid, int start, int limit, int page) {
		// TODO Auto-generated method stub
		purchasedetails = purchasedetailListDAO.list(usersession, idtype, typeid, start, limit, page);
		return purchasedetails;
	}

	private String result;
	private PurchasedetailAddDAO purchasedetailAddDAO = new PurchasedetailAddImpl();
	
	public String add(Usersession usersession, Purchasedetail purchasedetail) {
		// TODO Auto-generated method stub
		result = purchasedetailAddDAO.add(usersession, purchasedetail);
		return result;
	}

	private PurchasedetailDeleteDAO purchasedetailDeleteDAO = new PurchasedetailDeleteImpl();
	
	public String delete(Usersession usersession, int purchasedetailid) {
		// TODO Auto-generated method stub
		result = purchasedetailDeleteDAO.delete(usersession, purchasedetailid);
		return result;
	}

}
