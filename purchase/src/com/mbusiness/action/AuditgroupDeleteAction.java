package com.mbusiness.action;

import java.util.Map;

import org.apache.struts2.interceptor.SessionAware;

import com.mbusiness.model.Auditgroup;
import com.mbusiness.model.Usersession;
import com.mbusiness.service.AuditgroupService;
import com.mbusiness.util.MMessage;
import com.opensymphony.xwork2.ActionSupport;

public class AuditgroupDeleteAction extends ActionSupport implements SessionAware{

	private int auditgroupid;
	private boolean success;
	private String result;
	private AuditgroupService auditgroupService = new AuditgroupService();
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
			result = auditgroupService.delete(usersession, auditgroupid);
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

	public int getAuditgroupid() {
		return auditgroupid;
	}

	public void setAuditgroupid(int auditgroupid) {
		this.auditgroupid = auditgroupid;
	}
}
