package com.mbusiness.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.struts2.interceptor.SessionAware;

import com.mbusiness.model.Product;
import com.mbusiness.model.Usersession;
import com.mbusiness.service.ProductService;
import com.mbusiness.util.Export_excel;
import com.opensymphony.xwork2.ActionSupport;
/**
 * 导出物料excel
 * @author
 *
 */
public class ExportProductExcelAction extends ActionSupport implements SessionAware{
	
	private ProductService productService = new ProductService();
	private List<Product> products;
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
		products = productService.list(usersession, idtype, typeid, start, limit, page);
		List<String> titles = new ArrayList<String>();
		titles.add("名称");
		titles.add("规格");
		titles.add("类型");
		titles.add("有效期（月）");
		List<String> filedNames = new ArrayList<String>();
		filedNames.add("name");
		filedNames.add("zdy2");
		filedNames.add("zdy3");
		filedNames.add("periodofvalidity");
		
		List<Map<String,String>> filedValues = new ArrayList<Map<String,String>>();
		for(int m=0; m<products.size(); m++){
			Map<String,String> values = new HashMap<String,String>();
			values.put("name", products.get(m).getName());
			values.put("zdy2", products.get(m).getZdy2());
			values.put("zdy3", products.get(m).getZdy3());
			values.put("periodofvalidity", String.valueOf(products.get(m).getPeriodofvalidity()));
			filedValues.add(values);
		}
		result = Export_excel.execute("product", titles, filedNames, filedValues);
		
		return SUCCESS;
	}

	@Override
	public void setSession(Map session) {		
		this.session = session;
	}
	public List<Product> getProducts() {
		return products;
	}

	public void setProducts(List<Product> products) {
		this.products = products;
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
