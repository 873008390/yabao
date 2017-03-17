package com.mbusiness.dao;

import java.util.List;

import com.mbusiness.model.Department;
import com.mbusiness.model.Usersession;

public interface DepartmentListDAO {

	public List<Department> list(Usersession usersession, String idtype, String typeid, int start, int limit, int page);
}
