package com.mbusiness.service;

import java.util.List;

import com.mbusiness.dao.ProvinceAddDAO;
import com.mbusiness.dao.ProvinceDeleteDAO;
import com.mbusiness.dao.ProvinceListDAO;
import com.mbusiness.impl.ProvinceAddImpl;
import com.mbusiness.impl.ProvinceDeleteImpl;
import com.mbusiness.impl.ProvinceListImpl;
import com.mbusiness.model.Province;
import com.mbusiness.model.Usersession;

public class ProvinceService {

	private List<Province> provinces;
	private ProvinceListDAO provinceListDAO = new ProvinceListImpl();
	
	public List<Province> list(Usersession usersession, String idtype, String typeid, int start, int limit, int page) {
		// TODO Auto-generated method stub
		provinces = provinceListDAO.list(usersession, idtype, typeid, start, limit, page);
		return provinces;
	}

	private String result;
	private ProvinceAddDAO provinceAddDAO = new ProvinceAddImpl();
	
	public String add(Usersession usersession, Province province) {
		// TODO Auto-generated method stub
		result = provinceAddDAO.add(usersession, province);
		return result;
	}

	private ProvinceDeleteDAO provinceDeleteDAO = new ProvinceDeleteImpl();
	
	public String delete(Usersession usersession, int provinceid) {
		// TODO Auto-generated method stub
		result = provinceDeleteDAO.delete(usersession, provinceid);
		return result;
	}

}
