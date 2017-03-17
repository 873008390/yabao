package com.mbusiness.service;

import java.util.List;

import com.mbusiness.dao.OrgAddDAO;
import com.mbusiness.dao.OrgDeleteDAO;
import com.mbusiness.dao.OrgListDAO;
import com.mbusiness.dao.OrgsynDAO;
import com.mbusiness.impl.OrgAddImpl;
import com.mbusiness.impl.OrgDeleteImpl;
import com.mbusiness.impl.OrgListImpl;
import com.mbusiness.impl.OrgsynImpl;
import com.mbusiness.model.Org;
import com.mbusiness.model.Usersession;

public class OrgService {

	private List<Org> orgs;
	private OrgListDAO orgListDAO = new OrgListImpl();
	
	public List<Org> list(Usersession usersession, String idtype, String typeid, int start, int limit, int page) {
		// TODO Auto-generated method stub
		orgs = orgListDAO.list(usersession, idtype, typeid, start, limit, page);
		return orgs;
	}

	private String result;
	private OrgAddDAO orgAddDAO = new OrgAddImpl();
	
	public String add(Usersession usersession, Org org) {
		// TODO Auto-generated method stub
		result = orgAddDAO.add(usersession, org);
		return result;
	}

	private OrgDeleteDAO orgDeleteDAO = new OrgDeleteImpl();
	
	public String delete(Usersession usersession, int orgid) {
		// TODO Auto-generated method stub
		result = orgDeleteDAO.delete(usersession, orgid);
		return result;
	}

	private OrgsynDAO orgsynDAO = new OrgsynImpl();
	
	public String syn(Usersession usersession) {
		// TODO Auto-generated method stub
		result = orgsynDAO.syn(usersession);
		return result;
	}

}
