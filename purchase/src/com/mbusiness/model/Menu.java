package com.mbusiness.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
@Entity
public class Menu {

	private int id;
	private int upperid;
	private String name;
	private String url;
	private int catalogid;
	private int orderid;
	private int status;
	
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
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public void setOrderid(int orderid) {
		this.orderid = orderid;
	}
	public int getOrderid() {
		return orderid;
	}
	public void setUpperid(int upperid) {
		this.upperid = upperid;
	}
	public int getUpperid() {
		return upperid;
	}
	public void setCatalogid(int catalogid) {
		this.catalogid = catalogid;
	}
	public int getCatalogid() {
		return catalogid;
	}	
}
