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

public class SupplierEchartListAction extends ActionSupport implements SessionAware{
	
	private SupplierService supplierService = new SupplierService();
	private List<Supplier> suppliers;
	private Map session;
	private String idtype;
	private String typeid;
	private Usersession usersession = new Usersession();
	private MMessage mmessage = new MMessage();
	private String[] data;
	private String[] catalogs;

	public String list(){
				
		usersession.setCorporationid(0);
		if(session.get("account") == null || session.get("account").toString() == ""){
			usersession.setUsername("");
			suppliers = new ArrayList<Supplier>();
			Supplier c = new Supplier();
			c.setId(0);
			c.setName(mmessage.notlogin);
			suppliers.add(c);
		}else{
			usersession.setUsername(session.get("account").toString());
			suppliers = supplierService.list(usersession, idtype, typeid, 0, 100, 1);
			if(!suppliers.isEmpty()){
				data = new String[suppliers.size()];
				catalogs = new String[suppliers.size()];
				for(int i=0;i<suppliers.size();i++){
					data[i]=suppliers.get(i).getStatus() +"";
					catalogs[i]= suppliers.get(i).getZdy10();
				}
			}
		}
				
		return SUCCESS;
	}

	@Override
	public void setSession(Map session) {		
		this.session = session;
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

	public String[] getData() {
		return data;
	}

	public void setData(String[] data) {
		this.data = data;
	}

	public String[] getCatalogs() {
		return catalogs;
	}

	public void setCatalogs(String[] catalogs) {
		this.catalogs = catalogs;
	}
}
