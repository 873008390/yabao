package com.mbusiness.service;

import java.util.List;

import com.mbusiness.dao.AuditgroupListDAO;
import com.mbusiness.dao.AuditgroupAddDAO;
import com.mbusiness.dao.AuditgroupDeleteDAO;
import com.mbusiness.impl.AuditgroupListImpl;
import com.mbusiness.impl.AuditgroupAddImpl;
import com.mbusiness.impl.AuditgroupDeleteImpl;
import com.mbusiness.model.Auditgroup;
import com.mbusiness.model.Usersession;

public class AuditgroupService {

	private List<Auditgroup> auditgroups;
	private AuditgroupListDAO auditgroupListDAO = new AuditgroupListImpl();
	
	public List<Auditgroup> list(Usersession usersession, String idtype, String typeid, int start, int limit, int page) {
		// TODO Auto-generated method stub
		auditgroups = auditgroupListDAO.list(usersession, idtype, typeid, start, limit, page);
		return auditgroups;
	}

	private String result;
	private AuditgroupAddDAO auditgroupAddDAO = new AuditgroupAddImpl();
	
	public String add(Usersession usersession, Auditgroup auditgroup) {
		// TODO Auto-generated method stub
		result = auditgroupAddDAO.add(usersession, auditgroup);
		return result;
	}

	private AuditgroupDeleteDAO auditgroupDeleteDAO = new AuditgroupDeleteImpl();
	
	public String delete(Usersession usersession, int auditgroupid) {
		// TODO Auto-generated method stub
		result = auditgroupDeleteDAO.delete(usersession, auditgroupid);
		return result;
	}

}
