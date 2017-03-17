package com.mbusiness.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Users {

	private int id;	
	private Date createdate;
	private String name;
	private String account;
	private String password;
	private int customerid;
	private int type;
	private String phoneno;
	private String tel;
	private int status;
	private int islimittime;
	private String fromdate;
	private String todate;
	private String fromtime;
	private String totime;
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
	private int auditstatus;
	private int servicestatus;
	private int salestatus;
	private String saleaddress;
	private String serviceno;
	private Date lastlogindate;
	private int supplierid;
	private int ismanager;
	private int orgid;
		
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
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
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
	public int getIslimittime() {
		return islimittime;
	}
	public void setIslimittime(int islimittime) {
		this.islimittime = islimittime;
	}
	public String getFromdate() {
		return fromdate;
	}
	public void setFromdate(String fromdate) {
		this.fromdate = fromdate;
	}
	public String getTodate() {
		return todate;
	}
	public void setTodate(String todate) {
		this.todate = todate;
	}
	public String getFromtime() {
		return fromtime;
	}
	public void setFromtime(String fromtime) {
		this.fromtime = fromtime;
	}
	public String getTotime() {
		return totime;
	}
	public void setTotime(String totime) {
		this.totime = totime;
	}
	public void setPhoneno(String phoneno) {
		this.phoneno = phoneno;
	}
	public String getPhoneno() {
		return phoneno;
	}
	public String getAccount() {
		return account;
	}
	public void setAccount(String account) {
		this.account = account;
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
	public void setCustomerid(int customerid) {
		this.customerid = customerid;
	}
	public int getCustomerid() {
		return customerid;
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
	public int getAuditstatus() {
		return auditstatus;
	}
	public void setAuditstatus(int auditstatus) {
		this.auditstatus = auditstatus;
	}
	public int getServicestatus() {
		return servicestatus;
	}
	public void setServicestatus(int servicestatus) {
		this.servicestatus = servicestatus;
	}
	public int getSalestatus() {
		return salestatus;
	}
	public void setSalestatus(int salestatus) {
		this.salestatus = salestatus;
	}
	public void setSaleaddress(String saleaddress) {
		this.saleaddress = saleaddress;
	}
	public String getSaleaddress() {
		return saleaddress;
	}
	public void setServiceno(String serviceno) {
		this.serviceno = serviceno;
	}
	public String getServiceno() {
		return serviceno;
	}
	public Date getLastlogindate() {
		return lastlogindate;
	}
	public void setLastlogindate(Date lastlogindate) {
		this.lastlogindate = lastlogindate;
	}
	public int getSupplierid() {
		return supplierid;
	}
	public void setSupplierid(int supplierid) {
		this.supplierid = supplierid;
	}
	public int getIsmanager() {
		return ismanager;
	}
	public void setIsmanager(int ismanager) {
		this.ismanager = ismanager;
	}
	public int getOrgid() {
		return orgid;
	}
	public void setOrgid(int orgid) {
		this.orgid = orgid;
	}
}
