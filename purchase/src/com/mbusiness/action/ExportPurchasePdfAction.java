package com.mbusiness.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.struts2.interceptor.SessionAware;

import com.mbusiness.model.Purchase;
import com.mbusiness.model.Usersession;
import com.mbusiness.service.PurchaseService;
import com.mbusiness.util.Export_pdf;
import com.opensymphony.xwork2.ActionSupport;
/**
 * 导出采购定单pdf
 * @author
 *
 */
public class ExportPurchasePdfAction extends ActionSupport implements SessionAware{
	private PurchaseService purchaseService = new PurchaseService();
	private List<Purchase> purchases;
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
		purchases = purchaseService.list(usersession, idtype, typeid, start, limit, page);
		List<String> titles = new ArrayList<String>();
		titles.add("ID");
		titles.add("供应商");
		titles.add("采购日期");
		titles.add("采购单号");
		titles.add("录单人");
		List<String> filedNames = new ArrayList<String>();
		filedNames.add("id");
		filedNames.add("zdy4");
		filedNames.add("zdy2");
		filedNames.add("purchaseno");
		filedNames.add("zdy3");
		List<Map<String,String>> filedValues = new ArrayList<Map<String,String>>();
		for(int m=0; m<purchases.size(); m++){
			Map<String,String> values = new HashMap<String,String>();
			values.put("id", String.valueOf(purchases.get(m).getId()));
			values.put("zdy4", purchases.get(m).getZdy4());
			values.put("zdy2", purchases.get(m).getZdy2());
			values.put("purchaseno", purchases.get(m).getPurchaseno());
			values.put("zdy3", purchases.get(m).getZdy3());
			filedValues.add(values);
		}
		result = Export_pdf.execute("purchase", titles, filedNames, filedValues);
		return SUCCESS;
	}
	@Override
	public void setSession(Map session) {		
		this.session = session;
	}
	public List<Purchase> getPurchases() {
		return purchases;
	}
	public void setPurchases(List<Purchase> purchases) {
		this.purchases = purchases;
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
