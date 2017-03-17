package com.mbusiness.model;


import javax.persistence.Entity;
import javax.persistence.Id;
@Entity
public class Keyvalue {

	private int id;
	private String keyname;
	private String value;
	private int status;
	private int type;
	@Id
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setKeyname(String keyname) {
		this.keyname = keyname;
	}
	public String getKeyname() {
		return keyname;
	}
	public void setValue(String value) {
		this.value = value;
	}
	public String getValue() {
		return value;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public int getStatus() {
		return status;
	}
	public void setType(int type) {
		this.type = type;
	}
	public int getType() {
		return type;
	}
}
