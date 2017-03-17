package com.mbusiness.action;

import java.util.Map;

import org.apache.struts2.interceptor.SessionAware;

import com.mbusiness.model.Usersession;
import com.mbusiness.service.UserService;
import com.mbusiness.util.MMessage;
import com.opensymphony.xwork2.ActionSupport;

public class IsloginAction extends ActionSupport implements SessionAware{
	
	private String result;
	private Map session;	
	private String username;
	private Usersession usersession = new Usersession();
	private UserService userService = new UserService();
	private String idtype;
	private String typeid;
	private MMessage mmessage = new MMessage();
	
	public String list(){
		if(session.get("corporationid") == null || session.get("corporationid").toString() == ""){
			usersession.setCorporationid(0);
		}else{
			usersession.setCorporationid(Integer.parseInt(session.get("corporationid").toString()));
		}
		if(session.get("username") == null || session.get("username").toString() == ""){
			if(idtype.equalsIgnoreCase("autologin")){
				result = userService.autologin(idtype,typeid);
				if(result.indexOf(mmessage.loginsuccess)>-1){
					//System.out.println("result="+ result);
					session.put("username", result.split("_")[1]);
					session.put("account", typeid.split("_")[1]);
					result = "yes";
					username = typeid.split("_")[1];
				}else{
					result = "no";
					username = "";
				}
			}else{
				result = "no";
				username = "";
			}
		}else{
			if(idtype.equalsIgnoreCase("autologin")){
				result = userService.autologin(idtype,typeid);
				if(result.indexOf(mmessage.loginsuccess)>-1){
					//System.out.println("result="+ result);
					session.put("username", result.split("_")[1]);
					session.put("account", typeid.split("_")[1]);
					result = "yes";
					username = typeid.split("_")[1];
				}else{
					result = "no";
					username = "";
				}
			}else if(idtype.equalsIgnoreCase("no")){
				result = "yes";
			}else{
				result = "no";
				username = "";
			}
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

	public String getTypeid() {
		return typeid;
	}

	public void setTypeid(String typeid) {
		this.typeid = typeid;
	}
}
