package com.mbusiness.action;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.struts2.interceptor.SessionAware;
import com.mbusiness.model.Purchase;
import com.mbusiness.model.Usersession;
import com.mbusiness.service.PurchaseService;
import com.mbusiness.util.MMessage;
import com.opensymphony.xwork2.ActionSupport;

public class PurchaseEchartListAction extends ActionSupport implements SessionAware{
	
	private PurchaseService purchaseService = new PurchaseService();
	private List<Purchase> purchases;
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
			purchases = new ArrayList<Purchase>();
			Purchase c = new Purchase();
			c.setId(0);
			c.setZdy1(mmessage.notlogin);
			purchases.add(c);
		}else{
			usersession.setUsername(session.get("account").toString());
			purchases = purchaseService.list(usersession, idtype, typeid, 0, 100, 1);
			if(!purchases.isEmpty()){
				data = new String[purchases.size()];
				catalogs = new String[purchases.size()];
				for(int i=0;i<purchases.size();i++){
					data[i]=purchases.get(i).getStatus() +"";
					catalogs[i]= purchases.get(i).getZdy10();
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
