package com.mbusiness.action;

import java.util.Map;

import org.apache.struts2.interceptor.SessionAware;

import com.mbusiness.model.Usersession;
import com.opensymphony.xwork2.ActionSupport;

public class LogoutAction extends ActionSupport implements SessionAware{
	
	private String result;
	private Map session;	
	private String username;
	private Usersession usersession = new Usersession();
	private String idtype;
	
	public String list(){
		if(session.get("corporationid") == null || session.get("corporationid").toString() == ""){
			usersession.setCorporationid(0);
		}else{
			usersession.setCorporationid(0);
		}
		if(session.get("username") == null || session.get("username").toString() == ""){
			
		}else{
			session.put("username", "");
			session.put("account", "");
		}
		
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

	public void setUsername(String username) {
		this.username = username;
	}

	public String getUsername() {
		return username;
	}

	public void setIdtype(String idtype) {
		this.idtype = idtype;
	}

	public String getIdtype() {
		return idtype;
	}
}
