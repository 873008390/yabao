package com.mbusiness.action;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.struts2.interceptor.SessionAware;
import com.mbusiness.model.Auditgroupuser;
import com.mbusiness.model.Usersession;
import com.mbusiness.service.AuditgroupuserService;
import com.mbusiness.util.MMessage;
import com.opensymphony.xwork2.ActionSupport;

public class AuditgroupuserListAction extends ActionSupport implements SessionAware{
	
	private AuditgroupuserService auditgroupuserService = new AuditgroupuserService();
	private List<Auditgroupuser> auditgroupusers;
	private Map session;
	private String idtype;
	private String typeid;
	private Usersession usersession = new Usersession();
	private MMessage mmessage = new MMessage();
	private int start;
	private int limit;
	private int page;
	private boolean success;
	private int total;

	public String list(){
				
		usersession.setCorporationid(0);
		if(session.get("account") == null || session.get("account").toString() == ""){
			usersession.setUsername("");
			auditgroupusers = new ArrayList<Auditgroupuser>();
			Auditgroupuser c = new Auditgroupuser();
			c.setId(0);
			c.setZdy3(mmessage.notlogin);
			c.setZdy2("");
			c.setZdy4("");
			c.setZdy1("1");
			auditgroupusers.add(c);
			total = 1;
		}else{
			usersession.setUsername(session.get("account").toString());
			auditgroupusers = auditgroupuserService.list(usersession, idtype, typeid, start, limit, page);
			if(!auditgroupusers.isEmpty()){				
				total = Integer.parseInt(auditgroupusers.get(0).getZdy1());
				
			}else{
				total = 0;
			}
		}
		success = true;	
		return SUCCESS;
	}

	@Override
	public void setSession(Map session) {		
		this.session = session;
	}

	public void setAuditgroupusers(List<Auditgroupuser> auditgroupusers) {
		this.auditgroupusers = auditgroupusers;
	}

	public List<Auditgroupuser> getAuditgroupusers() {
		return auditgroupusers;
	}

	public String getIdtype() {
		return idtype;
	}

	public void setIdtype(String idtype) {
		this.idtype = idtype;
	}

	public String getTypeid() {
		return typeid;
	}

	public void setTypeid(String typeid) {
		this.typeid = typeid;
	}

	public void setStart(int start) {
		this.start = start;
	}

	public int getStart() {
		return start;
	}

	public void setLimit(int limit) {
		this.limit = limit;
	}

	public int getLimit() {
		return limit;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public int getPage() {
		return page;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setTotal(int total) {
		this.total = total;
	}

	public int getTotal() {
		return total;
	}
}
