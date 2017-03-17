package com.mbusiness.model;




public class KPurchaseOrder {
	private int fId;
	private int fPurchaserId;//采购员
	private int fSupplierId;//供应商
	private String fDate;//采购日期
	private String fBillNo;//单据编号
	private int fMaterialId;//物料编码
	private String fProductType;//产品类型
	private int fUnitId;//采购单位
	private float fQty;//采购数量
	private float fPrice;//单价
	private float fAllAmount;//金额
	private String fName;//物料名称
	private int fEntryId;
	private String  fApproveDate;
	private String rownumber;
	public int getfId() {
		return fId;
	}
	public void setfId(int fId) {
		this.fId = fId;
	}
	public int getfPurchaserId() {
		return fPurchaserId;
	}
	public void setfPurchaserId(int fPurchaserId) {
		this.fPurchaserId = fPurchaserId;
	}
	public int getfSupplierId() {
		return fSupplierId;
	}
	public void setfSupplierId(int fSupplierId) {
		this.fSupplierId = fSupplierId;
	}
	public String getfDate() {
		return fDate;
	}
	public void setfDate(String fDate) {
		this.fDate = fDate;
	}
	public String getfBillNo() {
		return fBillNo;
	}
	public void setfBillNo(String fBillNo) {
		this.fBillNo = fBillNo;
	}
	public int getfMaterialId() {
		return fMaterialId;
	}
	public void setfMaterialId(int fMaterialId) {
		this.fMaterialId = fMaterialId;
	}
	public String getfProductType() {
		return fProductType;
	}
	public void setfProductType(String fProductType) {
		this.fProductType = fProductType;
	}
	public int getfUnitId() {
		return fUnitId;
	}
	public void setfUnitId(int fUnitId) {
		this.fUnitId = fUnitId;
	}
	public float getfQty() {
		return fQty;
	}
	public void setfQty(float fQty) {
		this.fQty = fQty;
	}
	public float getfPrice() {
		return fPrice;
	}
	public void setfPrice(float fPrice) {
		this.fPrice = fPrice;
	}
	public float getfAllAmount() {
		return fAllAmount;
	}
	public void setfAllAmount(float fAllAmount) {
		this.fAllAmount = fAllAmount;
	}
	public String getfName() {
		return fName;
	}
	public void setfName(String fName) {
		this.fName = fName;
	}
	public String getRownumber() {
		return rownumber;
	}
	public void setRownumber(String rownumber) {
		this.rownumber = rownumber;
	}
	public int getfEntryId() {
		return fEntryId;
	}
	public void setfEntryId(int fEntryId) {
		this.fEntryId = fEntryId;
	}
	public String getfApproveDate() {
		return fApproveDate;
	}
	public void setfApproveDate(String fApproveDate) {
		this.fApproveDate = fApproveDate;
	}
	
	
	
	
	
	
	
}
