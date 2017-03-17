package com.mbusiness.service;

import java.util.List;

import com.mbusiness.dao.AuditlogListDAO;
import com.mbusiness.impl.AuditlogListImpl;
import com.mbusiness.model.Auditlog;
import com.mbusiness.model.Usersession;

public class AuditlogService {

	private List<Auditlog> auditlogs;
	private AuditlogListDAO auditlogListDAO = new AuditlogListImpl();
	
	public List<Auditlog> list(Usersession usersession, String idtype, String typeid, int start, int limit, int page) {
		// TODO Auto-generated method stub
		auditlogs = auditlogListDAO.list(usersession, idtype, typeid, start, limit, page);
		return auditlogs;
	}

}
