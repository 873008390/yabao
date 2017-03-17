package com.mbusiness.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Sendsmsphone {

	private int id;
	private String imei;
	private Date lastdate;
	private int status;
	private int monthtotal;
	private int lastmonthtotal;
	private String type;
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public void setImei(String imei) {
		this.imei = imei;
	}
	public String getImei() {
		return imei;
	}
	public void setLastdate(Date lastdate) {
		this.lastdate = lastdate;
	}
	public Date getLastdate() {
		return lastdate;
	}
	public int getMonthtotal() {
		return monthtotal;
	}
	public void setMonthtotal(int monthtotal) {
		this.monthtotal = monthtotal;
	}
	public int getLastmonthtotal() {
		return lastmonthtotal;
	}
	public void setLastmonthtotal(int lastmonthtotal) {
		this.lastmonthtotal = lastmonthtotal;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getType() {
		return type;
	}
	
}
