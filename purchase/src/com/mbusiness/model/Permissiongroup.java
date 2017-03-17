package com.mbusiness.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
@Entity
public class Permissiongroup {

	private int id;
	private String type;
	private String permission;
	private int status;	
	private int adddata;
	private int deletedata;
	private int uploaddata;
	private int modifydata;
	private int searchdata;
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
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getPermission() {
		return permission;
	}
	public void setPermission(String permission) {
		this.permission = permission;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getType() {
		return type;
	}
	public int getAdddata() {
		return adddata;
	}
	public void setAdddata(int adddata) {
		this.adddata = adddata;
	}
	public int getDeletedata() {
		return deletedata;
	}
	public void setDeletedata(int deletedata) {
		this.deletedata = deletedata;
	}
	public int getUploaddata() {
		return uploaddata;
	}
	public void setUploaddata(int uploaddata) {
		this.uploaddata = uploaddata;
	}
	public int getModifydata() {
		return modifydata;
	}
	public void setModifydata(int modifydata) {
		this.modifydata = modifydata;
	}
	public int getSearchdata() {
		return searchdata;
	}
	public void setSearchdata(int searchdata) {
		this.searchdata = searchdata;
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
	
}
