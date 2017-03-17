package com.mbusiness.dao;

import java.util.List;

import com.mbusiness.model.Auditgroup;
import com.mbusiness.model.Usersession;

public interface AuditgroupListDAO {

	public List<Auditgroup> list(Usersession usersession, String idtype, String typeid, int start, int limit, int page);
}
