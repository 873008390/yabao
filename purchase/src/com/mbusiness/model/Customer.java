package com.mbusiness.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Customer {

	private int id;	
	private Date createdate;
	private String name;
	private int type;
	private int provinceid;
	private int cityid;
	private int townid;
	private String phoneno;
	private String tel;
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
	private int manageruserid;
	private int salerid;
	private String customerno;
	private int hospitalid;
	private int uppercustomerid;
	private String addressdetail;
	private String sicknesstype;
	private int age;
	private String changesaler;
	private Date changedate;
	private String department;
	private String idcard;
	private int sex;
	private int clearstatus;
	private String familyname;
	private int familysex;
	private String familyphoneno;
	private String diagnosis;
	private String zdy11;
	private String zdy12;
	private String zdy13;
	private String zdy14;
	private String zdy15;
	private int saleuserid;
	private String patientstatus;
	private String familyrelationship;
		
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
	public void setPhoneno(String phoneno) {
		this.phoneno = phoneno;
	}
	public String getPhoneno() {
		return phoneno;
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
	public void setProvinceid(int provinceid) {
		this.provinceid = provinceid;
	}
	public int getProvinceid() {
		return provinceid;
	}
	public void setCityid(int cityid) {
		this.cityid = cityid;
	}
	public int getCityid() {
		return cityid;
	}
	public void setTownid(int townid) {
		this.townid = townid;
	}
	public int getTownid() {
		return townid;
	}
	public int getManageruserid() {
		return manageruserid;
	}
	public void setManageruserid(int manageruserid) {
		this.manageruserid = manageruserid;
	}
	public String getCustomerno() {
		return customerno;
	}
	public void setCustomerno(String customerno) {
		this.customerno = customerno;
	}
	public int getSalerid() {
		return salerid;
	}
	public void setSalerid(int salerid) {
		this.salerid = salerid;
	}
	public int getHospitalid() {
		return hospitalid;
	}
	public void setHospitalid(int hospitalid) {
		this.hospitalid = hospitalid;
	}
	public int getUppercustomerid() {
		return uppercustomerid;
	}
	public void setUppercustomerid(int uppercustomerid) {
		this.uppercustomerid = uppercustomerid;
	}
	public void setAddressdetail(String addressdetail) {
		this.addressdetail = addressdetail;
	}
	public String getAddressdetail() {
		return addressdetail;
	}
	public void setSicknesstype(String sicknesstype) {
		this.sicknesstype = sicknesstype;
	}
	public String getSicknesstype() {
		return sicknesstype;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public int getAge() {
		return age;
	}
	public void setChangesaler(String changesaler) {
		this.changesaler = changesaler;
	}
	public String getChangesaler() {
		return changesaler;
	}
	public void setChangedate(Date changedate) {
		this.changedate = changedate;
	}
	public Date getChangedate() {
		return changedate;
	}
	public void setDepartment(String department) {
		this.department = department;
	}
	public String getDepartment() {
		return department;
	}
	public String getIdcard() {
		return idcard;
	}
	public void setIdcard(String idcard) {
		this.idcard = idcard;
	}
	public int getSex() {
		return sex;
	}
	public void setSex(int sex) {
		this.sex = sex;
	}
	public int getClearstatus() {
		return clearstatus;
	}
	public void setClearstatus(int clearstatus) {
		this.clearstatus = clearstatus;
	}
	public String getFamilyname() {
		return familyname;
	}
	public void setFamilyname(String familyname) {
		this.familyname = familyname;
	}
	public int getFamilysex() {
		return familysex;
	}
	public void setFamilysex(int familysex) {
		this.familysex = familysex;
	}
	public String getFamilyphoneno() {
		return familyphoneno;
	}
	public void setFamilyphoneno(String familyphoneno) {
		this.familyphoneno = familyphoneno;
	}
	public String getDiagnosis() {
		return diagnosis;
	}
	public void setDiagnosis(String diagnosis) {
		this.diagnosis = diagnosis;
	}
	public String getZdy11() {
		return zdy11;
	}
	public void setZdy11(String zdy11) {
		this.zdy11 = zdy11;
	}
	public String getZdy12() {
		return zdy12;
	}
	public void setZdy12(String zdy12) {
		this.zdy12 = zdy12;
	}
	public String getZdy13() {
		return zdy13;
	}
	public void setZdy13(String zdy13) {
		this.zdy13 = zdy13;
	}
	public String getZdy14() {
		return zdy14;
	}
	public void setZdy14(String zdy14) {
		this.zdy14 = zdy14;
	}
	public String getZdy15() {
		return zdy15;
	}
	public void setZdy15(String zdy15) {
		this.zdy15 = zdy15;
	}
	public int getSaleuserid() {
		return saleuserid;
	}
	public void setSaleuserid(int saleuserid) {
		this.saleuserid = saleuserid;
	}
	public String getPatientstatus() {
		return patientstatus;
	}
	public void setPatientstatus(String patientstatus) {
		this.patientstatus = patientstatus;
	}
	public String getFamilyrelationship() {
		return familyrelationship;
	}
	public void setFamilyrelationship(String familyrelationship) {
		this.familyrelationship = familyrelationship;
	}
}
