package com.mbusiness.action;

import java.util.List;
import java.util.Map;

import org.apache.struts2.interceptor.SessionAware;

import com.mbusiness.model.Users;
import com.mbusiness.model.Usersession;
import com.mbusiness.service.UserService;
import com.opensymphony.xwork2.ActionSupport;

public class GetuserinfoAction extends ActionSupport implements SessionAware{
	
	private String result;
	private Map session;	
	private List<Users> users;
	private Users userinfo = new Users();
	private Usersession usersession = new Usersession();
	private UserService userService = new UserService();
	private String idtype;
	
	public String list(){
		if(session.get("corporationid") == null || session.get("corporationid").toString() == ""){
			usersession.setCorporationid(0);
		}else{
			usersession.setCorporationid(Integer.parseInt(session.get("corporationid").toString()));
		}
		if(session.get("username") == null || session.get("username").toString() == ""){
			result = "no";
			userinfo.setId(0);
			userinfo.setAccount("");
			userinfo.setName("");
			userinfo.setPhoneno("");
			userinfo.setSaleaddress("");
		}else{
			usersession.setUsername(session.get("account").toString());
			users = userService.getuserinfo(usersession);
			if(users.get(0).getId() != 0){
				result = "yes";
				userinfo = users.get(0);
			}else{
				result = "no";
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

	public void setIdtype(String idtype) {
		this.idtype = idtype;
	}

	public String getIdtype() {
		return idtype;
	}

	public void setUserinfo(Users userinfo) {
		this.userinfo = userinfo;
	}

	public Users getUserinfo() {
		return userinfo;
	}
}
