package com.mbusiness.action;

import java.util.Map;

import org.apache.struts2.interceptor.SessionAware;

import com.mbusiness.model.Customerphoto;
import com.mbusiness.model.Usersession;
import com.mbusiness.service.CustomerService;
import com.mbusiness.util.MMessage;
import com.opensymphony.xwork2.ActionSupport;

public class CustomerAddphotoAction extends ActionSupport implements SessionAware{

	private Customerphoto customerphoto;
	private boolean success;
	private String result;
	private CustomerService customerService = new CustomerService();
	private Map session;
	private MMessage mmessage = new MMessage();
	private Usersession usersession = new Usersession();
	
	public String add(){
		if(session.get("corporationid") == null || session.get("corporationid").toString() == ""){
			usersession.setCorporationid(0);
		}else{
			usersession.setCorporationid(Integer.parseInt(session.get("corporationid").toString()));
		}
		if(session.get("account") == null || session.get("account").toString() == ""){
			if(customerphoto.getZdy9() != null && !customerphoto.getZdy9().equalsIgnoreCase("")){
				usersession.setUsername(customerphoto.getZdy9());
			}else{
				usersession.setUsername("");
			}
		}else{
			usersession.setUsername(session.get("account").toString());
		}
		if(usersession.getUsername().equalsIgnoreCase("")){
			result = mmessage.notlogin;
		}else{
			result = customerService.addphoto(usersession, customerphoto);
		}
		if (result == mmessage.savesuccess){
			success = true;
		}else{
			success = false;
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

	public Customerphoto getCustomerphoto() {
		return customerphoto;
	}

	public void setCustomerphoto(Customerphoto customerphoto) {
		this.customerphoto = customerphoto;
	}
}
