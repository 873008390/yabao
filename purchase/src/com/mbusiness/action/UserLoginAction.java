package com.mbusiness.action;

import java.net.URLEncoder;
import java.util.Map;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.apache.struts2.interceptor.SessionAware;

import com.opensymphony.xwork2.ActionSupport;
import com.mbusiness.service.UserService;
import com.mbusiness.util.MMessage;

public class UserLoginAction extends ActionSupport implements SessionAware,ServletResponseAware{

	private String result;
	private boolean success;
	private String name;
	private String password;	
	private int corporationid;
	private UserService userService = new UserService();
	private Map session;
	private MMessage mmessage = new MMessage();
	private HttpServletResponse response;
	private String from;
	
	public String login(){
		if(from == null){
			from = "";
		}
		result = userService.login(name, password, corporationid, from);
		if(result.indexOf("_")>-1){			
			if (result.split("_")[0].equalsIgnoreCase(mmessage.loginsuccess)){
				success = true;				
				session.put("username", result.split("_")[1]);
				session.put("account", result.split("_")[2]);
				addCookie("username", result.split("_")[2]);
			}else{
				success = false;
			}
			result = result.split("_")[0];
		}else{
			if (result.equalsIgnoreCase(mmessage.loginsuccess)){
				success = true;				
				session.put("username", name);	
				session.put("account", name);
				addCookie("username", name);
			}else{
				success = false;
			}
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

	public void setResult(String result) {
		this.result = result;
	}

	public String getResult() {
		return result;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPassword() {
		return password;
	}

	@Override
	public void setSession(Map session) {
		this.session = session;
	}

	@Override
	public void setServletResponse(HttpServletResponse response) {
		// TODO Auto-generated method stub
		this.response = response;
	}

	public String getFrom() {
		return from;
	}

	public void setFrom(String from) {
		this.from = from;
	}
}
