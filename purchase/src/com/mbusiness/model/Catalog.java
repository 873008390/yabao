package com.mbusiness.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
@Entity
public class Catalog {

	private int id;
	private String name;
	private String url;
	private String shortname;
	private int orderid;
	private String type;
	private int status;
	private int upperid;
	private String icon;
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
	public void setShortname(String shortname) {
		this.shortname = shortname;
	}
	public String getShortname() {
		return shortname;
	}
	public void setOrderid(int orderid) {
		this.orderid = orderid;
	}
	public int getOrderid() {
		return orderid;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getType() {
		return type;
	}
	public void setUpperid(int upperid) {
		this.upperid = upperid;
	}
	public int getUpperid() {
		return upperid;
	}
	public String getIcon() {
		return icon;
	}
	public void setIcon(String icon) {
		this.icon = icon;
	}
	
}
