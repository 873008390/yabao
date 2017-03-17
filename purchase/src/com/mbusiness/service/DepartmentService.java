package com.mbusiness.service;

import java.util.List;

import com.mbusiness.dao.DepartmentAddDAO;
import com.mbusiness.dao.DepartmentDeleteDAO;
import com.mbusiness.dao.DepartmentListDAO;
import com.mbusiness.dao.DepartmentsynDAO;
import com.mbusiness.impl.DepartmentAddImpl;
import com.mbusiness.impl.DepartmentDeleteImpl;
import com.mbusiness.impl.DepartmentListImpl;
import com.mbusiness.impl.DepartmentsynImpl;
import com.mbusiness.model.Department;
import com.mbusiness.model.Usersession;

public class DepartmentService {

	private List<Department> departments;
	private DepartmentListDAO departmentListDAO = new DepartmentListImpl();
	
	public List<Department> list(Usersession usersession, String idtype, String typeid, int start, int limit, int page) {
		// TODO Auto-generated method stub
		departments = departmentListDAO.list(usersession, idtype, typeid, start, limit, page);
		return departments;
	}

	private String result;
	private DepartmentAddDAO departmentAddDAO = new DepartmentAddImpl();
	
	public String add(Usersession usersession, Department department) {
		// TODO Auto-generated method stub
		result = departmentAddDAO.add(usersession, department);
		return result;
	}

	private DepartmentDeleteDAO departmentDeleteDAO = new DepartmentDeleteImpl();
	
	public String delete(Usersession usersession, int departmentid) {
		// TODO Auto-generated method stub
		result = departmentDeleteDAO.delete(usersession, departmentid);
		return result;
	}

	private DepartmentsynDAO departmentsynDAO = new DepartmentsynImpl();
	
	public String syn(Usersession usersession) {
		// TODO Auto-generated method stub
		result = departmentsynDAO.syn(usersession);
		return result;
	}

}
