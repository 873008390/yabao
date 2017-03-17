package com.mbusiness.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.struts2.interceptor.SessionAware;

import com.mbusiness.model.Supplier;
import com.mbusiness.model.Usersession;
import com.mbusiness.service.SupplierService;
import com.mbusiness.util.Export_excel;
import com.opensymphony.xwork2.ActionSupport;
/**
 * 导出供应商excel
 * @author
 *
 */
public class ExportSupplierExcelAction extends ActionSupport implements SessionAware{
	
	private SupplierService supplierService = new SupplierService();
	private List<Supplier> suppliers;
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
		suppliers = supplierService.list(usersession, idtype, typeid, start, limit, page);
		List<String> titles = new ArrayList<String>();
		titles.add("登记日期");
		titles.add("名称");
		titles.add("编码");
		titles.add("详细地址");
		titles.add("联系人");
		titles.add("手机号");
		titles.add("座机号");
		titles.add("传真");
		titles.add("开户银行");
		titles.add("开户名称");
		titles.add("银行账号");
		titles.add("营业执照号码");
		titles.add("默认税率(%)");
		titles.add("类型(1表示公司，0表示个人)");
		titles.add("发票类型");
		titles.add("纳税类型");
		titles.add("省份");
		titles.add("城市");
		titles.add("机构");
		List<String> filedNames = new ArrayList<String>();
		filedNames.add("zdy8");
		filedNames.add("name");
		filedNames.add("supplierno");
		filedNames.add("address");
		filedNames.add("contactperson");
		filedNames.add("phoneno");
		filedNames.add("tel");
		filedNames.add("fax");
		filedNames.add("bank");
		filedNames.add("bankname");
		filedNames.add("bankaccount");
		filedNames.add("companycode");
		filedNames.add("taxrate");
		filedNames.add("iscompany");
		filedNames.add("invoicetype");
		filedNames.add("taxtype");
		filedNames.add("zdy6");
		filedNames.add("zdy7");
		filedNames.add("zdy2");
		
		List<Map<String,String>> filedValues = new ArrayList<Map<String,String>>();
		for(int m=0; m<suppliers.size(); m++){
			Map<String,String> values = new HashMap<String,String>();
			values.put("zdy8", suppliers.get(m).getZdy8());
			values.put("name", suppliers.get(m).getName());
			values.put("supplierno", suppliers.get(m).getSupplierno());
			values.put("address",suppliers.get(m).getAddress());
			values.put("contactperson", suppliers.get(m).getContactperson());
			values.put("phoneno", suppliers.get(m).getPhoneno());
			values.put("tel", suppliers.get(m).getTel());
			values.put("fax", suppliers.get(m).getFax());
			values.put("bank", suppliers.get(m).getBank());
			values.put("bankname", suppliers.get(m).getBankname());
			values.put("bankaccount", suppliers.get(m).getBankaccount());
			values.put("companycode", suppliers.get(m).getCompanycode());
			values.put("taxrate", String.valueOf(suppliers.get(m).getTaxrate()));
			values.put("iscompany", String.valueOf(suppliers.get(m).getIscompany()));
			values.put("invoicetype", suppliers.get(m).getInvoicetype());
			values.put("taxtype", suppliers.get(m).getTaxtype());
			values.put("zdy6", suppliers.get(m).getZdy6());
			values.put("zdy7", suppliers.get(m).getZdy7());
			values.put("zdy2", suppliers.get(m).getZdy2());
			filedValues.add(values);
		}
		result = Export_excel.execute("supplier", titles, filedNames, filedValues);
		
		return SUCCESS;
	}

	@Override
	public void setSession(Map session) {		
		this.session = session;
	}

	public List<Supplier> getSuppliers() {
		return suppliers;
	}

	public void setSuppliers(List<Supplier> suppliers) {
		this.suppliers = suppliers;
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
