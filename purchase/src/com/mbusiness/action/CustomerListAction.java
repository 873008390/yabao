package com.mbusiness.action;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.struts2.interceptor.SessionAware;
import com.mbusiness.model.Customer;
import com.mbusiness.model.Usersession;
import com.mbusiness.service.CustomerService;
import com.mbusiness.util.MMessage;
import com.opensymphony.xwork2.ActionSupport;

public class CustomerListAction extends ActionSupport implements SessionAware{
	
	private CustomerService customerService = new CustomerService();
	private List<Customer> customers;
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
			customers = new ArrayList<Customer>();
			Customer c = new Customer();
			c.setId(0);
			c.setName(mmessage.notlogin);
			customers.add(c);
			total = 0;
		}else{
			usersession.setUsername(session.get("account").toString());
			customers = customerService.list(usersession, idtype, typeid, start, limit, page);
			if(!customers.isEmpty()){
				total = Integer.parseInt(customers.get(0).getZdy1());
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

	public void setCustomers(List<Customer> customers) {
		this.customers = customers;
	}

	public List<Customer> getCustomers() {
		return customers;
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
