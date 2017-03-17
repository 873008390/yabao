package com.mbusiness.action;

import java.util.Map;

import org.apache.struts2.interceptor.SessionAware;

import com.mbusiness.model.Department;
import com.mbusiness.model.Usersession;
import com.mbusiness.service.DepartmentService;
import com.mbusiness.util.MMessage;
import com.opensymphony.xwork2.ActionSupport;

public class DepartmentAddAction extends ActionSupport implements SessionAware{

	private Department department;
	private boolean success;
	private String result;
	private DepartmentService departmentService = new DepartmentService();
	private Map session;
	private MMessage mmessage = new MMessage();
	private Usersession usersession = new Usersession();
	
	public String add(){
		if(session.get("corporationid") == null || session.get("corporationid").toString() == ""){
			usersession.setCorporationid(0);
		}else{
			usersession.setCorporationid(Integer.parseInt(session.get("corporationid").toString()));
		}
		if(session.get("account") == null || session.get("account").toString() == ""){
			usersession.setUsername("");
		}else{
			usersession.setUsername(session.get("account").toString());
		}
		if(session.get("account") == null || session.get("account").toString() == ""){
			result = mmessage.notlogin;
			success = false;
		}else{
			result = departmentService.add(usersession, department);
			if (result == mmessage.savesuccess){
				success = true;
			}else{
				success = false;
			}
		}
		if(success){
			return SUCCESS;
		}else{
			return INPUT;
		}
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public String getResult() {
		return result;
	}

	@Override
	public void setSession(Map session) {
		this.session = session;
	}

	public Department getDepartment() {
		return department;
	}

	public void setDepartment(Department department) {
		this.department = department;
	}
}
