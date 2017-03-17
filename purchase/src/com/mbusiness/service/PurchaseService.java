package com.mbusiness.service;

import java.util.List;

import com.mbusiness.dao.PurchaseListDAO;
import com.mbusiness.dao.PurchaseAddDAO;
import com.mbusiness.dao.PurchaseDeleteDAO;
import com.mbusiness.dao.PurchaseonlineAddDAO;
import com.mbusiness.dao.PurchasesynDAO;
import com.mbusiness.impl.PurchaseListImpl;
import com.mbusiness.impl.PurchaseAddImpl;
import com.mbusiness.impl.PurchaseDeleteImpl;
import com.mbusiness.impl.PurchaseonlineAddImpl;
import com.mbusiness.impl.PurchasesynImpl;
import com.mbusiness.model.Purchase;
import com.mbusiness.model.Usersession;

public class PurchaseService {

	private List<Purchase> purchases;
	private PurchaseListDAO purchaseListDAO = new PurchaseListImpl();
	
	public List<Purchase> list(Usersession usersession, String idtype, String typeid, int start, int limit, int page) {
		// TODO Auto-generated method stub
		purchases = purchaseListDAO.list(usersession, idtype, typeid, start, limit, page);
		return purchases;
	}

	private String result;
	private PurchaseAddDAO purchaseAddDAO = new PurchaseAddImpl();
	
	public String add(Usersession usersession, Purchase purchase) {
		// TODO Auto-generated method stub
		result = purchaseAddDAO.add(usersession, purchase);
		return result;
	}

	private PurchaseDeleteDAO purchaseDeleteDAO = new PurchaseDeleteImpl();
	
	public String delete(Usersession usersession, int purchaseid) {
		// TODO Auto-generated method stub
		result = purchaseDeleteDAO.delete(usersession, purchaseid);
		return result;
	}

	private PurchaseonlineAddDAO purchaseonlineAddDAO = new PurchaseonlineAddImpl();
	
	public String onlineadd(Usersession usersession, Purchase purchase) {
		// TODO Auto-generated method stub
		result = purchaseonlineAddDAO.add(usersession, purchase);
		return result;
	}

	private PurchasesynDAO purchasesynDAO = new PurchasesynImpl();
	
	public String syn(Usersession usersession) {
		// TODO Auto-generated method stub
		result = purchasesynDAO.syn(usersession);
		return result;
	}

}
