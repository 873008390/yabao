package com.mbusiness.dao;

import java.util.List;

import com.mbusiness.model.Purchase;
import com.mbusiness.model.Usersession;

public interface PurchaseListDAO {

	public List<Purchase> list(Usersession usersession, String idtype, String typeid, int start, int limit, int page);
}
