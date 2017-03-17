package com.mbusiness.action;

import java.util.Map;

import org.apache.struts2.interceptor.SessionAware;

import com.mbusiness.model.Usersession;
import com.mbusiness.service.UserService;
import com.opensymphony.xwork2.ActionSupport;

public class UserGetrandomcodeAction extends ActionSupport implements SessionAware{
	
	private String result;
	private Map session;	
	private String phoneno;
	private String typeid;
	private UserService userService = new UserService();
	private String idtype;
	
	public String add(){
		result = userService.getrandomcode(phoneno, idtype, typeid);
		
		return SUCCESS;
	}

	@Override
	public void setSession(Map session) {
		this.session = session;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public String getResult() {
		return result;
	}

	public void setIdtype(String idtype) {
		this.idtype = idtype;
	}

	public String getIdtype() {
		return idtype;
	}

	public String getPhoneno() {
		return phoneno;
	}

	public void setPhoneno(String phoneno) {
		this.phoneno = phoneno;
	}

	public String getTypeid() {
		return typeid;
	}

	public void setTypeid(String typeid) {
		this.typeid = typeid;
	}
}
