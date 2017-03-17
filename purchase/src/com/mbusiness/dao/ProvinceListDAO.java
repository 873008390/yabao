package com.mbusiness.dao;

import java.util.List;

import com.mbusiness.model.Province;
import com.mbusiness.model.Usersession;

public interface ProvinceListDAO {

	public List<Province> list(Usersession usersession, String idtype, String typeid, int start, int limit, int page);
}
