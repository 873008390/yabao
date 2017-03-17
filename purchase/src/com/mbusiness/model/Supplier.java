package com.mbusiness.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Supplier {

	private int id;
	private Date createdate;
	private String name;
	private int type;
	private String phoneno;
	private String tel;
	private int status;
	private String zdy1;
	private String zdy2;
	private String zdy3;
	private String zdy4;
	private String zdy5;
	private String zdy6;
	private String zdy7;
	private String zdy8;
	private String zdy9;
	private String zdy10;
	private String supplierno;
	private String address;
	private String contactperson;
	private int filenum;
	private String bank;
	private String bankname;
	private String bankaccount;
	private int iscompany;
	private String invoicetype;
	private String taxtype;
	private float taxrate;
	private String fax;
	private String companycode;
	private String catalogids;
	private int orgid;
	private int auditstatus;
	private String k3supplierno;
	private int provinceid;
	private int cityid;
		
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Date getCreatedate() {
		return createdate;
	}
	public void setCreatedate(Date createdate) {
		this.createdate = createdate;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public void setPhoneno(String phoneno) {
		this.phoneno = phoneno;
	}
	public String getPhoneno() {
		return phoneno;
	}
	public String getZdy1() {
		return zdy1;
	}
	public void setZdy1(String zdy1) {
		this.zdy1 = zdy1;
	}
	public String getZdy2() {
		return zdy2;
	}
	public void setZdy2(String zdy2) {
		this.zdy2 = zdy2;
	}
	public String getZdy3() {
		return zdy3;
	}
	public void setZdy3(String zdy3) {
		this.zdy3 = zdy3;
	}
	public String getZdy4() {
		return zdy4;
	}
	public void setZdy4(String zdy4) {
		this.zdy4 = zdy4;
	}
	public String getZdy5() {
		return zdy5;
	}
	public void setZdy5(String zdy5) {
		this.zdy5 = zdy5;
	}
	public void setType(int type) {
		this.type = type;
	}
	public int getType() {
		return type;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}
	public String getTel() {
		return tel;
	}
	public String getZdy6() {
		return zdy6;
	}
	public void setZdy6(String zdy6) {
		this.zdy6 = zdy6;
	}
	public String getZdy7() {
		return zdy7;
	}
	public void setZdy7(String zdy7) {
		this.zdy7 = zdy7;
	}
	public String getZdy8() {
		return zdy8;
	}
	public void setZdy8(String zdy8) {
		this.zdy8 = zdy8;
	}
	public String getZdy9() {
		return zdy9;
	}
	public void setZdy9(String zdy9) {
		this.zdy9 = zdy9;
	}
	public String getZdy10() {
		return zdy10;
	}
	public void setZdy10(String zdy10) {
		this.zdy10 = zdy10;
	}
	public void setSupplierno(String supplierno) {
		this.supplierno = supplierno;
	}
	public String getSupplierno() {
		return supplierno;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getAddress() {
		return address;
	}
	public void setContactperson(String contactperson) {
		this.contactperson = contactperson;
	}
	public String getContactperson() {
		return contactperson;
	}
	public int getFilenum() {
		return filenum;
	}
	public void setFilenum(int filenum) {
		this.filenum = filenum;
	}
	public String getBank() {
		return bank;
	}
	public void setBank(String bank) {
		this.bank = bank;
	}
	public String getBankname() {
		return bankname;
	}
	public void setBankname(String bankname) {
		this.bankname = bankname;
	}
	public String getBankaccount() {
		return bankaccount;
	}
	public void setBankaccount(String bankaccount) {
		this.bankaccount = bankaccount;
	}
	public int getIscompany() {
		return iscompany;
	}
	public void setIscompany(int iscompany) {
		this.iscompany = iscompany;
	}
	public String getInvoicetype() {
		return invoicetype;
	}
	public void setInvoicetype(String invoicetype) {
		this.invoicetype = invoicetype;
	}
	public String getTaxtype() {
		return taxtype;
	}
	public void setTaxtype(String taxtype) {
		this.taxtype = taxtype;
	}
	public float getTaxrate() {
		return taxrate;
	}
	public void setTaxrate(float taxrate) {
		this.taxrate = taxrate;
	}
	public String getFax() {
		return fax;
	}
	public void setFax(String fax) {
		this.fax = fax;
	}
	public String getCompanycode() {
		return companycode;
	}
	public void setCompanycode(String companycode) {
		this.companycode = companycode;
	}
	public String getCatalogids() {
		return catalogids;
	}
	public void setCatalogids(String catalogids) {
		this.catalogids = catalogids;
	}
	public int getOrgid() {
		return orgid;
	}
	public void setOrgid(int orgid) {
		this.orgid = orgid;
	}
	public int getAuditstatus() {
		return auditstatus;
	}
	public void setAuditstatus(int auditstatus) {
		this.auditstatus = auditstatus;
	}
	public String getK3supplierno() {
		return k3supplierno;
	}
	public void setK3supplierno(String k3supplierno) {
		this.k3supplierno = k3supplierno;
	}
	public int getProvinceid() {
		return provinceid;
	}
	public void setProvinceid(int provinceid) {
		this.provinceid = provinceid;
	}
	public int getCityid() {
		return cityid;
	}
	public void setCityid(int cityid) {
		this.cityid = cityid;
	}
}
