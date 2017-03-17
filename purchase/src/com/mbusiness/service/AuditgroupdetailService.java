package com.mbusiness.service;

import java.util.List;

import com.mbusiness.dao.AuditgroupdetailListDAO;
import com.mbusiness.dao.AuditgroupdetailAddDAO;
import com.mbusiness.dao.AuditgroupdetailDeleteDAO;
import com.mbusiness.impl.AuditgroupdetailListImpl;
import com.mbusiness.impl.AuditgroupdetailAddImpl;
import com.mbusiness.impl.AuditgroupdetailDeleteImpl;
import com.mbusiness.model.Auditgroupdetail;
import com.mbusiness.model.Usersession;

public class AuditgroupdetailService {

	private List<Auditgroupdetail> auditgroupdetails;
	private AuditgroupdetailListDAO auditgroupdetailListDAO = new AuditgroupdetailListImpl();
	
	public List<Auditgroupdetail> list(Usersession usersession, String idtype, String typeid, int start, int limit, int page) {
		// TODO Auto-generated method stub
		auditgroupdetails = auditgroupdetailListDAO.list(usersession, idtype, typeid, start, limit, page);
		return auditgroupdetails;
	}

	private String result;
	private AuditgroupdetailAddDAO auditgroupdetailAddDAO = new AuditgroupdetailAddImpl();
	
	public String add(Usersession usersession, Auditgroupdetail auditgroupdetail) {
		// TODO Auto-generated method stub
		result = auditgroupdetailAddDAO.add(usersession, auditgroupdetail);
		return result;
	}

	private AuditgroupdetailDeleteDAO auditgroupdetailDeleteDAO = new AuditgroupdetailDeleteImpl();
	
	public String delete(Usersession usersession, int auditgroupdetailid) {
		// TODO Auto-generated method stub
		result = auditgroupdetailDeleteDAO.delete(usersession, auditgroupdetailid);
		return result;
	}

}
