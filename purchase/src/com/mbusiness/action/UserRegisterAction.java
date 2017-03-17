package com.mbusiness.action;

import java.util.Map;

import org.apache.struts2.interceptor.SessionAware;

import com.mbusiness.model.Users;
import com.mbusiness.service.UserService;
import com.mbusiness.util.AddCookie;
import com.mbusiness.util.MMessage;
import com.opensymphony.xwork2.ActionSupport;

/**
 * @author alamo
 * result：返回前台的提示
 * success：正常时返回前台为true，异常时为false
 * flag：用于区别success为false时各种情况，1表示该手机号码已注册，0表示其它情况
 */
public class UserRegisterAction extends ActionSupport implements SessionAware{

	private Users user;
	private boolean success;
	private String result;
	private int flag;
	private UserService userService = new UserService();
	private Map session;
	private MMessage mmessage = new MMessage();
	private int secure = 0;
	
	public String add(){
		//解码
		
		//安全性检查
		
		//
		if(secure == 1){
			result = userService.register(user);
			if (result.equalsIgnoreCase(mmessage.registersuccess)){
				success = true;
				flag = 1;
				session.put("username", user.getPhoneno());
				session.put("account", user.getPhoneno());
				AddCookie addCookie = new AddCookie();
				addCookie.add("username", user.getPhoneno());
			}else if(result == mmessage.phonenoregistered){			
				success = false;
				flag = 2;
			}else{
				success = false;
				flag = 0;
			}
		}else{
			result = mmessage.stringillegal;
		}
		return SUCCESS;
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
