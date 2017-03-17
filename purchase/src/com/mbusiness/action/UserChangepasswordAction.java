package com.mbusiness.action;

import java.net.URLEncoder;
import java.util.Map;

import javax.servlet.http.Cookie;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.interceptor.SessionAware;

import com.mbusiness.model.Users;
import com.mbusiness.model.Usersession;
import com.mbusiness.service.UserService;
import com.mbusiness.util.MMessage;
import com.opensymphony.xwork2.ActionSupport;

public class UserChangepasswordAction extends ActionSupport implements SessionAware{

	private Users user;
	private boolean success;
	private String result;
	private int flag;
	private UserService userService = new UserService();
	private Map session;
	private MMessage mmessage = new MMessage();
	private Usersession usersession = new Usersession();
	
	public String add(){
		result = userService.change(user);
		if (result == mmessage.modifysuccess){
			success = true;
			flag = 1;			
			session.put("username", user.getPhoneno());
			session.put("account", user.getPhoneno());
			addCookie("username", user.getPhoneno());
		}else{
			success = false;
			flag = 0;
		}
		return SUCCESS;
	}
	
	public void addCookie(String name,String value){
        //创建Cookie
         Cookie cookie = new Cookie(name, URLEncoder.encode(value));
         //设置Cookie的生命周期
         cookie.setMaxAge(60*60*24*365);
         cookie.setPath("/");
        ServletActionContext.getResponse().addCookie(cookie);
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

	public Users getUser() {
		return user;
	}

	public void setUser(Users user) {
		this.user = user;
	}

	public int getFlag() {
		return flag;
	}

	public void setFlag(int flag) {
		this.flag = flag;
	}
}
