package com.mbusiness.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.struts2.interceptor.SessionAware;

import com.mbusiness.model.Producttype;
import com.mbusiness.model.Supplier;
import com.mbusiness.model.Usersession;
import com.mbusiness.service.ProducttypeService;
import com.mbusiness.service.SupplierService;
import com.mbusiness.util.Export_excel;
import com.opensymphony.xwork2.ActionSupport;
/**
 * 导出供应商excel
 * @author
 *
 */
public class ExportProducttypeExcelAction extends ActionSupport implements SessionAware{
	
	private ProducttypeService producttypeService = new ProducttypeService();
	private List<Producttype> producttypes;
	private String idtype;
	private String typeid;
	private Map session;
	private Usersession usersession = new Usersession();
	private int start;
	private int limit;
	private int page;
	private String result;
	
	public String export(){
		usersession.setUsername(session.get("account").toString());
		producttypes = producttypeService.list(usersession, idtype, typeid, start, limit, page);
		List<String> titles = new ArrayList<String>();
		titles.add("名称");
		List<String> filedNames = new ArrayList<String>();
		filedNames.add("name");
		
		List<Map<String,String>> filedValues = new ArrayList<Map<String,String>>();
		for(int m=0; m<producttypes.size(); m++){
			Map<String,String> values = new HashMap<String,String>();
			values.put("name", producttypes.get(m).getName());
			filedValues.add(values);
		}
		result = Export_excel.execute("producttype", titles, filedNames, filedValues);
		
		return SUCCESS;
	}

	@Override
	public void setSession(Map session) {		
		this.session = session;
	}

	public List<Producttype> getProducttypes() {
		return producttypes;
	}

	public void setProducttypes(List<Producttype> producttypes) {
		this.producttypes = producttypes;
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
