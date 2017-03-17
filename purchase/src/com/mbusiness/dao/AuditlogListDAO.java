package com.mbusiness.dao;

import java.util.List;

import com.mbusiness.model.Auditlog;
import com.mbusiness.model.Usersession;

public interface AuditlogListDAO {

	public List<Auditlog> list(Usersession usersession, String idtype, String typeid, int start, int limit, int page);
}
