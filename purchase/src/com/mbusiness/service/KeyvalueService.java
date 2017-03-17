package com.mbusiness.service;

import java.util.List;

import com.mbusiness.dao.KeyvalueListDAO;
import com.mbusiness.impl.KeyvalueListImpl;
import com.mbusiness.model.Keyvalue;
import com.mbusiness.model.Usersession;

public class KeyvalueService {

	private List<Keyvalue> keyvalues;
	private KeyvalueListDAO keyvalueListDAO = new KeyvalueListImpl();
	
	public List<Keyvalue> list(Usersession usersession, int type) {
		// TODO Auto-generated method stub
		keyvalues = keyvalueListDAO.list(usersession, type);
		return keyvalues;
	}

}
