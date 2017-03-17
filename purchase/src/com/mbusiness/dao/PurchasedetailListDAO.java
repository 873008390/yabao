package com.mbusiness.dao;

import java.util.List;

import com.mbusiness.model.Purchasedetail;
import com.mbusiness.model.Usersession;

public interface PurchasedetailListDAO {

	public List<Purchasedetail> list(Usersession usersession, String idtype, String typeid, int start, int limit, int page);
}
