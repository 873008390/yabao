package com.mbusiness.action;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.struts2.interceptor.SessionAware;
import com.mbusiness.model.Keyvalue;
import com.mbusiness.model.Usersession;
import com.mbusiness.service.KeyvalueService;
import com.mbusiness.util.MMessage;
import com.opensymphony.xwork2.ActionSupport;

public class KeyvalueListAction extends ActionSupport implements SessionAware{
	
	private KeyvalueService keyvalueService = new KeyvalueService();
	private List<Keyvalue> keyvalues;
	private Map session;
	private int type;
	private Usersession usersession = new Usersession();
	private MMessage mmessage = new MMessage();

	public String list(){
				
		usersession.setCorporationid(0);
		if(session.get("account") == null || session.get("account").toString() == ""){
			usersession.setUsername("");
			keyvalues = new ArrayList<Keyvalue>();
			Keyvalue c = new Keyvalue();
			c.setId(0);
			c.setKeyname(mmessage.notlogin);
			keyvalues.add(c);
		}else{
			usersession.setUsername(session.get("account").toString());
			usersession.setSno(getText("no").trim());
			keyvalues = keyvalueService.list(usersession, type);
		}
				
		return SUCCESS;
	}

	@Override
	public void setSession(Map session) {		
		this.session = session;
	}

	public void setKeyvalues(List<Keyvalue> keyvalues) {
		this.keyvalues = keyvalues;
	}

	public List<Keyvalue> getKeyvalues() {
		return keyvalues;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}
}
