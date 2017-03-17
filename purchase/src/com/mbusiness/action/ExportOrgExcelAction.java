package com.mbusiness.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.struts2.interceptor.SessionAware;

import com.mbusiness.model.Org;
import com.mbusiness.model.Usersession;
import com.mbusiness.service.OrgService;
import com.mbusiness.util.Export_excel;
import com.opensymphony.xwork2.ActionSupport;
/**
 * 导出机构excel
 * @author
 *
 */
public class ExportOrgExcelAction extends ActionSupport implements SessionAware{
	
	private OrgService orgService = new OrgService();
	private List<Org> orgs;
	private String idtype;
	private String typeid;
	private Map session;
	private Usersession usersession = new Usersession();
	private int start;
	private int limit;
	private int page;
	private String result;
	
	public String group(){
		usersession.setUsername(session.get("account").toString());
		orgs = orgService.list(usersession, idtype, typeid, start, limit, page);
		List<String> titles = new ArrayList<String>();
		titles.add("名称");
		
		List<String> filedNames = new ArrayList<String>();
		filedNames.add("name");
		
		List<Map<String,String>> filedValues = new ArrayList<Map<String,String>>();
		for(int m=0; m<orgs.size(); m++){
			Map<String,String> values = new HashMap<String,String>();
			values.put("name", orgs.get(m).getName());
			filedValues.add(values);
		}
		result = Export_excel.execute("firstorg", titles, filedNames, filedValues);
		
		return SUCCESS;
	}
	
	
	
	public String center(){
		usersession.setUsername(session.get("account").toString());
		orgs = orgService.list(usersession, idtype, typeid, start, limit, page);
		List<String> titles = new ArrayList<String>();
		titles.add("名称");
		titles.add("上级机构");
		List<String> filedNames = new ArrayList<String>();
		filedNames.add("name");
		filedNames.add("zdy2");
		List<Map<String,String>> filedValues = new ArrayList<Map<String,String>>();
		for(int m=0; m<orgs.size(); m++){
			Map<String,String> values = new HashMap<String,String>();
			values.put("name", orgs.get(m).getName());
			values.put("zdy2", orgs.get(m).getZdy2());
			filedValues.add(values);
		}
		result = Export_excel.execute("secondorg", titles, filedNames, filedValues);
		
		return SUCCESS;
	}

	public String son(){
		usersession.setUsername(session.get("account").toString());
		orgs = orgService.list(usersession, idtype, typeid, start, limit, page);
		List<String> titles = new ArrayList<String>();
		titles.add("名称");
		titles.add("上级机构");
		List<String> filedNames = new ArrayList<String>();
		filedNames.add("name");
		filedNames.add("zdy2");
		List<Map<String,String>> filedValues = new ArrayList<Map<String,String>>();
		for(int m=0; m<orgs.size(); m++){
			Map<String,String> values = new HashMap<String,String>();
			values.put("name", orgs.get(m).getName());
			values.put("zdy2", orgs.get(m).getZdy2());
			filedValues.add(values);
		}
		result = Export_excel.execute("thirdorg", titles, filedNames, filedValues);
		
		return SUCCESS;
	}
	@Override
	public void setSession(Map session) {		
		this.session = session;
	}
	public List<Org> getOrgs() {
		return orgs;
	}

	public void setOrgs(List<Org> orgs) {
		this.orgs = orgs;
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
	
	public int getStart() {
		return start;
	}

	public void setStart(int start) {
		this.start = start;
	}

	public int getLimit() {
		return limit;
	}

	public void setLimit(int limit) {
		this.limit = limit;
	}

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}
	
}
