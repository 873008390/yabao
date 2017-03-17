package com.mbusiness.action;

import java.util.Map;

import org.apache.struts2.interceptor.SessionAware;

import com.mbusiness.model.Usersession;
import com.opensymphony.xwork2.ActionSupport;

public class GetaccountAction extends ActionSupport implements SessionAware{
	
	private String result;
	private Map session;	
	private String account;
	private Usersession usersession = new Usersession();
	private String idtype;
	
	public String list(){
		if(session.get("corporationid") == null || session.get("corporationid").toString() == ""){
			usersession.setCorporationid(0);
		}else{
			usersession.setCorporationid(Integer.parseInt(session.get("corporationid").toString()));
		}
		if(session.get("account") == null || session.get("account").toString() == ""){
			result = "no";
			setAccount("");
		}else{
			result = "yes";
			setAccount(session.get("account").toString());
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

	public void setIdtype(String idtype) {
		this.idtype = idtype;
	}

	public String getIdtype() {
		return idtype;
	}

	public String getAccount() {
		return account;
	}

	public void setAccount(String account) {
		this.account = account;
	}
}
