package com.mbusiness.action;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.struts2.interceptor.SessionAware;
import com.mbusiness.model.Permission;
import com.mbusiness.model.Usersession;
import com.mbusiness.service.PermissionService;
import com.mbusiness.util.MMessage;
import com.opensymphony.xwork2.ActionSupport;

public class PermissionListAction extends ActionSupport implements SessionAware{
	
	private PermissionService permissionService = new PermissionService();
	private List<Permission> permissions;
	private Map session;
	private String idtype;
	private String typeid;
	private Usersession usersession = new Usersession();
	private MMessage mmessage = new MMessage();

	public String list(){
				
		usersession.setCorporationid(0);
		if(session.get("account") == null || session.get("account").toString() == ""){
			usersession.setUsername("");
			permissions = new ArrayList<Permission>();
			Permission c = new Permission();
			c.setId(0);
			c.setZdy3(mmessage.notlogin);
			c.setZdy2("");
			permissions.add(c);
		}else{
			usersession.setUsername(session.get("account").toString());
			usersession.setSno(getText("no").trim());
			permissions = permissionService.list(usersession, idtype, typeid);
		}
				
		return SUCCESS;
	}

	@Override
	public void setSession(Map session) {		
		this.session = session;
	}

	public void setPermissions(List<Permission> permissions) {
		this.permissions = permissions;
	}

	public List<Permission> getPermissions() {
		return permissions;
	}

	public void setIdtype(String idtype) {
		this.idtype = idtype;
	}

	public String getIdtype() {
		return idtype;
	}

	public void setTypeid(String typeid) {
		this.typeid = typeid;
	}

	public String getTypeid() {
		return typeid;
	}
}
