package com.mbusiness.action;

import java.util.Map;

import org.apache.struts2.interceptor.SessionAware;

import com.mbusiness.model.Usersession;
import com.mbusiness.service.CustomerService;
import com.mbusiness.util.MMessage;
import com.opensymphony.xwork2.ActionSupport;

public class CustomerDeleteAction extends ActionSupport implements SessionAware{

	private int customerid;
	private boolean success;
	private String result;
	private CustomerService customerService = new CustomerService();
	private Map session;
	private MMessage mmessage = new MMessage();
	private Usersession usersession = new Usersession();
	
	public String delete(){
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
			result = customerService.delete(usersession, customerid);
			if (result == mmessage.deletesuccess){
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

	public int getCustomerid() {
		return customerid;
	}

	public void setCustomerid(int customerid) {
		this.customerid = customerid;
	}
}
