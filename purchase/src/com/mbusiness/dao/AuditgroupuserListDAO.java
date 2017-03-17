package com.mbusiness.dao;

import java.util.List;

import com.mbusiness.model.Auditgroupuser;
import com.mbusiness.model.Usersession;

public interface AuditgroupuserListDAO {

	public List<Auditgroupuser> list(Usersession usersession, String idtype, String typeid, int start, int limit, int page);
}
