package com.mbusiness.action;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.struts2.interceptor.SessionAware;
import com.mbusiness.model.Org;
import com.mbusiness.model.Usersession;
import com.mbusiness.service.OrgService;
import com.mbusiness.util.MMessage;
import com.opensymphony.xwork2.ActionSupport;

public class OrgListAction extends ActionSupport implements SessionAware{
	
	private OrgService orgService = new OrgService();
	private List<Org> orgs;
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
			orgs = new ArrayList<Org>();
			Org c = new Org();
			c.setId(0);
			c.setName(mmessage.notlogin);
			orgs.add(c);
			total = 1;
		}else{
			usersession.setUsername(session.get("account").toString());
			orgs = orgService.list(usersession, idtype, typeid, start, limit, page);
			if(!orgs.isEmpty()){
				total = Integer.parseInt(orgs.get(0).getZdy1());
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

	public void setOrgs(List<Org> orgs) {
		this.orgs = orgs;
	}

	public List<Org> getOrgs() {
		return orgs;
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
