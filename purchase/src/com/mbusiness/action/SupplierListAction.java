package com.mbusiness.action;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.struts2.interceptor.SessionAware;
import com.mbusiness.model.Supplier;
import com.mbusiness.model.Usersession;
import com.mbusiness.service.SupplierService;
import com.mbusiness.util.MMessage;
import com.opensymphony.xwork2.ActionSupport;

public class SupplierListAction extends ActionSupport implements SessionAware{
	
	private SupplierService supplierService = new SupplierService();
	private List<Supplier> suppliers;
	private Map session;
	private String idtype;
	private String typeid;
	private Usersession usersession = new Usersession();
	private MMessage mmessage = new MMessage();
	private int start;
	private int page;
	private int limit;
	private int total;

	public String list(){
				
		usersession.setCorporationid(0);
		if(session.get("account") == null || session.get("account").toString() == ""){
			usersession.setUsername("");
			suppliers = new ArrayList<Supplier>();
			Supplier c = new Supplier();
			c.setId(0);
			c.setName(mmessage.notlogin);
			suppliers.add(c);
			total = 0;
		}else{
			usersession.setUsername(session.get("account").toString());
			suppliers = supplierService.list(usersession, idtype, typeid, start, limit, page);
			if(!suppliers.isEmpty()){
				total = Integer.parseInt(suppliers.get(0).getZdy1());
			}else{
				total = 0;
			}
		}
				
		return SUCCESS;
	}

	@Override
	public void setSession(Map session) {		
		this.session = session;
	}

	public void setSuppliers(List<Supplier> suppliers) {
		this.suppliers = suppliers;
	}

	public List<Supplier> getSuppliers() {
		return suppliers;
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

	public void setPage(int page) {
		this.page = page;
	}

	public int getPage() {
		return page;
	}

	public void setLimit(int limit) {
		this.limit = limit;
	}

	public int getLimit() {
		return limit;
	}

	public void setTotal(int total) {
		this.total = total;
	}

	public int getTotal() {
		return total;
	}
}
