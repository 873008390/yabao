package com.mbusiness.action;

import java.util.List;
import java.util.Map;

import org.apache.struts2.interceptor.SessionAware;

import com.opensymphony.xwork2.ActionSupport;
import com.mbusiness.model.Users;
import com.mbusiness.model.Usersession;
import com.mbusiness.service.UserService;

public class UserListAction extends ActionSupport implements SessionAware{

	private List<Users> users;
	private UserService userService = new UserService();
	private Map session;
	private String idtype;
	private String typeid;
	private int total;
	private Usersession usersession = new Usersession();
	private int start;
	private int limit;
	private int page;
	private boolean success;
	
	public String list(){
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
		users = userService.list(usersession, idtype, typeid, start, limit, page);
		total = Integer.parseInt(users.get(0).getZdy1());
		success = true;
		
		return SUCCESS;
	}

	public List<Users> getUsers() {
		return users;
	}

	public void setUsers(List<Users> users) {
		this.users = users;
	}

	@Override
	public void setSession(Map session) {
		this.session = session;
	}

	public void setIdtype(String idtype) {
		this.idtype = idtype;
	}

	public String getIdtype() {
		return idtype;
	}

	public void setTypeid(String typeid) {
		this.typeid = typeid;
	}

	public String getTypeid() {
		return typeid;
	}

	public void setTotal(int total) {
		this.total = total;
	}

	public int getTotal() {
		return total;
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

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public boolean isSuccess() {
		return success;
	}

	
}
