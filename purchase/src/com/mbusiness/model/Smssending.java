package com.mbusiness.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
@Entity
public class Smssending {

	private int id;
	private Date createdate;
	private int status;	
	private int type;
	private int sendstatus;
	private String content;
	private String phoneno;
	private Date sendingdate;
	private Date sendeddate;
	
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
	public void setCreatedate(Date createdate) {
		this.createdate = createdate;
	}
	public Date getCreatedate() {
		return createdate;
	}
	public void setType(int type) {
		this.type = type;
	}
	public int getType() {
		return type;
	}
	public void setSendstatus(int sendstatus) {
		this.sendstatus = sendstatus;
	}
	public int getSendstatus() {
		return sendstatus;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getContent() {
		return content;
	}
	public void setPhoneno(String phoneno) {
		this.phoneno = phoneno;
	}
	public String getPhoneno() {
		return phoneno;
	}
	public void setSendingdate(Date sendingdate) {
		this.sendingdate = sendingdate;
	}
	public Date getSendingdate() {
		return sendingdate;
	}
	public void setSendeddate(Date sendeddate) {
		this.sendeddate = sendeddate;
	}
	public Date getSendeddate() {
		return sendeddate;
	}
	
}
