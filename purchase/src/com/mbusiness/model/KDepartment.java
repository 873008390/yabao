package com.mbusiness.model;

public class KDepartment {
	private int fDeptId;//部门id
	private String fName;//名称
	private int fParentId;//上级部门
	private int fCreatorId;//创建人
	private int fUseOrgId;//使用组织
	
	public int getfDeptId() {
		return fDeptId;
	}
	public void setfDeptId(int fDeptId) {
		this.fDeptId = fDeptId;
	}
	public String getfName() {
		return fName;
	}
	public void setfName(String fName) {
		this.fName = fName;
	}
	public int getfParentId() {
		return fParentId;
	}
	public void setfParentId(int fParentId) {
		this.fParentId = fParentId;
	}
	public int getfCreatorId() {
		return fCreatorId;
	}
	public void setfCreatorId(int fCreatorId) {
		this.fCreatorId = fCreatorId;
	}
	public int getfUseOrgId() {
		return fUseOrgId;
	}
	public void setfUseOrgId(int fUseOrgId) {
		this.fUseOrgId = fUseOrgId;
	}
	
}
