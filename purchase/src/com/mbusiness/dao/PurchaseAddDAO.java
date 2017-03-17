package com.mbusiness.dao;

import com.mbusiness.model.Purchase;
import com.mbusiness.model.Usersession;

public interface PurchaseAddDAO {

	public String add(Usersession usersession, Purchase purchase);
}
