package com.mbusiness.action;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.struts2.interceptor.SessionAware;
import com.mbusiness.model.Catalog;
import com.mbusiness.model.Usersession;
import com.mbusiness.service.CatalogService;
import com.mbusiness.util.MMessage;
import com.opensymphony.xwork2.ActionSupport;

/**
 * @author alamo
 *
 */
public class CatalogListAction extends ActionSupport implements SessionAware{
	
	private CatalogService catalogService = new CatalogService();
	private List<Catalog> catalogs;
	private Map session;
	private String type;
	private Usersession usersession = new Usersession();
	private MMessage mmessage = new MMessage();

	public String list(){
		
		//安全性检查
		
		//
		usersession.setCorporationid(0);
		if(session.get("account") == null || session.get("account").toString() == ""){
			usersession.setUsername("");
			catalogs = new ArrayList<Catalog>();
			Catalog c = new Catalog();
			c.setId(0);
			c.setName(mmessage.notlogin);
			catalogs.add(c);
		}else{
			usersession.setUsername(session.get("account").toString());
			usersession.setSno(getText("no").trim());
			catalogs = catalogService.list(usersession, type);
		}
				
		return SUCCESS;
	}

	@Override
	public void setSession(Map session) {		
		this.session = session;
	}

	public void setCatalogs(List<Catalog> catalogs) {
		this.catalogs = catalogs;
	}

	public List<Catalog> getCatalogs() {
		return catalogs;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
}
