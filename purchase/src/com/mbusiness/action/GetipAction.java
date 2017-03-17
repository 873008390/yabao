package com.mbusiness.action;

import com.opensymphony.xwork2.ActionSupport;

public class GetipAction extends ActionSupport{
	
	private String ip;
	
	public String get(){
		ip = org.apache.struts2.ServletActionContext.getRequest().getRemoteAddr();		
		return SUCCESS;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public String getIp() {
		return ip;
	}
}
