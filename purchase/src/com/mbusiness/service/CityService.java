package com.mbusiness.service;

import java.util.List;

import com.mbusiness.dao.CityListDAO;
import com.mbusiness.dao.CityAddDAO;
import com.mbusiness.dao.CityDeleteDAO;
import com.mbusiness.impl.CityListImpl;
import com.mbusiness.impl.CityAddImpl;
import com.mbusiness.impl.CityDeleteImpl;
import com.mbusiness.model.City;
import com.mbusiness.model.Usersession;

public class CityService {

	private List<City> citys;
	private CityListDAO cityListDAO = new CityListImpl();
	
	public List<City> list(Usersession usersession, String idtype, String typeid, int start, int limit, int page) {
		// TODO Auto-generated method stub
		citys = cityListDAO.list(usersession, idtype, typeid, start, limit, page);
		return citys;
	}

	private String result;
	private CityAddDAO cityAddDAO = new CityAddImpl();
	
	public String add(Usersession usersession, City city) {
		// TODO Auto-generated method stub
		result = cityAddDAO.add(usersession, city);
		return result;
	}

	private CityDeleteDAO cityDeleteDAO = new CityDeleteImpl();
	
	public String delete(Usersession usersession, int cityid) {
		// TODO Auto-generated method stub
		result = cityDeleteDAO.delete(usersession, cityid);
		return result;
	}

}
