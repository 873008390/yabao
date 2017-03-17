package com.mbusiness.service;

import java.util.List;

import com.mbusiness.dao.TownAddDAO;
import com.mbusiness.dao.TownDeleteDAO;
import com.mbusiness.dao.TownListDAO;
import com.mbusiness.impl.TownAddImpl;
import com.mbusiness.impl.TownDeleteImpl;
import com.mbusiness.impl.TownListImpl;
import com.mbusiness.model.Town;
import com.mbusiness.model.Usersession;

public class TownService {

	private List<Town> towns;
	private TownListDAO townListDAO = new TownListImpl();
	
	public List<Town> list(Usersession usersession, String idtype, String typeid, int start, int limit, int page) {
		// TODO Auto-generated method stub
		towns = townListDAO.list(usersession, idtype, typeid, start, limit, page);
		return towns;
	}

	private String result;
	private TownAddDAO townAddDAO = new TownAddImpl();
	
	public String add(Usersession usersession, Town town) {
		// TODO Auto-generated method stub
		result = townAddDAO.add(usersession, town);
		return result;
	}

	private TownDeleteDAO townDeleteDAO = new TownDeleteImpl();
	
	public String delete(Usersession usersession, int townid) {
		// TODO Auto-generated method stub
		result = townDeleteDAO.delete(usersession, townid);
		return result;
	}

}
