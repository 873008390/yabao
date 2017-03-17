package com.mbusiness.model;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
@Entity
public class Purchasedetail {

	private int id;
	private int mainid;
	private float money;
	private float quantity;
	private float price;
	private int productid;
	private int productunitid;	
	private int productspecid;
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
	private int producttypeid;
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public int getStatus() {
		return status;
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
	public int getMainid() {
		return mainid;
	}
	public void setMainid(int mainid) {
		this.mainid = mainid;
	}
	public float getMoney() {
		return money;
	}
	public void setMoney(float money) {
		this.money = money;
	}
	public float getQuantity() {
		return quantity;
	}
	public void setQuantity(float quantity) {
		this.quantity = quantity;
	}
	public float getPrice() {
		return price;
	}
	public void setPrice(float price) {
		this.price = price;
	}
	public int getProductid() {
		return productid;
	}
	public void setProductid(int productid) {
		this.productid = productid;
	}
	public int getProductunitid() {
		return productunitid;
	}
	public void setProductunitid(int productunitid) {
		this.productunitid = productunitid;
	}
	public int getProductspecid() {
		return productspecid;
	}
	public void setProductspecid(int productspecid) {
		this.productspecid = productspecid;
	}
	public int getProducttypeid() {
		return producttypeid;
	}
	public void setProducttypeid(int producttypeid) {
		this.producttypeid = producttypeid;
	}
}
