package com.mbusiness.dao;

import java.util.List;

import com.mbusiness.model.Auditgroupdetail;
import com.mbusiness.model.Usersession;

public interface AuditgroupdetailListDAO {

	public List<Auditgroupdetail> list(Usersession usersession, String idtype, String typeid, int start, int limit, int page);
}
