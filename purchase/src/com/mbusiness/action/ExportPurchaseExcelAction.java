package com.mbusiness.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.struts2.interceptor.SessionAware;

import com.mbusiness.model.Purchase;
import com.mbusiness.model.Purchasedetail;
import com.mbusiness.model.Usersession;
import com.mbusiness.service.PurchaseService;
import com.mbusiness.service.PurchasedetailService;
import com.mbusiness.util.Export_excel;
import com.opensymphony.xwork2.ActionSupport;
/**
 * 导出采购订单excel
 * @author
 *
 */
public class ExportPurchaseExcelAction extends ActionSupport implements SessionAware{
	private PurchaseService purchaseService = new PurchaseService();
	private List<Purchase> purchases;
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
		purchases = purchaseService.list(usersession, idtype, typeid, start, limit, page);
		idtype = "id";
		
		List<String> titles = new ArrayList<String>();
		titles.add("ID");
		titles.add("供应商");
		titles.add("采购日期");
		titles.add("采购单号");
		titles.add("录单人");
		titles.add("物料");
		titles.add("单位");
		titles.add("数量");
		titles.add("单价");
		titles.add("金额");
		List<String> filedNames = new ArrayList<String>();
		filedNames.add("id");
		filedNames.add("zdy4");
		filedNames.add("zdy2");
		filedNames.add("purchaseno");
		filedNames.add("zdy3");
		filedNames.add("detail.zdy2");
		filedNames.add("detail.zdy4");
		filedNames.add("quantity");
		filedNames.add("price");
		filedNames.add("money");
		List<Map<String,String>> filedValues = new ArrayList<Map<String,String>>();
		
		for(int m=0; m<purchases.size(); m++){
			typeid = String.valueOf(purchases.get(m).getId());
			purchasedetails = purchasedetailService.list(usersession, idtype, typeid, start, limit, page);
			
			for(int n=0; n<purchasedetails.size(); n++){
				Map<String,String> values = new HashMap<String,String>();
				values.put("id", String.valueOf(purchases.get(m).getId()));
				values.put("zdy4", purchases.get(m).getZdy4());
				values.put("zdy2", purchases.get(m).getZdy2());
				values.put("purchaseno", purchases.get(m).getPurchaseno());
				values.put("zdy3", purchases.get(m).getZdy3());
				values.put("detail.zdy2", purchasedetails.get(n).getZdy2());
				values.put("detail.zdy4", purchasedetails.get(n).getZdy4());
				values.put("quantity", String.valueOf(purchasedetails.get(n).getQuantity()));
				values.put("price", String.valueOf(purchasedetails.get(n).getPrice()));
				values.put("money", String.valueOf(purchasedetails.get(n).getMoney()));
				filedValues.add(values);
			}
			
		}
		result = Export_excel.execute("purchase", titles, filedNames, filedValues);
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
