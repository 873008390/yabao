package com.mbusiness.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.struts2.interceptor.SessionAware;

import com.mbusiness.model.Purchasedetail;
import com.mbusiness.model.Usersession;
import com.mbusiness.service.PurchasedetailService;
import com.mbusiness.util.Export_pdf;
import com.opensymphony.xwork2.ActionSupport;
/**
 * 导出采购订单明细pdf
 * @author
 *
 */
public class ExportPurchasedetailPdfAction extends ActionSupport implements SessionAware{
	private PurchasedetailService purchasedetailService = new PurchasedetailService();
	private List<Purchasedetail> purchasedetails;
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
		purchasedetails = purchasedetailService.list(usersession, idtype, typeid, start, limit, page);
		List<String> titles = new ArrayList<String>();
		titles.add("采购单ID");
		titles.add("产品");
		titles.add("规格");
		titles.add("单位");
		titles.add("金额");
		titles.add("数量");
		titles.add("单价");
		List<String> filedNames = new ArrayList<String>();
		filedNames.add("mainid");
		filedNames.add("zdy2");
		filedNames.add("zdy3");
		filedNames.add("zdy4");
		filedNames.add("money");
		filedNames.add("quantity");
		filedNames.add("price");
		List<Map<String,String>> filedValues = new ArrayList<Map<String,String>>();
		for(int m=0; m<purchasedetails.size(); m++){
			Map<String,String> values = new HashMap<String,String>();
			values.put("mainid", String.valueOf(purchasedetails.get(m).getMainid()));
			values.put("zdy2", purchasedetails.get(m).getZdy2());
			values.put("zdy3", purchasedetails.get(m).getZdy3());
			values.put("zdy4", purchasedetails.get(m).getZdy4());
			values.put("money", String.valueOf(purchasedetails.get(m).getMoney()));
			values.put("quantity", String.valueOf(purchasedetails.get(m).getQuantity()));
			values.put("price", String.valueOf(purchasedetails.get(m).getPrice()));
			filedValues.add(values);
		}
		result = Export_pdf.execute("purchasedetail", titles, filedNames, filedValues);
		return SUCCESS;
	}
	@Override
	public void setSession(Map session) {		
		this.session = session;
	}
	public List<Purchasedetail> getPurchasedetails() {
		return purchasedetails;
	}
	public void setPurchasedetails(List<Purchasedetail> purchasedetails) {
		this.purchasedetails = purchasedetails;
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

