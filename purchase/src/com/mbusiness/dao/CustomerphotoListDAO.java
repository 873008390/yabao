package com.mbusiness.dao;

import java.util.List;

import com.mbusiness.model.Customerphoto;
import com.mbusiness.model.Usersession;

public interface CustomerphotoListDAO {

	public List<Customerphoto> list(Usersession usersession,	String idtype, String typeid, int start, int limit, int page);
}
