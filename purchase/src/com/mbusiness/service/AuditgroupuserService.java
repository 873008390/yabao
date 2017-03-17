package com.mbusiness.service;

import java.util.List;

import com.mbusiness.dao.AuditgroupuserListDAO;
import com.mbusiness.dao.AuditgroupuserAddDAO;
import com.mbusiness.dao.AuditgroupuserDeleteDAO;
import com.mbusiness.impl.AuditgroupuserListImpl;
import com.mbusiness.impl.AuditgroupuserAddImpl;
import com.mbusiness.impl.AuditgroupuserDeleteImpl;
import com.mbusiness.model.Auditgroupuser;
import com.mbusiness.model.Usersession;

public class AuditgroupuserService {

	private List<Auditgroupuser> auditgroupusers;
	private AuditgroupuserListDAO auditgroupuserListDAO = new AuditgroupuserListImpl();
	
	public List<Auditgroupuser> list(Usersession usersession, String idtype, String typeid, int start, int limit, int page) {
		// TODO Auto-generated method stub
		auditgroupusers = auditgroupuserListDAO.list(usersession, idtype, typeid, start, limit, page);
		return auditgroupusers;
	}

	private String result;
	private AuditgroupuserAddDAO auditgroupuserAddDAO = new AuditgroupuserAddImpl();
	
	public String add(Usersession usersession, Auditgroupuser auditgroupuser) {
		// TODO Auto-generated method stub
		result = auditgroupuserAddDAO.add(usersession, auditgroupuser);
		return result;
	}

	private AuditgroupuserDeleteDAO auditgroupuserDeleteDAO = new AuditgroupuserDeleteImpl();
	
	public String delete(Usersession usersession, int auditgroupuserid) {
		// TODO Auto-generated method stub
		result = auditgroupuserDeleteDAO.delete(usersession, auditgroupuserid);
		return result;
	}

}
