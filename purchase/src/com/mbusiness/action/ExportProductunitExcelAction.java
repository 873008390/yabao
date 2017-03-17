package com.mbusiness.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.struts2.interceptor.SessionAware;

import com.mbusiness.model.Productunit;
import com.mbusiness.model.Usersession;
import com.mbusiness.service.ProductunitService;
import com.mbusiness.util.Export_excel;
import com.opensymphony.xwork2.ActionSupport;
/**
 * 导出供应商excel
 * @author
 *
 */
public class ExportProductunitExcelAction extends ActionSupport implements SessionAware{
	
	private ProductunitService productunitService = new ProductunitService();
	private List<Productunit> productunits;
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
		productunits = productunitService.list(usersession, idtype, typeid, start, limit, page);
		List<String> titles = new ArrayList<String>();
		titles.add("名称");
		titles.add("基础单位");
		titles.add("下级单位");
		titles.add("比率");
		List<String> filedNames = new ArrayList<String>();
		filedNames.add("name");
		filedNames.add("isbase");
		filedNames.add("zdy2");
		filedNames.add("total");
		
		List<Map<String,String>> filedValues = new ArrayList<Map<String,String>>();
		for(int m=0; m<productunits.size(); m++){
			Map<String,String> values = new HashMap<String,String>();
			values.put("name", productunits.get(m).getName());
			values.put("isbase", String.valueOf(productunits.get(m).getIsbase()));
			values.put("zdy2", productunits.get(m).getZdy2());
			values.put("total", String.valueOf(productunits.get(m).getTotal()));
			filedValues.add(values);
		}
		result = Export_excel.execute("productunit", titles, filedNames, filedValues);
		
		return SUCCESS;
	}

	@Override
	public void setSession(Map session) {		
		this.session = session;
	}

	public List<Productunit> getProductunits() {
		return productunits;
	}

	public void setProductunits(List<Productunit> productunits) {
		this.productunits = productunits;
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
