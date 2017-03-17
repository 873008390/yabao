package com.mbusiness.action;

import java.util.List;
import java.util.Map;

import org.apache.struts2.interceptor.SessionAware;
import com.mbusiness.model.Supplierfile;
import com.mbusiness.model.Usersession;
import com.mbusiness.service.SupplierService;
import com.opensymphony.xwork2.ActionSupport;

public class SupplierfileListAction extends ActionSupport implements SessionAware{
	
	private SupplierService supplierService = new SupplierService();
	private List<Supplierfile> supplierfiles;
	private Map session;
	private String idtype;
	private String typeid;
	private Usersession usersession = new Usersession();
	private int start;
	private int limit;
	private int page;
	private boolean success;
	private int total;

	public String list(){
		String username = "";		
		usersession.setCorporationid(0);
		if(session.get("account") == null || session.get("account").toString() == ""){
			
		}else{
			username = session.get("account").toString();
		}
		usersession.setUsername(username);
		supplierfiles = supplierService.listfile(usersession, idtype, typeid, start, limit, page);
		if(!supplierfiles.isEmpty()){
			total = Integer.parseInt(supplierfiles.get(0).getZdy1());
			
		}else{
			total = 0;
		}
		success = true;	
		return SUCCESS;
	}

	@Override
	public void setSession(Map session) {		
		this.session = session;
	}

	public void setSupplierfiles(List<Supplierfile> supplierfiles) {
		this.supplierfiles = supplierfiles;
	}

	public List<Supplierfile> getSupplierfiles() {
		return supplierfiles;
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
