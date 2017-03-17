package com.mbusiness.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.struts2.interceptor.SessionAware;

import com.mbusiness.model.Department;
import com.mbusiness.model.Usersession;
import com.mbusiness.service.DepartmentService;
import com.mbusiness.util.Export_excel;
import com.opensymphony.xwork2.ActionSupport;
/**
 * 导出部门excel
 * @author
 *
 */
public class ExportDepartmentExcelAction extends ActionSupport implements SessionAware{
	
	private DepartmentService departmentService = new DepartmentService();
	private List<Department> departments;
	private String idtype;
	private String typeid;
	private Map session;
	private Usersession usersession = new Usersession();
	private int start;
	private int limit;
	private int page;
	private String result;
	
	public String export(){
		usersession.setUsername(session.get("account").toString());
		departments = departmentService.list(usersession, idtype, typeid, start, limit, page);
		List<String> titles = new ArrayList<String>();
		titles.add("名称");
		titles.add("职务");
		titles.add("负责人");
		titles.add("所属机构");
		List<String> filedNames = new ArrayList<String>();
		filedNames.add("name");
		filedNames.add("zdy10");
		filedNames.add("zdy3");
		filedNames.add("zdy4");
		
		List<Map<String,String>> filedValues = new ArrayList<Map<String,String>>();
		for(int m=0; m<departments.size(); m++){
			Map<String,String> values = new HashMap<String,String>();
			values.put("name", departments.get(m).getName());
			values.put("zdy10", departments.get(m).getZdy10());
			values.put("zdy3", departments.get(m).getZdy3());
			values.put("zdy4", departments.get(m).getZdy4());
			filedValues.add(values);
		}
		result = Export_excel.execute("department", titles, filedNames, filedValues);
		
		return SUCCESS;
	}

	@Override
	public void setSession(Map session) {		
		this.session = session;
	}
	public List<Department> getDepartments() {
		return departments;
	}

	public void setDepartments(List<Department> departments) {
		this.departments = departments;
	}

	public String getIdtype() {
		return idtype;
	}

	public void setIdtype(String idtype) {
		this.idtype = idtype;
	}

	public String getTypeid() {
		return typeid;
	}

	public void setTypeid(String typeid) {
		this.typeid = typeid;
	}
	
	public int getStart() {
		return start;
	}

	public void setStart(int start) {
		this.start = start;
	}

	public int getLimit() {
		return limit;
	}

	public void setLimit(int limit) {
		this.limit = limit;
	}

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}
	
}
