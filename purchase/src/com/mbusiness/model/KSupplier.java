package com.mbusiness.model;

public class KSupplier {
	private int fSupplierId;//供应商
	private String fNumber;//编号
	private String fName;//名称
	private String fAddress;//通讯地址
	private String fDocumentStatus;//数据状态
	private String FMobile;//手机
	private String FTel;//电话
	private int fUseOrgId;
	private int rownumber;
	public int getfSupplierId() {
		return fSupplierId;
	}
	public void setfSupplierId(int fSupplierId) {
		this.fSupplierId = fSupplierId;
	}
	public String getfNumber() {
		return fNumber;
	}
	public void setfNumber(String fNumber) {
		this.fNumber = fNumber;
	}
	public String getfName() {
		return fName;
	}
	public void setfName(String fName) {
		this.fName = fName;
	}
	public String getfAddress() {
		return fAddress;
	}
	public void setfAddress(String fAddress) {
		this.fAddress = fAddress;
	}
	public String getFMobile() {
		return FMobile;
	}
	public void setFMobile(String fMobile) {
		FMobile = fMobile;
	}
	public String getFTel() {
		return FTel;
	}
	public void setFTel(String fTel) {
		FTel = fTel;
	}
	public String getfDocumentStatus() {
		return fDocumentStatus;
	}
	public void setfDocumentStatus(String fDocumentStatus) {
		this.fDocumentStatus = fDocumentStatus;
	}
	public int getfUseOrgId() {
		return fUseOrgId;
	}
	public void setfUseOrgId(int fUseOrgId) {
		this.fUseOrgId = fUseOrgId;
	}
	public int getRownumber() {
		return rownumber;
	}
	public void setRownumber(int rownumber) {
		this.rownumber = rownumber;
	}
	
	
}
