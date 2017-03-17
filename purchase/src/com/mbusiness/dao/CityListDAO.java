package com.mbusiness.dao;

import java.util.List;

import com.mbusiness.model.City;
import com.mbusiness.model.Usersession;

public interface CityListDAO {

	public List<City> list(Usersession usersession, String idtype, String typeid, int start, int limit, int page);
}
